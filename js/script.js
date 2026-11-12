
const botaoTema = document.getElementById("botao-tema");
const temaSite = document.getElementById("tema-site");

const botaoMenu = document.getElementById("botao-menu");
const menuNavegacao = document.getElementById("menu-navegacao");

const logo = document.getElementById("logo-voryn");
const logoFooter = document.getElementById("logo-footer");
const logoSobre = document.getElementById("logo-sobre");

// Imagem da plataforma institucional
const imagemPlataforma =
    document.getElementById("imagem-plataforma");

/* =========================
   LOGOS HORIZONTAIS
========================= */

const logoEscura =
    "imagens/logo/identidade-visual/modo-escuro/horizontal/versao-horizontal.png";

const logoClara =
    "imagens/logo/identidade-visual/modo-claro/horizontal/fundo-branco-hor.png";

/* =========================
   LOGOS DO FOOTER
========================= */

const logoFooterEscura =
    "imagens/logo/identidade-visual/modo-escuro/horizontal/versao-horizontal.png";

const logoFooterClara =
    "imagens/logo/identidade-visual/modo-claro/horizontal/fundo-branco-hor.png";

/* =========================
   LOGOS DA PÁGINA SOBRE
========================= */

const logoSobreEscura =
    "imagens/logo/identidade-visual/modo-escuro/vertical/versao-vertical-g.png";

const logoSobreClara =
    "imagens/logo/identidade-visual/modo-claro/vertical/fundo-branco-vert-g.png";

/* =========================
   IMAGENS DOS PROJETOS
========================= */

const plataformaEscura =
    "imagens/projetos/plataforma-institucional/plataforma-escuro.png";

const plataformaClara =
    "imagens/projetos/plataforma-institucional/plataforma-claro.png";

/* =========================
   TEMA
========================= */

function aplicarTema(tema) {
    const temaClaro = tema === "light";

    // Alternar arquivo CSS
    if (temaSite) {
        temaSite.setAttribute(
            "href",
            temaClaro
                ? "css/style-light.css"
                : "css/style.css"
        );
    }

    // Alternar logo do cabeçalho
    if (logo) {
        logo.src = temaClaro
            ? logoClara
            : logoEscura;
    }

    // Alternar logo do rodapé
    if (logoFooter) {
        logoFooter.src = temaClaro
            ? logoFooterClara
            : logoFooterEscura;
    }

    // Alternar logo da página Sobre
    if (logoSobre) {
        logoSobre.src = temaClaro
            ? logoSobreClara
            : logoSobreEscura;
    }

    // Alternar imagem da plataforma institucional
    if (imagemPlataforma) {
        imagemPlataforma.src = temaClaro
            ? plataformaClara
            : plataformaEscura;
    }

    // Atualizar botão de tema
    if (botaoTema) {
        botaoTema.textContent =
            temaClaro ? "🌙" : "☀️";

        botaoTema.setAttribute(
            "aria-label",
            temaClaro
                ? "Ativar modo escuro"
                : "Ativar modo claro"
        );

        botaoTema.setAttribute(
            "title",
            temaClaro
                ? "Ativar modo escuro"
                : "Ativar modo claro"
        );
    }

    // Salvar preferência
    localStorage.setItem(
        "tema",
        temaClaro ? "light" : "dark"
    );
}

/* =========================
   INICIALIZAÇÃO DO TEMA
========================= */

const temaSalvo = localStorage.getItem("tema");

aplicarTema(
    temaSalvo === "light"
        ? "light"
        : "dark"
);

/* =========================
   BOTÃO DE ALTERNÂNCIA
========================= */

if (botaoTema) {
    botaoTema.addEventListener("click", () => {
        const temaAtual =
            localStorage.getItem("tema");

        aplicarTema(
            temaAtual === "light"
                ? "dark"
                : "light"
        );
    });
}

/* =========================
   MENU MOBILE
========================= */

function fecharMenu() {
    if (!menuNavegacao || !botaoMenu) {
        return;
    }

    menuNavegacao.classList.remove("ativo");

    botaoMenu.textContent = "☰";

    botaoMenu.setAttribute(
        "aria-expanded",
        "false"
    );

    botaoMenu.setAttribute(
        "aria-label",
        "Abrir menu"
    );
}

function alternarMenu() {
    if (!menuNavegacao || !botaoMenu) {
        return;
    }

    const menuAberto =
        menuNavegacao.classList.toggle("ativo");

    botaoMenu.textContent =
        menuAberto ? "✕" : "☰";

    botaoMenu.setAttribute(
        "aria-expanded",
        String(menuAberto)
    );

    botaoMenu.setAttribute(
        "aria-label",
        menuAberto
            ? "Fechar menu"
            : "Abrir menu"
    );
}

/* =========================
   EVENTOS DO MENU
========================= */

if (botaoMenu) {
    botaoMenu.addEventListener(
        "click",
        alternarMenu
    );
}

if (menuNavegacao) {
    const linksMenu =
        menuNavegacao.querySelectorAll("a");

    linksMenu.forEach((link) => {
        link.addEventListener(
            "click",
            fecharMenu
        );
    });
}

// Fechar menu ao clicar fora
document.addEventListener("click", (event) => {
    if (!menuNavegacao || !botaoMenu) {
        return;
    }

    const clicouNoMenu =
        menuNavegacao.contains(event.target);

    const clicouNoBotao =
        botaoMenu.contains(event.target);

    if (!clicouNoMenu && !clicouNoBotao) {
        fecharMenu();
    }
});

// Fechar menu ao voltar para desktop
window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
        fecharMenu();
    }
});
