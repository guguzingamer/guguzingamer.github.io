componentsReady.then(() => {
    const names = document.querySelectorAll(".tooltip")

    names.forEach(tag => {
        tag.title = tag.innerHTML
    });
});