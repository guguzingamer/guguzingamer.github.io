const news = [
    "guguzin-cafe-launch.html",
];

function createText(type, id, el) {
    var returned = document.createElement(type)
    returned.classList.add(id)
    returned.innerHTML = el.innerHTML
    return returned
}

async function loadArticle(src, asideUl) {
    const response = await fetch(src);

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

    const newH3 = createText("h3", "name", name)
    newH3.title = newH3.innerHTML

    const newP = createText("p", "summary", summary)
    const newSmall = createText("small", "date", date)

    newA.classList.add("group")
    newA.href = src

    newA.append(newImg)
    newA.append(newH3)
    newA.append(newP)
    newA.append(newSmall)

    asideUl.append(newLi)
    newLi.append(newA)
}

componentsReady.then(() => {
    const asideUl = document.querySelector("aside ul")
    news.forEach(article => {
        loadArticle("/pages/news/" + article, asideUl);
    });
});