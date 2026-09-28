const message = {
    sunday: "Checkpoint! The start of a new week!",
    monday: "\"I hate Mondays\" ~ a chill cat",
    tuesday: "What do you think? Comfy, right?",
    wednesday: "I cause chaos. I don't succumb to it.",
    thursday: "Did you know that you are cool?",
    friday: "Absolute Cinema day!",
    saturday: "Let's go gaming! Best day of the week.",
};

function setTodaysText() {
    const days = [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday"
    ];

    const today = days[new Date().getDay()];
    const text = message[today];

    document.getElementById("diaryText").textContent = text;
}

componentsReady.then(() => {
    setTodaysText();
});