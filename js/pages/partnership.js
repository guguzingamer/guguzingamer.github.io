const numb = document.getElementById("number");
const ulLi = document.querySelectorAll(".li");

var count = 0
ulLi.forEach(li => {
    count += 1
});

numb.innerHTML = count;