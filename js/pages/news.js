function createNewsText(type, id, el) {
    var returned = document.createElement(type)
    returned.classList.add(id)
    returned.textContent = el.textContent
    return returned
}

function adaptFeatured(el) {
    el.classList.add("highlight", "featured")

    const newP = document.createElement("p")
    newP.innerText = "Featured Article"
    newP.classList.add("featured-text")

    const wrapper = document.createElement("div")
    const contentName = el.querySelector(".name")
    const contentSummary = el.querySelector(".summary")

    wrapper.append(newP)
    wrapper.append(contentName)
    wrapper.append(contentSummary)

    const a = el.querySelector("a")
    a.append(wrapper)
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

    const newP = createNewsText("p", "summary", summary)
    const newSmall = createNewsText("small", "date", date)

    newA.classList.add("button", "hover")
    newA.href = src

    newA.append(newImg)
    newA.append(newH3)
    newA.append(newP)
    newA.append(newSmall)

    newsContainer.append(newLi)
    newLi.append(newA)

    return newLi
}

export async function init() {
    const newsContainer = document.querySelector("#news-container")

    const newsList = await fetch("/data/news.json")

    if (!newsList) {
        console.warn("Data news.json could not be loaded!")
        return
    }

    const json = await newsList.json()

    for (const article of json.news_list) {
        if (first == null) {
            var first = true
        }

        if (first == true) {
            const featured = await loadNewsPage(`/pages/news/${article}.html`, newsContainer)
            adaptFeatured(featured)
        }

        else {
            await loadNewsPage(`/pages/news/${article}.html`, newsContainer);
        }
    }
}