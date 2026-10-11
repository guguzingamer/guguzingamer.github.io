// Config here!

var scriptsToLoad = [
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

const debugMode = true

// Gets the custom elements

const customScripts = document.querySelectorAll("custom-script") 

customScripts.forEach(el => {
    const source = el.getAttribute("src")
    const nSource = source.replace("/js/", "")

    scriptsToLoad.splice(3, 0, nSource)
})

// ----- Loading Bar -----

const loadingBar = document.createElement("progress")
loadingBar.max = scriptsToLoad.length
loadingBar.value = 0
loadingBar.classList.add("loading-bar")

document.body.append(loadingBar)

let loadedScripts = 0

function finishLoading() {
	loadingBar.classList.add("is-complete");
	console.log("All scripts loaded!")
}

async function loadScript(path) {
	const archive = await import(path)
	
	if (typeof archive.init === "function") {
		await archive.init()
		
		if (debugMode) {
			console.log(path + " loaded!")
		}

		loadedScripts++
		// console.log(loadedScripts)
		
		loadingBar.value = loadedScripts
		if (loadedScripts == scriptsToLoad.length) {
			finishLoading()
		}
	}
}

async function loadAllScripts() {
	for (const src of scriptsToLoad) {
		await loadScript("/js/" + src)
	}
}

loadAllScripts()