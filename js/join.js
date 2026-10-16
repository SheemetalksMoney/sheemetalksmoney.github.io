// join.js
// Community landing page. Share this page instead of the raw Circle
// invite link: Circle's invite link always opens its sign-up screen.

(function () {
    // ---- Settings Chimi can change ------------------------------------

    // Circle invite links. Once separate English and French invite links
    // exist, put the French one in INVITE_URL_FR.
    const INVITE_URL_EN =
        "https://sheemetalksmoney.circle.so/join?invitation_token=d5669fb6f6b12f67a9600ea0ca18dde67674ab4f-1a659cc4-ab79-48ae-a863-1bc7ffa48d71";
    const INVITE_URL_FR = INVITE_URL_EN;

    // -------------------------------------------------------------------

    const params = new URLSearchParams(window.location.search);
    const root = document.documentElement;

    function savedLang() {
        try {
            return localStorage.getItem("stm_lang");
        } catch (error) {
            return null;
        }
    }

    function setLang(lang) {
        root.lang = lang;
        document.querySelectorAll("[data-set-lang]").forEach(function (button) {
            button.setAttribute("aria-pressed", String(button.dataset.setLang === lang));
        });
        document.querySelectorAll(".js-join-link").forEach(function (link) {
            link.href = lang === "fr" ? INVITE_URL_FR : INVITE_URL_EN;
        });
        try {
            localStorage.setItem("stm_lang", lang);
        } catch (error) {
            // Storage blocked (private mode); the choice just isn't remembered.
        }
    }

    function pickLang() {
        const requested = params.get("lang") || savedLang();
        if (requested === "en" || requested === "fr") {
            return requested;
        }
        return (navigator.language || "en").toLowerCase().startsWith("fr") ? "fr" : "en";
    }

    document.querySelectorAll("[data-set-lang]").forEach(function (button) {
        button.addEventListener("click", function () {
            setLang(button.dataset.setLang);
        });
    });

    setLang(pickLang());
})();
