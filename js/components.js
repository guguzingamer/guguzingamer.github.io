async function loadAllComponents(list) {
    await Promise.all(
        list.map(async item => {
            const path = ("/components/"+item+".html")
            const mPath = path.replace("wrapper-", "")

            const response = await fetch(mPath)

            if (!response.ok) {
                console.warn("Component " + item + "could not be loaded!")
                return
            }

            const html = await response.text();

            const target = document.querySelector("#"+item)
            target.innerHTML = html
        })
    )
}

export async function init() {
    const componentsList = [
        "wrapper-aside",
        "footer",
        "wrapper-header-main",
        "header-sub"
    ]

    await loadAllComponents(componentsList)
}