function createPText(id, el) {
    const returned = document.createElement("p")
    returned.classList.add(id)
    returned.textContent  = el.textContent 
    return returned
}

const sections = document.querySelectorAll("section")

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

    nA.classList.add("button")
    nA.classList.add("hover")
    nA.href = src

    nA.append(nIcon)
    nA.append(nName)
    nA.append(nVersion)
    nA.append(nSummary)
    nA.append(nBadges)

    sectionUl.append(newLi)
    newLi.append(nA)

    nA.addEventListener("mouseenter", () => {
        playSound(hoverSound);
    });
}

const projectsList = fetch("/data/projects.json")
    .then(response => response.json())
    .then(async data => {
        for (const category in data.projects_list) {
            const section = document.querySelector(`#${category}`);
            const sectionUl = section.querySelector("ul");

            for (const projectName of data.projects_list[category]) {
                await createProjectA(`/pages/projects/${projectName}.html`, sectionUl);
            }
        }
    })