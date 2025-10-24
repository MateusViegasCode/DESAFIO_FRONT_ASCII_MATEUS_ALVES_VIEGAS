# DESAFIO_FRONT_ASCII_MATEUS_ALVES_VIEGAS

## 1. Descrição do projeto

Este é um projeto desenvolvido como parte do desafio front-end para a empresa júnior ASCII. O que começou como uma landing page simples evoluiu para um site de múltiplas páginas, demonstrando uma arquitetura front-end moderna e robusta.

O site é uma aplicação web completa que inclui uma página inicial, uma página de **Loja Virtual** e um **Carrinho de Compras** totalmente funcional. O projeto foi construído do zero utilizando **TypeScript** e é inteiramente gerenciado e "bundlado" pelo **Webpack**.

## Principais Funcionalidades

* **Arquitetura Multi-Página:** O site é composto por 3 páginas distintas (`Home`, `Loja` e `Carrinho`), todas processadas e otimizadas pelo `HtmlWebpackPlugin`.
* **Loja Virtual:** Uma página de loja onde os produtos são exibidos dinamicamente.
* **Carrinho de Compras Funcional:**
    * **Adicionar ao Carrinho:** O cliente pode adicionar produtos da página da loja.
    * **Persistência de Dados:** O carrinho utiliza o **`localStorage`** do navegador como um "mini banco de dados" local. Isso significa que os produtos permanecem no carrinho mesmo se o usuário fechar a aba ou o navegador.
    * **Gerenciamento:** O cliente pode ver o total, remover itens individuais ou limpar o carrinho completamente.
* **Animações de UI/UX:** O site utiliza um `IntersectionObserver` (via TypeScript) para animar elementos (como os cards de produto) com um efeito de *fade-in* suave quando eles aparecem na tela.
* **Build System Moderno:** O projeto é configurado com Webpack, `ts-loader` para compilar TypeScript e `webpack-dev-server` para um fluxo de desenvolvimento rápido com *hot-reload*.

## 2. Link do Deploy

O projeto pode ser visualizado em produção através do link abaixo:

➡️ **[https://desafioasciimateusviegas.netlify.app/](https://desafioasciimateusviegas.netlify.app/)** 

## 3. Passo a passo de instalação

Para rodar este projeto localmente, siga os passos abaixo:

**Pré-requisitos:**
* Node.js (v18 ou superior)
* Git

**Instalação:**

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/MateusViegasCode/DESAFIO_FRONT_ASCII_MATEUS_ALVES_VIEGAS.git](https://github.com/MateusViegasCode/DESAFIO_FRONT_ASCII_MATEUS_ALVES_VIEGAS.git) 
    ```

2.  **Navegue até o diretório do projeto:**
    ```bash
    cd DESAFIO_FRONT_ASCII_MATEUS_ALVES_VIEGAS
    ```

3.  **Instale as dependências:**
    (Isso irá instalar o Webpack, TypeScript e todos os plugins necessários)
    ```bash
    npm install
    ```

4.  **Execute o projeto em modo de desenvolvimento:**
    (Isso iniciará um servidor local em `http://localhost:8080` com *hot-reload*)
    ```bash
    npm start
    ```

5.  **Para gerar os arquivos de produção (build):**
    (Isso criará a pasta `dist` final, pronta para o deploy)
    ```bash
    npm run build
    ```