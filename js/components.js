const script = document.currentScript;
const base = new URL("../", script.src);

function loadComponent(id, file) {
    return fetch(new URL(file, base))
        .then(response => response.text())
        .then(html => {
            document.getElementById(id).innerHTML = html;
        });
}

window.componentsReady = Promise.all([
    loadComponent("wrapper-header-main", "/components/header-main.html"),
    loadComponent("header-sub", "/components/header-sub.html"),
    loadComponent("wrapper-aside", "/components/aside.html"),
    loadComponent("footer", "/components/footer.html")
]);