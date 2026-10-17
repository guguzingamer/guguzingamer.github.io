export function init() {
    const headerNav = document.querySelectorAll("#header-main nav a")

    function checkDevMode() {
        const opt = localStorage.getItem("dev-mode")
        return opt
    }

    function applyDevMode() {
        const opt = checkDevMode()

        if (opt === "true") {
            headerNav.forEach(el => {
                const id = el.getAttribute("id")

                if (id === "home-nav") {
                    return
                }

                const href = el.getAttribute("href")
                el.setAttribute("href", (href + ".html"))
            })
        }
        else if (opt === "false") {
            headerNav.forEach(el => {
                const id = el.getAttribute("href")

                const nId = id.replace(".html", "")
                el.setAttribute("href", nId)
            })
        }
    }
    applyDevMode()

    window.addEventListener("dev-modeChanged", () => {
        applyDevMode()
    })
}