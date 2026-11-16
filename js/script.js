/* ==========================================================================
   TECHPLAY STEAM CLONE - LÓGICA DE AUTENTICAÇÃO, LOJA, PÁGINAS E BIBLIOTECA
   ========================================================================== */

(function () {
  const PREFIX = window.ASSET_PREFIX || '';
  const games = (window.STEAM_GAMES || []).map(g => ({
    ...g,
    imageUrl: PREFIX + g.image,
    screenshotsUrl: (g.screenshots || [g.image]).map(s => PREFIX + s),
    videoUrl: g.video ? PREFIX + g.video : null,
    pageUrl: PREFIX + g.pageFile
  }));

  const formatBRL = val => val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  // =========================================================================
  // 1. SISTEMA DE CONTAS E LOGIN OBRIGATÓRIO (LOCALSTORAGE + SESSIONSTORAGE)
  // =========================================================================
  const USERS_KEY = 'steam_clone_accounts_v2';
  const ACTIVE_USER_KEY = 'steam_clone_active_user_v2';
  const SESSION_AUTH_KEY = 'steam_clone_session_logged_in';

  function getAccounts() {
    let accs = JSON.parse(localStorage.getItem(USERS_KEY));
    if (!accs || !Array.isArray(accs) || accs.length === 0) {
      accs = [
        {
          username: 'PlayerOne',
          email: 'player@steam.com',
          password: '123',
          library: ['deltarune', 'gta-v'],
          cart: [],
          lastPlayed: { 'deltarune': 'Hoje', 'gta-v': 'Ontem' }
        }
      ];
      localStorage.setItem(USERS_KEY, JSON.stringify(accs));
    }
    return accs;
  }

  function saveAccounts(accs) {
    localStorage.setItem(USERS_KEY, JSON.stringify(accs));
  }

  function getCurrentUsername() {
    if (sessionStorage.getItem(SESSION_AUTH_KEY) !== 'true') {
      return '__GUEST__';
    }
    let u = localStorage.getItem(ACTIVE_USER_KEY);
    if (!u || u === '__GUEST__') {
      return '__GUEST__';
    }
    return u;
  }

  function getCurrentUserObj() {
    const u = getCurrentUsername();
    if (u === '__GUEST__') return null;
    const accs = getAccounts();
    return accs.find(a => a.username.toLowerCase() === u.toLowerCase()) || null;
  }

  function updateCurrentUser(updaterFn) {
    const user = getCurrentUserObj();
    if (!user) return false;
    const accs = getAccounts();
    const idx = accs.findIndex(a => a.username.toLowerCase() === user.username.toLowerCase());
    if (idx === -1) return false;
    if (!Array.isArray(accs[idx].cart)) accs[idx].cart = [];
    if (!Array.isArray(accs[idx].library)) accs[idx].library = [];
    updaterFn(accs[idx]);
    saveAccounts(accs);
    return true;
  }

  function isGameOwned(gameId) {
    const user = getCurrentUserObj();
    return user && Array.isArray(user.library) ? user.library.includes(gameId) : false;
  }

  function isInCart(gameId) {
    const user = getCurrentUserObj();
    return user && Array.isArray(user.cart) ? user.cart.includes(gameId) : false;
  }

  function enforceMandatoryLogin() {
    const user = getCurrentUserObj();
    const closeBtn = document.getElementById('closeAuthModal');
    if (!user) {
      if (closeBtn) closeBtn.style.display = 'none';
      document.body.classList.add('no-scroll');
      openAuthModal('login');
    } else {
      if (closeBtn) closeBtn.style.display = '';
      document.body.classList.remove('no-scroll');
    }
  }

  // =========================================================================
  // 2. REDIRECIONAMENTO DO BOTÃO ▶ JOGAR
  // =========================================================================
  window.launchSteamGame = function (gameId) {
    const user = getCurrentUserObj();
    if (!user) {
      enforceMandatoryLogin();
      showToast('Faça login na sua conta Steam antes de começar!');
      return;
    }

    const game = games.find(g => g.id === gameId);
    if (!game) return;

    updateCurrentUser(u => {
      if (!u.lastPlayed) u.lastPlayed = {};
      u.lastPlayed[gameId] = 'Agora mesmo';
    });

    // Redirecionamento específico para Deltarune
    if (gameId === 'deltarune') {
      showToast('Iniciando DELTARUNE -> Redirecionando para https://deltarunesim.com/ ...');
      window.open('https://deltarunesim.com/', '_blank', 'noopener');
      return;
    }

    // Outros jogos da biblioteca (incluindo GTA V sem link externo)
    showToast(`▶ Executando ${game.name} via Steam Client...`);
    if (document.getElementById('librarySection')) {
      renderLibrarySection(gameId);
    }
  };

  // =========================================================================
  // 3. COMPRA / ADICIONAR À BIBLIOTECA E CARRINHO DE COMPRAS FUNCIONAL
  // =========================================================================
  window.buyNowOrPlay = function (gameId) {
    const user = getCurrentUserObj();
    if (!user) {
      enforceMandatoryLogin();
      showToast('Faça login ou crie uma conta Steam para adquirir jogos!');
      return;
    }

    if (isGameOwned(gameId)) {
      window.launchSteamGame(gameId);
      return;
    }

    // Adiciona ao carrinho e abre o carrinho para finalizar a compra
    window.addToSteamCart(gameId);
  };

  window.addToSteamCart = function (gameId) {
    const user = getCurrentUserObj();
    if (!user) {
      enforceMandatoryLogin();
      showToast('Faça login na sua conta Steam para usar o carrinho!');
      return;
    }

    if (isGameOwned(gameId)) {
      showToast('Você já possui este jogo na sua Biblioteca!');
      return;
    }

    let added = false;
    updateCurrentUser(u => {
      if (!Array.isArray(u.cart)) u.cart = [];
      if (!u.cart.includes(gameId)) {
        u.cart.push(gameId);
        added = true;
      }
    });

    refreshAllUI(currentActiveGameId);
    openCartDrawer();
    const game = games.find(g => g.id === gameId);
    showToast(added ? `🛒 "${game ? game.name : gameId}" adicionado ao seu carrinho!` : 'Este jogo já está no seu carrinho.');
  };

  window.removeFromSteamCart = function (gameId) {
    updateCurrentUser(u => {
      u.cart = (u.cart || []).filter(id => id !== gameId);
    });
    refreshAllUI(currentActiveGameId);
    showToast('Item removido do carrinho.');
  };

  window.checkoutSteamCart = function () {
    const user = getCurrentUserObj();
    if (!user) {
      enforceMandatoryLogin();
      return;
    }
    if (!user.cart || user.cart.length === 0) {
      showToast('Seu carrinho está vazio! Adicione jogos antes de finalizar.');
      return;
    }
    const firstBought = user.cart[0];
    updateCurrentUser(u => {
      u.cart.forEach(id => {
        if (!u.library.includes(id)) u.library.push(id);
      });
      u.cart = [];
    });
    closeCartDrawer();
    showToast('🎉 Compra concluída! Os jogos foram adicionados à sua Biblioteca Steam.');
    refreshAllUI(firstBought);
    if (document.getElementById('librarySection')) {
      switchSection('library', firstBought);
    }
  };

  // =========================================================================
  // 4. HEADER E MODAL DE CONTAS (LOGIN / CADASTRO / LOGOUT)
  // =========================================================================
  function updateHeaderUI() {
    const user = getCurrentUserObj();
    const profileContainer = document.getElementById('accountProfileArea');
    const cartCountEl = document.getElementById('cartCount');

    if (cartCountEl) {
      cartCountEl.textContent = user && Array.isArray(user.cart) ? user.cart.length : 0;
    }

    if (!profileContainer) return;

    if (user) {
      const initial = user.username.charAt(0).toUpperCase();
      profileContainer.innerHTML = `
        <div class="user-profile-box" title="Conta logada no Steam">
          <div class="user-avatar">${initial}</div>
          <div class="user-info-text">
            <span class="user-name-label">${user.username}</span>
            <span class="user-status-label">● Online (${user.library.length} jogos)</span>
          </div>
        </div>
        <button class="logout-btn" id="btnLogoutSteam" title="Trocar de conta ou sair">Sair</button>
      `;
      document.getElementById('btnLogoutSteam').addEventListener('click', () => {
        sessionStorage.removeItem(SESSION_AUTH_KEY);
        localStorage.setItem(ACTIVE_USER_KEY, '__GUEST__');
        closeCartDrawer();
        showToast('Sessão encerrada. Faça login para continuar.');
        refreshAllUI();
        enforceMandatoryLogin();
      });
    } else {
      profileContainer.innerHTML = `
        <button class="login-trigger-btn" id="btnOpenLogin">Iniciar Sessão / Criar Conta</button>
      `;
      document.getElementById('btnOpenLogin').addEventListener('click', () => openAuthModal('login'));
    }
  }

  window.openAuthModal = function (tab = 'login') {
    const modal = document.getElementById('authModal');
    if (!modal) return;
    modal.classList.add('open');
    switchAuthTab(tab);
  };

  window.closeAuthModal = function () {
    if (!getCurrentUserObj()) {
      showToast('Você precisa iniciar sessão ou criar uma conta antes de começar!');
      return;
    }
    const modal = document.getElementById('authModal');
    if (modal) modal.classList.remove('open');
    document.body.classList.remove('no-scroll');
  };

  function switchAuthTab(tab) {
    const tabLogin = document.getElementById('tabLoginBtn');
    const tabReg = document.getElementById('tabRegisterBtn');
    const formLogin = document.getElementById('loginForm');
    const formReg = document.getElementById('registerForm');
    const msg = document.getElementById('authFeedbackMsg');
    if (msg) msg.textContent = '';

    if (tab === 'login') {
      tabLogin?.classList.add('active');
      tabReg?.classList.remove('active');
      if (formLogin) formLogin.style.display = 'grid';
      if (formReg) formReg.style.display = 'none';
    } else {
      tabReg?.classList.add('active');
      tabLogin?.classList.remove('active');
      if (formReg) formReg.style.display = 'grid';
      if (formLogin) formLogin.style.display = 'none';
    }
  }

  function setupAuthForms() {
    const tabLogin = document.getElementById('tabLoginBtn');
    const tabReg = document.getElementById('tabRegisterBtn');
    const closeBtn = document.getElementById('closeAuthModal');
    const loginForm = document.getElementById('loginForm');
    const regForm = document.getElementById('registerForm');
    const msg = document.getElementById('authFeedbackMsg');

    tabLogin?.addEventListener('click', () => switchAuthTab('login'));
    tabReg?.addEventListener('click', () => switchAuthTab('register'));
    closeBtn?.addEventListener('click', closeAuthModal);

    loginForm?.addEventListener('submit', e => {
      e.preventDefault();
      const u = document.getElementById('loginUsername').value.trim();
      const p = document.getElementById('loginPassword').value.trim();
      const accs = getAccounts();
      const found = accs.find(a => (a.username.toLowerCase() === u.toLowerCase() || (a.email && a.email.toLowerCase() === u.toLowerCase())) && a.password === p);
      if (!found) {
        if (msg) msg.textContent = 'Usuário ou senha incorretos. (Dica: PlayerOne / Senha: 123 ou crie uma conta)';
        return;
      }
      sessionStorage.setItem(SESSION_AUTH_KEY, 'true');
      localStorage.setItem(ACTIVE_USER_KEY, found.username);
      enforceMandatoryLogin();
      closeAuthModal();
      showToast(`Bem-vindo à Steam, ${found.username}!`);
      refreshAllUI();
    });

    regForm?.addEventListener('submit', e => {
      e.preventDefault();
      const u = document.getElementById('regUsername').value.trim();
      const em = document.getElementById('regEmail').value.trim();
      const p = document.getElementById('regPassword').value.trim();

      if (u.length < 3) {
        if (msg) msg.textContent = 'O nome de usuário deve ter pelo menos 3 caracteres.';
        return;
      }

      const accs = getAccounts();
      if (accs.some(a => a.username.toLowerCase() === u.toLowerCase())) {
        if (msg) msg.textContent = 'Este nome de conta já está em uso. Escolha outro.';
        return;
      }

      const newAcc = {
        username: u,
        email: em,
        password: p,
        library: ['deltarune'],
        cart: [],
        lastPlayed: { 'deltarune': 'Hoje' }
      };
      accs.push(newAcc);
      saveAccounts(accs);
      sessionStorage.setItem(SESSION_AUTH_KEY, 'true');
      localStorage.setItem(ACTIVE_USER_KEY, newAcc.username);
      enforceMandatoryLogin();
      closeAuthModal();
      showToast(`Conta "${newAcc.username}" criada com sucesso!`);
      refreshAllUI();
    });
  }

  // =========================================================================
  // 5. VITRINE EM DESTAQUE E GRADE DA LOJA
  // =========================================================================
  let currentFeaturedIndex = 0;
  const featuredIds = ['deltarune', 'gta-v', 'silent-hill-2', 'resident-evil-4'];

  function renderFeaturedShowcase() {
    const container = document.getElementById('featuredBoxContainer');
    const dotsContainer = document.getElementById('featuredDots');
    if (!container) return;

    const gameId = featuredIds[currentFeaturedIndex] || featuredIds[0];
    const game = games.find(g => g.id === gameId) || games[0];
    const owned = isGameOwned(game.id);
    const inCart = isInCart(game.id);

    container.innerHTML = `
      <div class="featured-media" onclick="openGameDetails('${game.id}')">
        <img id="featuredMainImg" src="${game.imageUrl}" alt="${game.name}">
        ${owned ? `<span class="owned-ribbon">✓ NA BIBLIOTECA</span>` : ''}
      </div>
      <div class="featured-info">
        <div>
          <span class="section-eyebrow" style="color:#66c0f4;">DESTAQUE E RECOMENDADO</span>
          <h1 style="cursor:pointer;" onclick="openGameDetails('${game.id}')">${game.name}</h1>
          <p>${game.shortDesc}</p>
          <div class="featured-thumbs">
            ${game.screenshotsUrl.slice(0, 2).map(ss => `
              <img src="${ss}" alt="Preview" onmouseover="document.getElementById('featuredMainImg').src='${ss}'" onmouseout="document.getElementById('featuredMainImg').src='${game.imageUrl}'">
            `).join('')}
          </div>
          <div class="tag-list">
            ${game.tags.slice(0, 4).map(t => `<span>${t}</span>`).join('')}
          </div>
        </div>
        <div class="featured-actions">
          <span class="featured-price">${formatBRL(game.price)}</span>
          <div style="display:flex; gap:8px;">
            <a href="${game.pageUrl}" onclick="event.preventDefault(); openGameDetails('${game.id}')" class="btn-steam-blue">Ver Página</a>
            ${owned
              ? `<button class="btn-steam-green" onclick="launchSteamGame('${game.id}')">▶ Jogar Agora</button>`
              : `<button class="btn-steam-green" onclick="addToSteamCart('${game.id}')">${inCart ? '🛒 No Carrinho' : '🛒 + Carrinho'}</button>`
            }
          </div>
        </div>
      </div>
    `;

    if (dotsContainer) {
      dotsContainer.innerHTML = featuredIds.map((id, idx) => `
        <div class="feat-dot ${idx === currentFeaturedIndex ? 'active' : ''}" onclick="setFeaturedIndex(${idx})"></div>
      `).join('');
    }
  }

  window.setFeaturedIndex = function (idx) {
    currentFeaturedIndex = idx;
    renderFeaturedShowcase();
  };

  function renderStoreGrid() {
    const grid = document.getElementById('gameGrid');
    if (!grid) return;

    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const sortSelect = document.getElementById('sortSelect');

    const query = (searchInput ? searchInput.value : '').trim().toLowerCase();
    const cat = categoryFilter ? categoryFilter.value : 'all';
    const sort = sortSelect ? sortSelect.value : 'featured';

    let filtered = games.filter(g => {
      const matchName = g.name.toLowerCase().includes(query) || g.tags.some(t => t.toLowerCase().includes(query));
      const matchCat = cat === 'all' || g.category.includes(cat);
      return matchName && matchCat;
    });

    if (sort === 'priceAsc') filtered.sort((a, b) => a.price - b.price);
    if (sort === 'priceDesc') filtered.sort((a, b) => b.price - a.price);
    if (sort === 'name') filtered.sort((a, b) => a.name.localeCompare(b.name));

    const resultCount = document.getElementById('resultCount');
    if (resultCount) {
      resultCount.textContent = `${filtered.length} jogo${filtered.length === 1 ? '' : 's'} na loja`;
    }

    grid.innerHTML = filtered.map(game => {
      const owned = isGameOwned(game.id);
      const inCart = isInCart(game.id);
      return `
        <article class="game-card">
          <div class="card-image-wrap" onclick="openGameDetails('${game.id}')">
            <img src="${game.imageUrl}" alt="${game.name}" loading="lazy">
            ${owned ? `<span class="owned-ribbon">✓ NA BIBLIOTECA</span>` : ''}
          </div>
          <div class="card-content">
            <h3 onclick="openGameDetails('${game.id}')">${game.name}</h3>
            <div class="card-meta">
              <span>▣ Windows</span>
              <span>${game.developer}</span>
            </div>
            <div class="tag-list">
              ${game.tags.slice(0, 3).map(t => `<span>${t}</span>`).join('')}
            </div>
            <p class="card-rating">★ ${game.rating.split('(')[0]}</p>
            <div class="price-row">
              ${game.discount ? `<span class="discount-badge">-${game.discount}%</span>` : ''}
              <div class="price-box">
                ${game.oldPrice ? `<del>${formatBRL(game.oldPrice)}</del>` : ''}
                <strong>${formatBRL(game.price)}</strong>
              </div>
            </div>
            <div class="card-actions">
              <a href="${game.pageUrl}" onclick="event.preventDefault(); openGameDetails('${game.id}')" class="btn-steam-blue">Página do Jogo</a>
              ${owned
                ? `<button class="btn-steam-green" onclick="launchSteamGame('${game.id}')">▶ Jogar</button>`
                : `<button class="btn-steam-green" onclick="addToSteamCart('${game.id}')">${inCart ? '🛒 No Carrinho' : '🛒 + Carrinho'}</button>`
              }
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  // =========================================================================
  // 6. PÁGINA INDIVIDUAL DE CADA JOGO (SPA + PÁGINAS DEDICADAS EM /jogos/)
  // =========================================================================
  let currentActiveGameId = window.STANDALONE_GAME_ID || 'deltarune';

  window.openGameDetails = function (gameId) {
    currentActiveGameId = gameId;
    if (document.getElementById('gameDetailSection')) {
      renderGameDetailPage(gameId);
      switchSection('gameDetail');
    } else {
      const g = games.find(x => x.id === gameId);
      if (g) window.location.href = g.pageUrl;
    }
  };

  window.swapMainMedia = function (type, src, thumbEl) {
    const viewer = document.getElementById('gameMainMediaViewer');
    if (!viewer) return;
    document.querySelectorAll('.thumb-item').forEach(el => el.classList.remove('active'));
    if (thumbEl) thumbEl.classList.add('active');

    if (type === 'video') {
      viewer.innerHTML = `<video src="${src}" controls autoplay muted></video>`;
    } else {
      viewer.innerHTML = `<img src="${src}" alt="Screenshot">`;
    }
  };

  function renderGameDetailPage(gameId) {
    const container = document.getElementById('gameDetailContainer');
    if (!container) return;

    const game = games.find(g => g.id === gameId) || games[0];
    const owned = isGameOwned(game.id);
    const inCart = isInCart(game.id);

    const initialMedia = game.videoUrl
      ? `<video src="${game.videoUrl}" controls autoplay muted></video>`
      : `<img src="${game.imageUrl}" alt="${game.name}">`;

    container.innerHTML = `
      <div class="breadcrumb-bar">
        <div>
          <a href="${PREFIX}index.html" onclick="if(window.switchSection){event.preventDefault(); switchSection('store');}">Todos os Jogos</a>
          &gt; <span>${game.tags[0] || 'Ação'}</span>
          &gt; <strong style="color:#fff;">${game.name}</strong>
        </div>
        <div style="display:flex; gap:10px;">
          <a href="${game.pageUrl}" class="btn-steam-blue" style="padding:5px 10px; font-size:12px;">Abrir HTML Individual (${game.pageFile})</a>
          <button class="btn-steam-blue" style="padding:5px 10px; font-size:12px;" onclick="if(window.switchSection){switchSection('library', '${game.id}');}else{window.location.href='${PREFIX}index.html#library';}">Ir para Biblioteca</button>
        </div>
      </div>

      <div class="game-page-header">
        <h1>${game.name}</h1>
      </div>

      <div class="game-top-grid">
        <div>
          <div class="media-viewer" id="gameMainMediaViewer">
            ${initialMedia}
          </div>
          <div class="thumb-strip">
            ${game.videoUrl ? `
              <div class="thumb-item active" onclick="swapMainMedia('video', '${game.videoUrl}', this)">
                <img src="${game.imageUrl}" alt="Trailer">
              </div>
            ` : ''}
            ${game.screenshotsUrl.map((ss, idx) => `
              <div class="thumb-item ${(!game.videoUrl && idx === 0) ? 'active' : ''}" onclick="swapMainMedia('img', '${ss}', this)">
                <img src="${ss}" alt="Captura ${idx + 1}">
              </div>
            `).join('')}
          </div>
        </div>

        <aside class="game-side-info">
          <img class="game-header-capsule" src="${game.imageUrl}" alt="${game.name}">
          <p class="game-short-desc">${game.shortDesc}</p>
          <table class="game-meta-table">
            <tr><td>Análises Recentes:</td><td>${game.rating}</td></tr>
            <tr><td>Data de Lançamento:</td><td style="color:#c7d5e0;">${game.releaseDate}</td></tr>
            <tr><td>Desenvolvedora:</td><td>${game.developer}</td></tr>
            <tr><td>Distribuidora:</td><td>${game.publisher}</td></tr>
          </table>
          <div style="margin-top:auto;">
            <span style="font-size:11px; color:#8f98a0;">Marcadores populares para este produto:</span>
            <div class="tag-list">
              ${game.tags.map(t => `<span>${t}</span>`).join('')}
            </div>
          </div>
        </aside>
      </div>

      <div class="steam-buy-box">
        <div>
          <h2>Comprar ${game.name}</h2>
          <p>${owned ? '✓ Este jogo já pertence à sua conta Steam logada' : 'Adquira agora e adicione permanentemente à sua Biblioteca Steam'}</p>
        </div>
        <div class="buy-controls">
          <span class="buy-price-tag">${formatBRL(game.price)}</span>
          ${owned
            ? `<button class="btn-steam-green" onclick="launchSteamGame('${game.id}')">Na Biblioteca (▶ Jogar Agora)</button>`
            : `
              <button class="btn-steam-green" onclick="addToSteamCart('${game.id}')">${inCart ? '🛒 Ver no Carrinho' : '🛒 Adicionar ao Carrinho'}</button>
            `
          }
        </div>
      </div>

      <div class="game-details-columns">
        <div>
          <section class="detail-panel">
            <h3>Sobre este jogo</h3>
            <p>${game.about}</p>
          </section>

          <section class="detail-panel">
            <h3>Requisitos de Sistema (Windows)</h3>
            <div class="sysreq-grid">
              <div class="sysreq-col">
                <h4>Mínimos</h4>
                <ul>
                  <li><strong>SO:</strong> ${game.sysReq.min.os}</li>
                  <li><strong>Processador:</strong> ${game.sysReq.min.cpu}</li>
                  <li><strong>Memória:</strong> ${game.sysReq.min.ram}</li>
                  <li><strong>Placa de vídeo:</strong> ${game.sysReq.min.gpu}</li>
                  <li><strong>Armazenamento:</strong> ${game.sysReq.min.storage}</li>
                </ul>
              </div>
              <div class="sysreq-col">
                <h4>Recomendados</h4>
                <ul>
                  <li><strong>SO:</strong> ${game.sysReq.rec.os}</li>
                  <li><strong>Processador:</strong> ${game.sysReq.rec.cpu}</li>
                  <li><strong>Memória:</strong> ${game.sysReq.rec.ram}</li>
                  <li><strong>Placa de vídeo:</strong> ${game.sysReq.rec.gpu}</li>
                  <li><strong>Armazenamento:</strong> ${game.sysReq.rec.storage}</li>
                </ul>
              </div>
            </div>
          </section>
        </div>

        <aside>
          <div class="detail-panel">
            <h3>Recursos Compatíveis</h3>
            <ul style="list-style:none; font-size:13px; line-height:2; color:#c7d5e0;">
              <li>👤 Um jogador</li>
              <li>🏆 Conquistas Steam (${game.achievementsText})</li>
              <li>☁️ Nuvem Steam (Salvo em localStorage)</li>
              <li>🎮 Compatibilidade total com controle</li>
            </ul>
          </div>
        </aside>
      </div>
    `;
  }

  // =========================================================================
  // 7. BIBLIOTECA DESKTOP STEAM (SIDEBAR ESQUERDA + PAINEL PRINCIPAL DIREITO)
  // =========================================================================
  let selectedLibraryGameId = null;

  function renderLibrarySection(preferGameId) {
    const listEl = document.getElementById('librarySidebarList');
    const mainEl = document.getElementById('libraryMainPanel');
    const countEl = document.getElementById('libraryOwnedCount');
    const filterEl = document.getElementById('librarySearchInput');

    if (!listEl || !mainEl) return;

    const user = getCurrentUserObj();
    if (!user) {
      if (countEl) countEl.textContent = '0';
      listEl.innerHTML = `<p style="padding:14px; font-size:12px; color:#8f98a0;">Inicie sessão para ver seus jogos.</p>`;
      mainEl.innerHTML = `
        <div style="padding:80px 40px; text-align:center;">
          <h2 style="color:#fff; margin-bottom:12px;">Você não está logado</h2>
          <p style="color:#8f98a0; margin-bottom:20px;">Entre na sua conta Steam ou crie uma nova para acessar sua Biblioteca de jogos.</p>
          <button class="btn-steam-green" onclick="openAuthModal('login')">Iniciar Sessão / Criar Conta</button>
        </div>
      `;
      return;
    }

    const filterText = (filterEl ? filterEl.value : '').trim().toLowerCase();
    const ownedGames = games.filter(g => user.library.includes(g.id));
    const visibleGames = ownedGames.filter(g => g.name.toLowerCase().includes(filterText));

    if (countEl) countEl.textContent = ownedGames.length;

    if (preferGameId && user.library.includes(preferGameId)) {
      selectedLibraryGameId = preferGameId;
    } else if (!selectedLibraryGameId || !user.library.includes(selectedLibraryGameId)) {
      selectedLibraryGameId = ownedGames.length > 0 ? ownedGames[0].id : null;
    }

    listEl.innerHTML = visibleGames.length > 0 ? visibleGames.map(g => `
      <div class="lib-game-item ${g.id === selectedLibraryGameId ? 'active' : ''}" onclick="selectLibraryGame('${g.id}')">
        <img src="${g.imageUrl}" alt="${g.name}">
        <span style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${g.name}</span>
        <span class="ready-dot" title="Pronto para jogar"></span>
      </div>
    `).join('') : `<p style="padding:14px; font-size:12px; color:#8f98a0;">Nenhum jogo encontrado na sua conta.</p>`;

    if (!selectedLibraryGameId) {
      mainEl.innerHTML = `
        <div style="padding:80px 40px; text-align:center;">
          <h2 style="color:#fff; margin-bottom:12px;">Sua Biblioteca está vazia</h2>
          <p style="color:#8f98a0; margin-bottom:20px;">Adquira jogos na Loja para que eles apareçam aqui prontos para jogar.</p>
          <button class="btn-steam-blue" onclick="switchSection('store')">Ir para a Loja Steam</button>
        </div>
      `;
      return;
    }

    const activeGame = games.find(g => g.id === selectedLibraryGameId) || ownedGames[0];
    const lastSession = (user.lastPlayed && user.lastPlayed[activeGame.id]) || 'Recente';

    mainEl.innerHTML = `
      <div class="lib-hero-banner">
        <img class="lib-hero-bg" src="${activeGame.imageUrl}" alt="${activeGame.name}">
        <div class="lib-hero-gradient"></div>
        <div class="lib-hero-title-box">
          <span>${activeGame.developer} • Pronto para jogar</span>
          <h1>${activeGame.name}</h1>
        </div>
      </div>

      <div class="lib-action-bar">
        <button class="btn-play-giant" onclick="launchSteamGame('${activeGame.id}')">
          ▶ JOGAR
        </button>

        <div class="lib-stats-row">
          <div class="lib-stat-block">
            <span class="lib-stat-label">Última Sessão</span>
            <span class="lib-stat-value">${lastSession}</span>
          </div>
          <div class="lib-stat-block">
            <span class="lib-stat-label">Tempo de Jogo</span>
            <span class="lib-stat-value">${activeGame.defaultHours}</span>
          </div>
          <div class="lib-stat-block">
            <span class="lib-stat-label">Conquistas (${activeGame.achievementsText})</span>
            <div class="achievement-bar-wrap">
              <div class="achievement-bar-fill" style="width:${activeGame.achievementsPct}%;"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="lib-quick-links">
        <button onclick="openGameDetails('${activeGame.id}')">Página da Loja</button>
        <button onclick="window.location.href='${activeGame.pageUrl}'">Arquivo HTML do Jogo</button>
        <button onclick="switchSection('community')">Central da Comunidade</button>
      </div>

      <div class="lib-content-body">
        <div>
          <div class="lib-card-box">
            <h3>Resumo do Jogo</h3>
            <p style="line-height:1.7; font-size:14px; white-space:pre-line;">${activeGame.about}</p>
          </div>
          <div class="lib-card-box">
            <h3>Capturas de Tela e Mídia</h3>
            <div class="lib-screenshots-grid">
              ${activeGame.screenshotsUrl.map(ss => `<img src="${ss}" alt="Screenshot">`).join('')}
            </div>
          </div>
        </div>
        <aside>
          <div class="lib-card-box">
            <h3>Detalhes na Conta (${user.username})</h3>
            <p style="font-size:13px; color:#8f98a0; line-height:1.8;">
              <strong>Status:</strong> Instalado e Atualizado<br>
              <strong>Desenvolvedora:</strong> ${activeGame.developer}<br>
              <strong>Lançamento:</strong> ${activeGame.releaseDate}
            </p>
          </div>
        </aside>
      </div>
    `;
  }

  window.selectLibraryGame = function (gameId) {
    selectedLibraryGameId = gameId;
    renderLibrarySection(gameId);
  };

  // =========================================================================
  // 8. CARRINHO E NAVEGAÇÃO ENTRE ABAS
  // =========================================================================
  function renderCartDrawer() {
    const itemsEl = document.getElementById('cartItems');
    const totalEl = document.getElementById('cartTotal');
    if (!itemsEl || !totalEl) return;

    const user = getCurrentUserObj();
    const cartIds = user && Array.isArray(user.cart) ? user.cart : [];
    const cartGames = cartIds.map(id => games.find(g => g.id === id)).filter(Boolean);
    const total = cartGames.reduce((sum, g) => sum + g.price, 0);

    totalEl.textContent = formatBRL(total);
    itemsEl.innerHTML = cartGames.length > 0 ? cartGames.map(g => `
      <div class="cart-item">
        <img src="${g.imageUrl}" alt="${g.name}">
        <div>
          <h4 style="color:#fff; font-size:14px;">${g.name}</h4>
          <span style="color:#66c0f4; font-size:13px; font-weight:700;">${formatBRL(g.price)}</span>
        </div>
        <button class="logout-btn" onclick="removeFromSteamCart('${g.id}')">Remover</button>
      </div>
    `).join('') : `<p style="padding:30px 10px; text-align:center; color:#8f98a0;">Seu carrinho Steam está vazio.</p>`;
  }

  function openCartDrawer() {
    if (!getCurrentUserObj()) {
      enforceMandatoryLogin();
      showToast('Faça login para acessar o carrinho de compras!');
      return;
    }
    renderCartDrawer();
    document.getElementById('cartDrawer')?.classList.add('open');
  }

  function closeCartDrawer() {
    document.getElementById('cartDrawer')?.classList.remove('open');
  }

  window.switchSection = function (sectionName, optionalGameId) {
    if (!getCurrentUserObj()) {
      enforceMandatoryLogin();
      return;
    }

    const sections = ['store', 'library', 'community', 'support', 'gameDetail'];
    sections.forEach(s => {
      const el = document.getElementById(s + 'Section');
      if (el) el.classList.toggle('active-section', s === sectionName);
    });

    document.querySelectorAll('.nav-link').forEach(btn => {
      const target = btn.dataset.section;
      btn.classList.toggle('active', target === sectionName || (sectionName === 'gameDetail' && target === 'store'));
    });

    const storeSubnav = document.getElementById('storeSubnavBar');
    if (storeSubnav) {
      storeSubnav.style.display = (sectionName === 'library') ? 'none' : 'flex';
    }

    if (sectionName === 'library') {
      renderLibrarySection(optionalGameId);
    } else if (sectionName === 'gameDetail' && optionalGameId) {
      renderGameDetailPage(optionalGameId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(window._steamToastTimer);
    window._steamToastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
  }

  function refreshAllUI(preferGameId) {
    updateHeaderUI();
    renderFeaturedShowcase();
    renderStoreGrid();
    renderCartDrawer();
    renderGameDetailPage(preferGameId || currentActiveGameId);
    renderLibrarySection(preferGameId);
  }

  // Inicialização de Eventos
  document.addEventListener('DOMContentLoaded', () => {
    setupAuthForms();

    document.querySelectorAll('.nav-link[data-section]').forEach(btn => {
      btn.addEventListener('click', () => window.switchSection(btn.dataset.section));
    });

    document.getElementById('searchInput')?.addEventListener('input', () => {
      if (document.getElementById('storeSection') && !document.getElementById('storeSection').classList.contains('active-section')) {
        window.switchSection('store');
      }
      renderStoreGrid();
    });
    document.getElementById('categoryFilter')?.addEventListener('change', renderStoreGrid);
    document.getElementById('sortSelect')?.addEventListener('change', renderStoreGrid);
    document.getElementById('librarySearchInput')?.addEventListener('input', () => renderLibrarySection());

    document.getElementById('openCart')?.addEventListener('click', openCartDrawer);
    document.getElementById('closeCart')?.addEventListener('click', closeCartDrawer);
    document.getElementById('checkoutBtn')?.addEventListener('click', window.checkoutSteamCart);
    document.getElementById('clearCart')?.addEventListener('click', () => {
      updateCurrentUser(u => { u.cart = []; });
      refreshAllUI(currentActiveGameId);
      showToast('Carrinho esvaziado.');
    });

    // Suporte a hash URL (#library)
    if (window.location.hash === '#library' && document.getElementById('librarySection')) {
      if (getCurrentUserObj()) {
        window.switchSection('library');
      }
    }

    refreshAllUI(window.STANDALONE_GAME_ID);
    enforceMandatoryLogin();
  });
})();
