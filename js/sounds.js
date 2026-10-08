const hoverSound = new Audio("/assets/sounds/hover.mp3")

function random(min, max) {
    var result = Math.random() * (max - min) + min;
    return result
}

function getSound() {
    if (!localStorage.getItem("sound")) {
        localStorage.setItem("sound", true)
    }
    return localStorage.getItem("sound") !== "false";
}

function playSound(audio) {
    if (!getSound()) {
        return
    }

    audio.playbackRate = random(4, 5)
    audio.volume = 1
    audio.currentTime = 0
    audio.play().catch(() => {})
}

function storeSound(enabled) {
    localStorage.setItem("sound", enabled);
}

getSound()
componentsReady.then(() => {
    const elements = document.querySelectorAll(".hover")
    
    elements.forEach(element => {
        element.addEventListener("mouseenter", function() {
            playSound(hoverSound)
        })
    })
})