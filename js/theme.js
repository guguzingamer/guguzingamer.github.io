const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

// Get theme

function getTheme() {
    if (!localStorage.getItem("theme")) {
        localStorage.setItem("theme", "sync")
    }

    return localStorage.getItem("theme") || "sync";
}

// Apply theme

const syncOpt = document.querySelector("label[for='sync']")

function applyTheme() {
    const preference = getTheme();

    const theme = preference === "sync"
        ? (systemTheme.matches ? "dark" : "light")
        : preference;

    document.documentElement.dataset.theme = theme;

    if (syncOpt) {
        syncOpt.classList.remove("sync-dark", "sync-light")
        syncOpt.classList.add("sync-" + (systemTheme.matches ? "dark" : "light"))
    }
}

// Store theme

function storeTheme(theme) {
    localStorage.setItem("theme", theme);
    applyTheme();
}

// Checked radio

function checkForRadio() {
    const savedTheme = getTheme();
    const input = document.getElementById(savedTheme);

    if (input) {
        input.checked = true;
    }
}

systemTheme.addEventListener("change", () => {
    if (getTheme() === "sync") {
        applyTheme();
    }
})

window.addEventListener("themeChanged", (value) => {
    applyTheme()
})

applyTheme();
checkForRadio();