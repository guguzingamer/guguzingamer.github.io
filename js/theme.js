// Get theme

function getTheme() {
    if (!localStorage.getItem("theme")) {
        localStorage.setItem("theme", "sync")
    }

    return localStorage.getItem("theme") || "sync";
}

// Apply theme

const syncOpt = document.querySelector("label[for='sync']")

function applyTheme(sysTheme) {
    const preference = getTheme();

    const theme = preference === "sync"
        ? (sysTheme.matches ? "dark" : "light")
        : preference;

    document.documentElement.dataset.theme = theme;

    if (syncOpt) {
        syncOpt.classList.remove("sync-dark", "sync-light")
        syncOpt.classList.add("sync-" + (sysTheme.matches ? "dark" : "light"))
    }
}

// Store theme

function storeTheme(theme) {
    localStorage.setItem("theme", theme);
    applyTheme(systemTheme);
}

// Checked radio

function checkForRadio() {
    const savedTheme = getTheme();
    const input = document.getElementById(savedTheme);

    if (input) {
        input.checked = true;
    }
}

export function init() {

    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

    systemTheme.addEventListener("change", () => {
        if (getTheme() === "sync") {
            applyTheme(systemTheme);
        }
    })

    window.addEventListener("themeChanged", (value) => {
        applyTheme(systemTheme)
    })

    applyTheme(systemTheme);
    checkForRadio();
}