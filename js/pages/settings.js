// grid or toggle?

function isGrid(section) {
    if (section.classList.contains("grid")) {
        return true;
    }
    else if (section.classList.contains("toggle")) {
        return false;
    }
}

// addListener

function saveToStorage(key, value) {
    localStorage.setItem(key, value);

    window.dispatchEvent(new CustomEvent((key+"Changed"), {
        detail: {
            value: value
        }
    }));
};

function addListener(section) {
    if (isGrid(section)) {

        const options = section.querySelectorAll("input")
        options.forEach(input => {
            input.addEventListener("change", () => {
                saveToStorage(input.name, input.id)
            });
        });
    }
    else {
        const input = section.querySelector("input");

        input.addEventListener("change", () => {
            saveToStorage(input.name, input.checked)
        });
    }
}

// checkInputs

function getStorage(key) {
    return localStorage.getItem(key)
}

function checkInputs(section) {
    if (isGrid(section)) {
        const value = getStorage(section.id)

        const element = document.querySelector("#"+value)
        element.checked = true
    }
    else {
        const value = getStorage(section.id)
        const element = document.querySelector("#"+ section.id +"-toggle")
        
        if (value === "true") {
            element.checked = value
        }
        else {
            element.checked = false
        }
    }
}

// This controls each function
const settingsSections = document.querySelectorAll("section");
scriptsReady.then(() => {
    settingsSections.forEach(element => {
        addListener(element)
        checkInputs(element)
    });
})