const burger = document.querySelector(".burger");
const menu = document.querySelector(".menu");
const iconBurger = document.querySelectorAll(".fas");
const items = document.querySelectorAll(".item");

burger.addEventListener("click", () => {
    menu.classList.toggle("active");
    iconBurger.forEach((icon) => {
        icon.classList.toggle("show");
    });
    items.forEach( (item) => {
        item.classList.toggle("active");
    })
})