// booked.js
// Booking confirmation page that Calendly redirects to.
// With "Pass event details to your redirected page" turned on in
// Calendly, the URL carries the invitee's name and the start time,
// e.g. /booked/?invitee_full_name=Ana%20B&event_start_time=2026-10-20T14:00:00-05:00

(function () {
    // ---- Settings Chimi can change ------------------------------------

    // Paste the welcome video link here (YouTube or Vimeo). Leave empty
    // to show the written welcome instead.
    const VIDEO_URL = "";

    // Free community invite link (Circle).
    const COMMUNITY_URL =
        "https://sheemetalksmoney.circle.so/join?invitation_token=d5669fb6f6b12f67a9600ea0ca18dde67674ab4f-1a659cc4-ab79-48ae-a863-1bc7ffa48d71";

    // -------------------------------------------------------------------

    const params = new URLSearchParams(window.location.search);
    const root = document.documentElement;

    // Language: ?lang=fr|en, else the last choice, else the browser's.
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
        renderWhen(lang);
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

    // First name from Calendly.
    const fullName = (params.get("invitee_first_name") || params.get("invitee_full_name") || "").trim();
    const firstName = fullName.split(/\s+/)[0];
    if (firstName) {
        document.querySelectorAll(".js-first-name").forEach(function (el) {
            el.textContent = ", " + firstName;
        });
    }

    // Appointment time, shown in the visitor's own time zone.
    const start = new Date(params.get("event_start_time") || "");
    const whenBox = document.querySelector(".booked-when");

    function renderWhen(lang) {
        if (isNaN(start.getTime())) {
            return;
        }
        const locale = lang === "fr" ? "fr-FR" : "en-US";
        const text = start.toLocaleString(locale, {
            weekday: "long",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
            timeZoneName: "short"
        });
        document.querySelector(".js-when").textContent = "📅 " + text;
        whenBox.hidden = false;
    }

    // Video: turn a normal YouTube/Vimeo link into an embed link.
    function embedUrl(url) {
        const youtube = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{11})/);
        if (youtube) {
            return "https://www.youtube-nocookie.com/embed/" + youtube[1] + "?rel=0";
        }
        const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
        if (vimeo) {
            return "https://player.vimeo.com/video/" + vimeo[1];
        }
        return url;
    }

    if (VIDEO_URL) {
        document.querySelector(".js-video").src = embedUrl(VIDEO_URL);
        document.querySelector(".booked-video").hidden = false;
        document.querySelector(".booked-welcome").hidden = true;
        document.querySelector(".js-video-line").hidden = false;
    }

    document.querySelectorAll(".js-community-link").forEach(function (link) {
        link.href = COMMUNITY_URL;
    });

    document.querySelectorAll("[data-set-lang]").forEach(function (button) {
        button.addEventListener("click", function () {
            setLang(button.dataset.setLang);
        });
    });

    setLang(pickLang());
})();
