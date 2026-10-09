var scripts = [
	"theme.js",
	"components.js",
    "fetch-news.js",

    "fa.js",
	"diary-text.js",
	"header-sub.js",
	"current-nav.js",
	"sounds.js",
	"reduce-motion.js",
	"tooltip.js",

    "test.js"
];

customScripts = document.querySelectorAll("custom-script")
console.log(customScripts)

customScripts.forEach(el => {
    const source = el.getAttribute("src")
    const nSource = source.replace("/js/", "")

    scripts.splice(3, 0, nSource)
})


// Loading Bar - start

const loadingBar = document.createElement("progress")
loadingBar.max = scripts.length
loadingBar.value = 0
loadingBar.classList.add("loading-bar")

document.body.append(loadingBar)

let loadedScripts = 0;

// Loading Bar - end

const scriptsReady = new Promise(resolve => {
    window.finishScripts = () => {
        loadingBar.classList.add("is-complete");
        console.log("All scripts loaded!")
        resolve();
    };
});

function loadScripts(src) {
    const script = document.createElement("script");

    script.src = src;
    script.async = false;

    script.onload = () => {
        loadedScripts++;
        loadingBar.value = loadedScripts

        if (loadedScripts === scripts.length) {
            finishScripts();
        }
    };

    script.onerror = () => {
        console.error(`Failed to load: ${src}`);
    };

    // console.log(`Script ${src} finished loading! Number: ${loadedScripts}`)
    document.head.appendChild(script);
};

scripts.forEach(archive => {
    loadScripts("/js/"+archive)
});