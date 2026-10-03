let loadedScripts = 0;

const scriptsReady = new Promise(resolve => {
    window.finishScripts = () => {
        resolve();
    };
});

function loadScripts(src) {
    const script = document.createElement("script");

    script.src = src;
    script.async = false;

    script.onload = () => {
        loadedScripts++;

        if (loadedScripts === scripts.length) {
            finishScripts();
            console.log("All scripts were loaded!");
        }
    };

    script.onerror = () => {
        console.error(`Failed to load: ${src}`);
    };

    document.head.appendChild(script);
};

const scripts = [
	"theme.js",
	"components.js",
    "fetch-news.js",

    "fa.js",
	"diary-text.js",
	"header-sub.js",
	"current-nav.js",
	"sounds.js",
	"reduce-motion.js",
    "loading-bar.js",
	"tooltip.js"
];

scripts.forEach(archive => {
    loadScripts("/js/"+archive)
});