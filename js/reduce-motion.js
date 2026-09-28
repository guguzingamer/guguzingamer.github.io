function getMotionValue() {
    const value = localStorage.getItem("reduce-motion")

    if (value == "true") {
        return true
    }
    else {
        return false
    }
}

function applyMotion() {
    let state = getMotionValue()
    if (!localStorage.getItem("reduce-motion")) {
        localStorage.setItem("reduce-motion", false)
    }
    document.documentElement.setAttribute("data-reduce-motion", state)
}

applyMotion()
window.addEventListener("reduce-motionChanged", () => {
    applyMotion()
})