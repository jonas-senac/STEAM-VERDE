# 🎮 TechPlay — Steam Clone

Uma plataforma de distribuição digital de jogos inspirada na Steam, desenvolvida com **HTML, CSS e JavaScript**.

A TechPlay é um projeto que busca reproduzir a experiência de uma loja digital de jogos, oferecendo funcionalidades como catálogo, pesquisa, filtros, páginas individuais de jogos, sistema de contas, carrinho de compras e biblioteca pessoal.

O projeto foi desenvolvido com foco na prática de desenvolvimento web, manipulação do DOM, organização de dados e armazenamento local no navegador.

---

## 🖥️ Demonstração

**Acesse o projeto:** [[TechPlay — Demonstração](#)](https://jonas-senac.github.io/STEAM-VERDE/)

---

## 📸 Funcionalidades

### 🛒 Loja
- Catálogo de jogos disponíveis.
- Jogos em destaque.
- Pesquisa por nome ou tags.
- Filtro por categorias.
- Ordenação por preço e ordem alfabética.
- Páginas individuais com informações detalhadas dos jogos.

### 👤 Sistema de contas
- Cadastro de novos usuários.
- Login e logout.
- Sistema de múltiplas contas.
- Perfis independentes armazenados no navegador.

### 🎮 Biblioteca
- Biblioteca pessoal de jogos.
- Listagem dos jogos adquiridos.
- Pesquisa dentro da biblioteca.
- Informações de cada jogo.
- Acesso às páginas individuais dos jogos.

### 🛍️ Carrinho
- Adição e remoção de jogos.
- Cálculo automático do valor total.
- Finalização de compra simulada.
- Transferência dos jogos para a biblioteca.

### 🌐 Outras seções
- Central da comunidade.
- Página de suporte.
- Interface inspirada no cliente Steam.

---

## 🧰 Tecnologias utilizadas

| Tecnologia | Utilização |
|---|---|
| HTML5 | Estrutura das páginas |
| CSS3 | Estilização e responsividade |
| JavaScript | Lógica e interatividade |
| LocalStorage | Persistência de dados no navegador |
| Git | Controle de versão |
| GitHub Actions | Verificações automatizadas |

---

## 🚀 Como executar o projeto

Não é necessário instalar dependências ou configurar um servidor backend.

**1. Clone o repositório:**

```bash
git clone
```

**2. Entre na pasta do projeto:**

```bash
cd TechPlay_Steam_Clone
```

**3. Execute o projeto:**

Abra o arquivo `index.html` no navegador.

Recomendação: utilize a extensão **Live Server** do Visual Studio Code para executar o projeto durante o desenvolvimento.

---

## 💾 Armazenamento de dados

O projeto utiliza o `LocalStorage` do navegador para armazenar informações como:

- Contas cadastradas.
- Sessão do usuário.
- Jogos adicionados à biblioteca.
- Itens do carrinho.

Dessa forma, os dados permanecem salvos no navegador mesmo após fechar a página.

**Importante:** o sistema de contas e compras é demonstrativo. Não existe integração com banco de dados, autenticação em servidor ou processamento real de pagamentos.

---

## ⚙️ Automação e verificações

O projeto possui um workflow do GitHub Actions localizado em `.github/workflows/pipeline.yml`.

Ele foi desenvolvido para realizar verificações automáticas relacionadas a:

- Arquivos não permitidos.
- Existência dos arquivos principais.
- Possíveis chaves e tokens expostos.
- Sintaxe JavaScript.
- Conflitos de merge.

---

## 🎯 Objetivo do projeto

Este projeto tem como objetivo aplicar conhecimentos de desenvolvimento web por meio da criação de uma plataforma interativa inspirada em uma loja digital de jogos.

Durante seu desenvolvimento, foram trabalhados conceitos como:

- Estruturação de páginas com HTML5.
- Estilização e organização com CSS3.
- Manipulação do DOM com JavaScript.
- Eventos e interatividade.
- Manipulação de arrays e objetos.
- Armazenamento de dados com LocalStorage.
- Organização de arquivos e controle de versão com Git e GitHub.

---

## 👨‍💻 Desenvolvedor

Desenvolvido por **João, Mauricio e Andrey**.

Projeto desenvolvido para fins educacionais e de aprendizado em desenvolvimento web.

---

*TechPlay — Sua próxima aventura começa aqui! 🎮*
