function createPText(id, el) {
    const returned = document.createElement("p")
    returned.classList.add(id)
    returned.textContent  = el.textContent 
    return returned
}

async function createProjectA(src, sectionUl) {
    const response = await fetch(src);

    if (!response.ok) {
        throw new Error(`Project ${src} wasn't able to be loaded!`);
    }

    const html = await response.text();

    const projectPage = new DOMParser()
        .parseFromString(html, "text/html");

    const icon = projectPage.querySelector("#icon")
    const name = projectPage.querySelector("#name")
    const summary = projectPage.querySelector("#summary")
    const version = projectPage.querySelector("#version")
    const badges = projectPage.querySelector("#badges")
        
    const newLi = document.createElement("li")
    const nA = document.createElement("a")

    const nIcon = document.createElement("img")
        nIcon.src = icon.src
        nIcon.alt = "icon"

    const nName = createPText("name", name)
    nName.title = nName.textContent

    const nSummary = createPText("summary", summary)
    const nVersion = createPText("version", version)

    const nBadges = badges.cloneNode(true)
    nBadges.classList.add("badges")
    nBadges.id = ""

    nA.classList.add("button", "hover")
    nA.href = src

    nA.append(nIcon)
    nA.append(nName)
    nA.append(nVersion)
    nA.append(nSummary)
    nA.append(nBadges)

    sectionUl.append(newLi)
    newLi.append(nA)
}

export async function init() {
    const sections = document.querySelectorAll("section")

    const projectsList = await fetch("/data/projects.json")

    if (!projectsList) {
        console.warn("Data projects.json could not be loaded!")
        return
    }

    const json = await projectsList.json()

    for (const category in json.projects_list) {
        const section = document.querySelector(`#${category}`);
        const sectionUl = section.querySelector("ul");

        for (const projectName of json.projects_list[category]) {
            await createProjectA(`/pages/projects/${projectName}.html`, sectionUl);
        }
    }
}