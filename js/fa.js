
export function init() {
    const faScript = document.createElement('script');

    faScript.src = "https://kit.fontawesome.com/43be5e9799.js";
    faScript.crossOrigin = "anonymous";

    window.fontAwesomeReady = new Promise (resolve => {
        faScript.onload = resolve;

        faScript.onerror = () => {
            console.error("Failed to load Font Awesome");
            resolve();
        };
    })

    document.head.appendChild(faScript);
}