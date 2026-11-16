/* ==========================================================================
   BANCO DE DADOS COMPLETO DE JOGOS - TECHPLAY STEAM
   ========================================================================== */

window.STEAM_GAMES = [
  {
    id: 'deltarune',
    name: 'DELTARUNE',
    price: 59.90,
    oldPrice: 79.90,
    discount: 25,
    category: ['rpg', 'aventura'],
    tags: ['RPG', 'Pixel Art', 'História Rica', 'Trilha Sonora Incrível', 'Indie'],
    image: 'assets/imagens/Deltarune.png',
    screenshots: [
      'assets/imagens/Deltarune.png',
      'assets/imagens/deltarune_ss1.jpg',
      'assets/imagens/deltarune_ss2.jpg',
      'assets/imagens/Deltarune.png'
    ],
    video: null,
    rating: 'Extremamente positivas (98% de 94.320 análises)',
    developer: 'tobyfox',
    publisher: 'tobyfox',
    releaseDate: '31/10/2018 (Capítulos 1-4)',
    playUrl: 'https://deltarunesim.com/',
    pageFile: 'jogos/deltarune.html',
    defaultHours: '42,5 horas',
    achievementsText: '18 de 20 (90%)',
    achievementsPct: 90,
    shortDesc: 'Mergulhe na história paralela de UNDERTALE! Lute ou poupe seu caminho em combates cheios de ação ao lado de Kris, Susie e Ralsei.',
    about: `DELTARUNE é o aguardado RPG episódico criado por Toby Fox, criador de UNDERTALE.

Controle Kris, um humano que cai no misterioso "Dark World" ao lado de Susie e conhece o príncipe Ralsei. Descubra uma narrativa profunda repleta de humor, personagens inesquecíveis, batalhas em turnos com esquiva estilo bullet-hell e uma trilha sonora lendária composta por Toby Fox.

• Sistema de combate TP (Tension Points) dinâmico em grupo: defenda, use magias ou resolva encontros pacificamente.
• Ao clicar em JOGAR na sua Biblioteca, você será levado diretamente para o simulador interativo de batalhas de Deltarune (https://deltarunesim.com/).`,
    sysReq: {
      min: {
        os: 'Windows 7 / 8 / 10 / 11',
        cpu: 'Intel Core 2 Duo 2.0 GHz ou equivalente',
        ram: '4 GB de RAM',
        gpu: 'Placa gráfica compatível com DirectX 9.0c (128 MB)',
        storage: '1 GB de espaço disponível'
      },
      rec: {
        os: 'Windows 10 / 11 (64 bits)',
        cpu: 'Intel Core i3 ou AMD Ryzen 3',
        ram: '8 GB de RAM',
        gpu: 'Qualquer GPU dedicada ou integrada moderna',
        storage: '2 GB de espaço em SSD'
      }
    }
  },
  {
    id: 'gta-v',
    name: 'Grand Theft Auto V',
    price: 89.90,
    oldPrice: 149.90,
    discount: 40,
    category: ['acao', 'aventura'],
    tags: ['Mundo Aberto', 'Ação', 'Multijogador', 'Crime', 'Tiro em 3ª Pessoa'],
    image: 'assets/imagens/Gta.png',
    screenshots: [
      'assets/imagens/Gta.png',
      'assets/imagens/gta_ss1.jpg',
      'assets/imagens/gta_ss2.jpg',
      'assets/imagens/Gta.png'
    ],
    video: null,
    rating: 'Muito positivas (91% de 1.540.000 análises)',
    developer: 'Rockstar North',
    publisher: 'Rockstar Games',
    releaseDate: '14/04/2015',
    playUrl: null,
    pageFile: 'jogos/gta-v.html',
    defaultHours: '128,4 horas',
    achievementsText: '54 de 77 (70%)',
    achievementsPct: 70,
    shortDesc: 'Quando um malandro de rua, um ladrão de bancos aposentado e um psicopata aterrorizante se envolvem com o submundo do crime, eles precisam realizar golpes ousados para sobreviver.',
    about: `Grand Theft Auto V para PC oferece aos jogadores a opção de explorar o gigantesco e premiado mundo de Los Santos e Blaine County em resoluções de até 4K e 60 quadros por segundo.

alterne entre as vidas interligadas de Michael, Franklin e Trevor em uma campanha explosiva repleta de assaltos planejados, veículos customizáveis, perseguições policiais e liberdade total.`,
    sysReq: {
      min: {
        os: 'Windows 10 64 Bit',
        cpu: 'Intel Core 2 Quad CPU Q6600 @ 2.40GHz / AMD Phenom 9850',
        ram: '8 GB de RAM',
        gpu: 'NVIDIA 9800 GT 1GB / AMD HD 4870 1GB',
        storage: '110 GB de espaço disponível'
      },
      rec: {
        os: 'Windows 10 / 11 64 Bit',
        cpu: 'Intel Core i5 3470 @ 3.2GHz / AMD X8 FX-8350 @ 4GHz',
        ram: '16 GB de RAM',
        gpu: 'NVIDIA GTX 1660 / RTX 3050 ou AMD equivalente',
        storage: '110 GB de espaço em SSD'
      }
    }
  },
  {
    id: 'silent-hill-2',
    name: 'Silent Hill 2',
    price: 349.90,
    oldPrice: null,
    discount: 0,
    category: ['terror', 'aventura'],
    tags: ['Terror Psicológico', 'Survival Horror', 'História Rica', 'Atmosférico'],
    image: 'assets/imagens/SH.png',
    screenshots: [
      'assets/imagens/sh21.jpg',
      'assets/imagens/sh22.jpg',
      'assets/imagens/sh23.jpg',
      'assets/imagens/sh24.jpg',
      'assets/imagens/sh25.jpg'
    ],
    video: 'assets/videos/silenthill2.mp4',
    rating: 'Extremamente positivas (96% de 32.110 análises)',
    developer: 'Bloober Team',
    publisher: 'KONAMI',
    releaseDate: '08/10/2024',
    playUrl: null,
    pageFile: 'jogos/silent-hill-2.html',
    defaultHours: '18,2 horas',
    achievementsText: '28 de 43 (65%)',
    achievementsPct: 65,
    shortDesc: 'Após receber uma carta de sua esposa falecida, James Sunderland retorna para Silent Hill. Uma cidade coberta por névoa, criaturas assustadoras e segredos.',
    about: `Tendo recebido uma carta de sua falecida esposa, James dirige-se ao local onde compartilharam tantas lembranças na esperança de vê-la mais uma vez: Silent Hill.

Lá, à beira do lago, ele encontra uma mulher assustadoramente parecida com ela. "Meu nome... é Maria", ela sorri. Seu rosto, sua voz... ela é exatamente como ela.

Vivencie uma aula magistral de terror psicológico de sobrevivência, elogiado como o melhor da série, agora reconstruído com visuais modernos de tirar o fôlego e áudio visceral.`,
    sysReq: {
      min: {
        os: 'Windows 10 x64',
        cpu: 'Intel Core i7-6700K | AMD Ryzen 5 3600',
        ram: '16 GB de RAM',
        gpu: 'NVIDIA GeForce GTX 1070 Ti ou AMD Radeon RX 5700',
        storage: '50 GB de espaço disponível (SSD recomendado)'
      },
      rec: {
        os: 'Windows 11 x64',
        cpu: 'Intel Core i7-8700K | AMD Ryzen 5 3600X',
        ram: '16 GB de RAM',
        gpu: 'NVIDIA GeForce RTX 2080 ou AMD Radeon 6800XT',
        storage: '50 GB em SSD NVMe'
      }
    }
  },
  {
    id: 'resident-evil-4',
    name: 'Resident Evil 4 Remake',
    price: 169.90,
    oldPrice: 199.90,
    discount: 15,
    category: ['terror', 'acao'],
    tags: ['Survival Horror', 'Ação', 'Zumbis', 'Terceira Pessoa', 'Remake'],
    image: 'assets/imagens/Resident Evil 4.png',
    screenshots: [
      'assets/imagens/re41.jpg',
      'assets/imagens/re42.jpg',
      'assets/imagens/re43.jpg',
      'assets/imagens/re44.jpg',
      'assets/imagens/re45.jpg'
    ],
    video: null,
    rating: 'Extremamente positivas (97% de 112.400 análises)',
    developer: 'CAPCOM Co., Ltd.',
    publisher: 'CAPCOM Co., Ltd.',
    releaseDate: '24/03/2023',
    playUrl: null,
    pageFile: 'jogos/resident-evil-4.html',
    defaultHours: '36,0 horas',
    achievementsText: '32 de 39 (82%)',
    achievementsPct: 82,
    shortDesc: 'Sobrevivência é apenas o começo. Seis anos se passaram desde o desastre biológico em Raccoon City. Leon S. Kennedy é enviado para resgatar a filha do presidente.',
    about: `Resident Evil 4 Remake é uma reimaginação completa do clássico revolucionário de 2005 utilizando a poderosa RE Engine da Capcom.

Acompanhe o agente Leon S. Kennedy em uma missão desesperada a um vilarejo europeu isolado, onde há algo terrivelmente errado com os habitantes locais. Com jogabilidade modernizada, combate com faca aprimorado, história reimaginada e gráficos ultra-detalhados, este é o cruzamento definitivo entre terror e ação.`,
    sysReq: {
      min: {
        os: 'Windows 10 (64 bit)',
        cpu: 'AMD Ryzen 3 1200 / Intel Core i5-7500',
        ram: '8 GB de RAM',
        gpu: 'AMD Radeon RX 560 4GB / NVIDIA GeForce GTX 1050 Ti 4GB',
        storage: '67 GB de espaço disponível'
      },
      rec: {
        os: 'Windows 10 / 11 (64 bit)',
        cpu: 'AMD Ryzen 5 3600 / Intel Core i7 8700',
        ram: '16 GB de RAM',
        gpu: 'AMD Radeon RX 5700 / NVIDIA GeForce GTX 1070 / RTX 3050',
        storage: '67 GB em SSD'
      }
    }
  },
  {
    id: 'red-dead-2',
    name: 'Red Dead Redemption 2',
    price: 119.90,
    oldPrice: 299.90,
    discount: 60,
    category: ['acao', 'aventura'],
    tags: ['Mundo Aberto', 'Faroeste', 'Obra-Prima', 'História Rica', 'Realista'],
    image: 'assets/imagens/RDR2.png',
    screenshots: [
      'assets/imagens/RDR2.png'
    ],
    video: null,
    rating: 'Muito positivas (92% de 580.000 análises)',
    developer: 'Rockstar Games',
    publisher: 'Rockstar Games',
    releaseDate: '05/12/2019',
    playUrl: null,
    pageFile: 'jogos/red-dead-2.html',
    defaultHours: '94,7 horas',
    achievementsText: '38 de 51 (75%)',
    achievementsPct: 75,
    shortDesc: 'Vencedor de mais de 175 prêmios de Jogo do Ano, RDR2 é um conto épico de honra e lealdade no alvorecer da era moderna ao lado de Arthur Morgan e a gangue Van der Linde.',
    about: `Estados Unidos, 1899. O fim da era do velho oeste começou. Depois de tudo dar errado durante um roubo em uma cidade do oeste chamada Blackwater, Arthur Morgan e a gangue Van der Linde são forçados a fugir.

Com agentes federais e os melhores caçadores de recompensas no seu encalço, a gangue precisa roubar, assaltar e lutar para sobreviver no coração implacável dos Estados Unidos.`,
    sysReq: {
      min: {
        os: 'Windows 10 - 64-bit',
        cpu: 'Intel Core i5-2500K / AMD FX-6300',
        ram: '8 GB de RAM',
        gpu: 'Nvidia GeForce GTX 770 2GB / AMD Radeon R9 280 3GB',
        storage: '150 GB de espaço disponível'
      },
      rec: {
        os: 'Windows 10 / 11 - 64-bit',
        cpu: 'Intel Core i7-4770K / AMD Ryzen 5 1500X',
        ram: '12 GB de RAM',
        gpu: 'Nvidia GeForce GTX 1060 6GB / RTX 3050 / AMD RX 480',
        storage: '150 GB em SSD'
      }
    }
  },
  {
    id: 'god-of-war',
    name: 'God of War',
    price: 119.95,
    oldPrice: 199.90,
    discount: 40,
    category: ['acao', 'aventura', 'rpg'],
    tags: ['Mitologia Nórdica', 'Ação', 'Hack and Slash', 'Um Jogador', 'Aventura'],
    image: 'assets/imagens/GOW.png',
    screenshots: [
      'assets/imagens/GOW.png'
    ],
    video: null,
    rating: 'Extremamente positivas (96% de 105.000 análises)',
    developer: 'Santa Monica Studio',
    publisher: 'PlayStation Publishing LLC',
    releaseDate: '14/01/2022',
    playUrl: null,
    pageFile: 'jogos/god-of-war.html',
    defaultHours: '41,2 horas',
    achievementsText: '37 de 37 (100%)',
    achievementsPct: 100,
    shortDesc: 'Com a vingança contra os deuses do Olimpo em um passado distante, Kratos agora vive como um mortal no reino dos deuses e monstros nórdicos ao lado de seu filho Atreus.',
    about: `É nesse mundo duro e impiedoso que Kratos deve lutar para sobreviver... e ensinar seu filho Atreus a fazer o mesmo.

Empunhe o poderoso Machado Leviatã, enfrente criaturas colossais da mitologia nórdica em câmera contínua sem cortes e desfrute de suporte para taxas de quadros desbloqueadas e gráficos aprimorados no PC.`,
    sysReq: {
      min: {
        os: 'Windows 10 64-bit',
        cpu: 'Intel i5-2500k (4 core 3.3 GHz) ou AMD Ryzen 3 1200',
        ram: '8 GB de RAM',
        gpu: 'NVIDIA GTX 960 (4 GB) ou AMD R9 290X (4 GB)',
        storage: '70 GB de espaço disponível'
      },
      rec: {
        os: 'Windows 10 / 11 64-bit',
        cpu: 'Intel i5-6600k ou AMD Ryzen 5 2400 G / 4600G',
        ram: '16 GB de RAM',
        gpu: 'NVIDIA GTX 1060 (6 GB) / RTX 3050',
        storage: '70 GB em SSD'
      }
    }
  },
  {
    id: 'spider-man',
    name: "Marvel's Spider-Man Remastered",
    price: 149.90,
    oldPrice: 249.90,
    discount: 40,
    category: ['acao', 'aventura'],
    tags: ['Super-Heróis', 'Mundo Aberto', 'Ação', 'Marvel', 'Terceira Pessoa'],
    image: 'assets/imagens/Spiderman.png',
    screenshots: [
      'assets/imagens/Spiderman.png'
    ],
    video: null,
    rating: 'Extremamente positivas (96% de 78.200 análises)',
    developer: 'Insomniac Games, Nixxes Software',
    publisher: 'PlayStation Publishing LLC',
    releaseDate: '12/08/2022',
    playUrl: null,
    pageFile: 'jogos/spider-man.html',
    defaultHours: '29,5 horas',
    achievementsText: '55 de 78 (71%)',
    achievementsPct: 71,
    shortDesc: 'Em Marvel’s Spider-Man Remasterizado, os mundos de Peter Parker e do Spider-Man entram em conflito em uma história original cheia de ação na Nova York da Marvel.',
    about: `Jogue como um Peter Parker experiente, lutando contra grandes crimes e vilões icônicos na Nova York da Marvel. Ao mesmo tempo, ele tenta equilibrar sua vida pessoal caótica e sua carreira enquanto o destino de milhões de nova-iorquinos está em suas mãos.`,
    sysReq: {
      min: {
        os: 'Windows 10 64-bit',
        cpu: 'Intel Core i3-4160, 3.6 GHz ou equivalente AMD',
        ram: '8 GB de RAM',
        gpu: 'NVIDIA GTX 950 ou AMD Radeon RX 470',
        storage: '75 GB de espaço disponível'
      },
      rec: {
        os: 'Windows 10 / 11 64-bit',
        cpu: 'Intel Core i5-4670 ou AMD Ryzen 5 1600',
        ram: '16 GB de RAM',
        gpu: 'NVIDIA GTX 1060 6GB / RTX 3050 ou AMD Radeon RX 580',
        storage: '75 GB em SSD'
      }
    }
  },
  {
    id: 'mortal-kombat-1',
    name: 'Mortal Kombat 1',
    price: 139.95,
    oldPrice: 279.90,
    discount: 50,
    category: ['acao', 'luta'],
    tags: ['Luta 2.5D', 'Multijogador', 'Violência Extrema', 'Competitivo'],
    image: 'assets/imagens/MK1.png',
    screenshots: [
      'assets/imagens/MK1.png'
    ],
    video: null,
    rating: 'Muito positivas (81% de 24.100 análises)',
    developer: 'NetherRealm Studios',
    publisher: 'Warner Bros. Games',
    releaseDate: '19/09/2023',
    playUrl: null,
    pageFile: 'jogos/mortal-kombat-1.html',
    defaultHours: '22,0 horas',
    achievementsText: '25 de 51 (49%)',
    achievementsPct: 49,
    shortDesc: 'Descubra um Universo renascido de Mortal Kombat criado pelo Deus do Fogo Liu Kang. Mortal Kombat 1 inaugura uma nova era da franquia icônica!',
    about: `Está no nosso sangue! Descubra um Universo renascido de Mortal Kombat criado pelo Deus do Fogo Liu Kang.

Mortal Kombat 1 inaugura uma nova era da franquia icônica com um novo sistema de luta, modos de jogo, Lutadores de Parceria (Kameo Fighters) e Fatalities cinematográficos.`,
    sysReq: {
      min: {
        os: 'Windows 10 64-bit',
        cpu: 'Intel Core i5-6600 | AMD Ryzen 3 3100',
        ram: '8 GB de RAM',
        gpu: 'Nvidia GeForce GTX 980 ou AMD Radeon RX 470',
        storage: '100 GB de espaço disponível'
      },
      rec: {
        os: 'Windows 10 / 11 64-bit',
        cpu: 'Intel Core i5-8400 | AMD Ryzen 5 3600X',
        ram: '16 GB de RAM',
        gpu: 'Nvidia GeForce GTX 1080 Ti ou AMD Radeon RX 5700 XT',
        storage: '100 GB em SSD'
      }
    }
  },
  {
    id: 'batman',
    name: 'Batman: Arkham Knight',
    price: 17.99,
    oldPrice: 89.99,
    discount: 80,
    category: ['acao', 'aventura'],
    tags: ['Super-Heróis', 'Furtivo', 'Mundo Aberto', 'Ação', 'Detetive'],
    image: 'assets/imagens/Batman.png',
    screenshots: [
      'assets/imagens/Batman.png'
    ],
    video: null,
    rating: 'Extremamente positivas (93% de 95.000 análises)',
    developer: 'Rocksteady Studios',
    publisher: 'Warner Bros. Games',
    releaseDate: '23/06/2015',
    playUrl: null,
    pageFile: 'jogos/batman-arkham-knight.html',
    defaultHours: '51,3 horas',
    achievementsText: '89 de 113 (78%)',
    achievementsPct: 78,
    shortDesc: 'Batman: Arkham Knight traz a premiada trilogia Arkham da Rocksteady Studios à sua conclusão épica, apresentando o Batmóvel com design exclusivo.',
    about: `No explosivo final da série Arkham, o Batman enfrenta a ameaça definitiva contra a cidade que ele jurou proteger. O Espantalho retorna para unir uma impressionante lista de supervilões, incluindo Pinguim, Duas-Caras, Arlequina e o misterioso Arkham Knight.`,
    sysReq: {
      min: {
        os: 'Win 7 SP1, Win 8.1 / Win 10 (64-bit)',
        cpu: 'Intel Core i5-750, 2.67 GHz | AMD Phenom II X4 965',
        ram: '6 GB de RAM',
        gpu: 'NVIDIA GeForce GTX 660 (2 GB) | AMD Radeon HD 7870',
        storage: '45 GB de espaço disponível'
      },
      rec: {
        os: 'Windows 10 / 11 (64-bit)',
        cpu: 'Intel Core i7-3770, 3.4 GHz | AMD FX-8350, 4.0 GHz',
        ram: '8 GB de RAM',
        gpu: 'NVIDIA GeForce GTX 760 / RTX 3050',
        storage: '55 GB de espaço disponível'
      }
    }
  },
  {
    id: 'last-of-us-2',
    name: 'The Last of Us Part II Remastered',
    price: 249.90,
    oldPrice: null,
    discount: 0,
    category: ['acao', 'aventura', 'terror'],
    tags: ['Pós-Apocalíptico', 'História Emocionante', 'Furtivo', 'Sobrevivência'],
    image: 'assets/imagens/TLOU.PNG',
    screenshots: [
      'assets/imagens/TLOU.PNG'
    ],
    video: null,
    rating: 'Muito positivas (90% de 44.800 análises)',
    developer: 'Naughty Dog LLC, Nixxes Software',
    publisher: 'PlayStation Publishing LLC',
    releaseDate: '03/04/2025',
    playUrl: null,
    pageFile: 'jogos/the-last-of-us-2.html',
    defaultHours: '34,0 horas',
    achievementsText: '31 de 44 (70%)',
    achievementsPct: 70,
    shortDesc: 'Cinco anos depois de uma jornada perigosa pelos Estados Unidos pós-pandêmicos, Ellie e Joel se acomodaram em Jackson, Wyoming, até que um evento violento interrompe a paz.',
    about: `Vivencie o vencedor de mais de 300 prêmios de Jogo do Ano, agora com melhorias técnicas para PC, incluindo o modo de sobrevivência roguelike "Sem Volta" (No Return), níveis perdidos com comentários dos desenvolvedores e suporte total a monitores de alta taxa de atualização.`,
    sysReq: {
      min: {
        os: 'Windows 10/11 64-bit',
        cpu: 'Intel Core i3-8100 ou AMD Ryzen 3 1300X',
        ram: '16 GB de RAM',
        gpu: 'NVIDIA GeForce GTX 1650 ou AMD Radeon RX 5500XT',
        storage: '150 GB em SSD'
      },
      rec: {
        os: 'Windows 10/11 64-bit',
        cpu: 'Intel Core i5-8600 ou AMD Ryzen 5 3600',
        ram: '16 GB de RAM',
        gpu: 'NVIDIA GeForce RTX 3060 ou AMD Radeon RX 5700',
        storage: '150 GB em SSD NVMe'
      }
    }
  }
];
