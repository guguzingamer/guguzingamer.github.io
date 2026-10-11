export function init() {
    const sidebars = {
        "wrapper-header-main": document.getElementById("wrapper-header-main"),
        "wrapper-aside": document.getElementById("wrapper-aside")
    }

    async function closeAll() {
        sidebars["wrapper-header-main"].classList.remove("active")
        sidebars["wrapper-aside"].classList.remove("active")
    }

    // Header Sub

    const activateButtons = document.querySelectorAll(".sidebar-active")

    activateButtons.forEach(el => {
        el.addEventListener("click", async () => {
            await closeAll()

            const type = el.getAttribute("data-sidebar-target")
            sidebars[type].classList.add("active")
        })
    })

    // Wrappers

    const closeButtons = document.querySelectorAll(".sidebar-close")

    closeButtons.forEach(el => {
        el.addEventListener("click", () => {
            closeAll()
        })
    })
}