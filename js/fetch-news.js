async function getLatestArticles() {
    const response = await fetch("/data/news.json");

    if (!response.ok) {
        throw new Error("Data news.json wasn't able to be loaded!");
    }

    const data = await response.json();

    var newArray = []
    for (let index = 0; index < 3; index++) {
        if (!data.news_list[index]) {continue}

        newArray[index] = data.news_list[index]
    }
    return newArray
}

function createAsideText(type, id, el) {
    var returned = document.createElement(type)
    returned.classList.add(id)
    returned.innerHTML = el.innerHTML
    return returned
}

async function loadArticleToAside(src, asideUl) {
    const response = await fetch(src+".html");

    if (!response.ok) {
        throw new Error("Article ${src} wasn't able to be loaded!");
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

    const newH3 = createAsideText("h3", "name", name)
    newH3.title = newH3.innerHTML

    const newP = createAsideText("p", "summary", summary)
    const newSmall = createAsideText("small", "date", date)

    newA.classList.add("group")
    newA.href = src

    newA.append(newImg)
    newA.append(newH3)
    newA.append(newP)
    newA.append(newSmall)

    asideUl.append(newLi)
    newLi.append(newA)
}

componentsReady.then(async () => {
    const asideUl = document.querySelector("aside ul")
    const latestNews = await getLatestArticles()

    for (const article of latestNews) {
        await loadArticleToAside("/pages/news/" + article, asideUl);
    }
});