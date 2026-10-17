export function init() {
    function setCurrentNavButton() {
        const currentUrl = window.location.pathname
        const navOpts = document.querySelectorAll("#header-main nav a")

        let found = false

        navOpts.forEach(link => {
            const href = link.getAttribute("href")

            if (href === "/") {
                return
            }
            const nHref = href.replace(".html", "")
            if (currentUrl.includes(nHref)) {
                link.classList.add("current-nav-button")
                found = true
            }
        })
        if (!found) {
            document.querySelector("#home-nav").classList.add("current-nav-button")
        }
    }
    setCurrentNavButton()
}