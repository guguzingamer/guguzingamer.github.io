function setCurrentNavButton() {
    const currentPath = window.location.pathname;

    const links = document.querySelectorAll("#header-main nav a")
    var found = false;

    links.forEach(link => {
        if (new URL(link.href).pathname === "/") {
            return
        }

        const linkPath = new URL(link.href).pathname.replace(".html", "");
        const path = currentPath.replace(".html", "")

        if (path.includes(linkPath)) {
            link.classList.add("currentnavbutton");
            found = true;
        }
    });

    if (!found) {
        document.querySelector("#homenav").classList.add("currentnavbutton")
    }
}

componentsReady.then(() => {
    setCurrentNavButton();
});