const botaoTema = document.getElementById("botao-tema");
const temaSite = document.getElementById("tema-site");

const botaoMenu = document.getElementById("botao-menu");
const menuNavegacao = document.getElementById("menu-navegacao");

const logo = document.getElementById("logo-voryn");
const logoFooter = document.getElementById("logo-footer");
const logoSobre = document.getElementById("logo-sobre");

// Logos horizontais
const logoEscura =
    "imagens/logo/identidade-visual/modo-escuro/horizontal/versao-horizontal.png";

const logoClara =
    "imagens/logo/identidade-visual/modo-claro/horizontal/fundo-branco-hor.png";

// Logos do footer
const logoFooterEscura =
    "imagens/logo/identidade-visual/modo-escuro/horizontal/versao-horizontal.png";

const logoFooterClara =
    "imagens/logo/identidade-visual/modo-claro/horizontal/fundo-branco-hor.png";

// Logos verticais da página Sobre
const logoSobreEscura =
    "imagens/logo/identidade-visual/modo-escuro/vertical/versao-vertical-g.png";

const logoSobreClara =
    "imagens/logo/identidade-visual/modo-claro/vertical/fundo-branco-vert-g.png";

/* =========================
   TEMA
========================= */

function aplicarTema(tema) {
    const temaClaro = tema === "light";

    if (temaSite) {
        temaSite.setAttribute(
            "href",
            temaClaro ? "style-light.css" : "style.css"
        );
    }

    if (logo) {
        logo.src = temaClaro ? logoClara : logoEscura;
    }

    if (logoFooter) {
        logoFooter.src = temaClaro
            ? logoFooterClara
            : logoFooterEscura;
    }

    if (logoSobre) {
        logoSobre.src = temaClaro
            ? logoSobreClara
            : logoSobreEscura;
    }

    if (botaoTema) {
        botaoTema.textContent = temaClaro ? "🌙" : "☀️";

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

    localStorage.setItem(
        "tema",
        temaClaro ? "light" : "dark"
    );
}

const temaSalvo = localStorage.getItem("tema");

aplicarTema(
    temaSalvo === "light" ? "light" : "dark"
);

if (botaoTema) {
    botaoTema.addEventListener("click", () => {
        const temaAtual = localStorage.getItem("tema");

        aplicarTema(
            temaAtual === "light" ? "dark" : "light"
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

window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
        fecharMenu();
    }
});