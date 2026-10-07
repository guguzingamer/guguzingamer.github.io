function createNewsText(type, id, el) {
    var returned = document.createElement(type)
    returned.classList.add(id)
    returned.textContent = el.textContent
    return returned
}

async function loadNewsPage(src, newsContainer) {
    const response = await fetch(src);

    if (!response.ok) {
        throw new Error(`News ${src} wasn't able to be loaded!`);
    }

    const html = await response.text();

    const articleDocument = new DOMParser()
        .parseFromString(html, "text/html");

    const name = articleDocument.querySelector("#name")
    const summary = articleDocument.querySelector("#summary")
    const date = articleDocument.querySelector("#date")
    const banner = articleDocument.querySelector("#banner")
        
    const newLi = document.createElement("li")
    const newA = document.createElement("a")

    const newImg = document.createElement("img")
        newImg.classList.add("banner")
        newImg.src = banner.src
        newImg.alt = "banner"

    const newH3 = createNewsText("h3", "name", name)
    newH3.title = newH3.textContent

    const newP = createNewsText("p", "summary", summary)
    const newSmall = createNewsText("small", "date", date)

    newA.classList.add("button")
    newA.classList.add("hover")
    newA.href = src

    newA.append(newImg)
    newA.append(newH3)
    newA.append(newP)
    newA.append(newSmall)

    newsContainer.append(newLi)
    newLi.append(newA)

    newA.addEventListener("mouseenter", () => {
        playSound(hoverSound);
    });
}

const newsContainer = document.querySelector("#news-container")

const newsList = fetch("/data/news.json")
    .then(response  => response.json())
    .then(async list => {
        for (const article of list.news_list) {
            await loadNewsPage(`/pages/news/${article}.html`, newsContainer);
        }
    })