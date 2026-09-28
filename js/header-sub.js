const headerMain = document.getElementById("wrapper-header-main");
const aside = document.getElementById("wrapper-aside");

function activeHeaderSub(id) {
    const element = document.getElementById(id);

    if (!element) {return};

    if (headerMain.classList.contains('active', true)) {
        headerMain.classList.toggle('active', false);
    };

    if (aside.classList.contains('active', true)) {
        aside.classList.toggle('active', false);
    };

    element.classList.toggle('active', true);
}

function closeHeaderSub(id) {
    const element = document.getElementById(id);

    if (!element) {return};

    element.classList.toggle('active', false)
}