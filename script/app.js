const burger = document.querySelector(".burger");
const menu = document.querySelector(".menu");
const iconBurger = document.querySelectorAll(".fas");
const items = document.querySelectorAll(".item");

burger.addEventListener("click", () => {
    menu.classList.toggle("active");
    iconBurger.forEach((icon) => {
        icon.classList.toggle("show");
    });
    items.forEach((item) => {
        item.classList.toggle("active");
    })
});

let galleryImages = document.querySelectorAll('.gallery-img');
let getLatestOpenedImg;
let windowWidth = window.innerWidth;

if (galleryImages) {
    galleryImages.forEach(function (image, index) {
        image.onclick = function () {
            let getElement = window.getComputedStyle(image);
            let getFullImgURL = getElement.getPropertyValue("background-image");
            let getImgURLPosition = getFullImgURL.split("/gallery/thumbs/");
            let setNewImgURL = getImgURLPosition[1].replace(`")`, '');

            getLatestOpenedImg = index + 1;
            let container = document.body;
            let newImgWindow = document.createElement('div');
            container.appendChild(newImgWindow);
            newImgWindow.setAttribute('class', 'img-window');
            newImgWindow.setAttribute('onclick', 'closeImg()');

            let newImg = document.createElement('img');
            newImgWindow.appendChild(newImg);
            newImg.setAttribute('src', '../images/gallery/' + setNewImgURL);
            newImg.setAttribute('id', 'current-img');

            newImg.onload = function () {
                let imgWidth = this.width;
                let calcImgToEdge = ((windowWidth - imgWidth) / 2) - 100;

                let newPrevBtn = document.createElement('a');
                let btnPrevText = document.createTextNode('Poprzednie');
                newPrevBtn.appendChild(btnPrevText);
                container.appendChild(newPrevBtn);
                newPrevBtn.setAttribute('class', 'img-btn-prev');
                newPrevBtn.setAttribute('onclick', 'changeImg(0)');
                newPrevBtn.style.cssText = `left: ${calcImgToEdge}px;`;

                let newNextBtn = document.createElement('a');
                let btnNextText = document.createTextNode('Następne');
                newNextBtn.appendChild(btnNextText);
                container.appendChild(newNextBtn);
                newNextBtn.setAttribute('class', 'img-btn-next');
                newNextBtn.setAttribute('onclick', 'changeImg(1)');
                newNextBtn.style.cssText = `right: ${calcImgToEdge}px;`;
            }
        }
    });
}

function closeImg() {
    document.querySelector('.img-window').remove();
    document.querySelector('.img-btn-next').remove();
    document.querySelector('.img-btn-prev').remove();
}

function changeImg(changeDir) {
    document.querySelector('#current-img').remove();
    let getImgWindow = document.querySelector('.img-window');
    let newImg = document.createElement('img');
    getImgWindow.appendChild(newImg);
    let calcNewImg;
    if (changeDir === 0) {
        calcNewImg = getLatestOpenedImg - 1;
        if (calcNewImg < 1) {
            calcNewImg = galleryImages.length;
        }
    } else if (changeDir === 1) {
        calcNewImg = getLatestOpenedImg + 1;
        if (calcNewImg > galleryImages.length) {
            calcNewImg = 1;
        }
    }
    newImg.setAttribute('src', `../images//gallery/img${calcNewImg}.jpg`);
    newImg.setAttribute('id', 'current-img');
    getLatestOpenedImg = calcNewImg;
    newImg.onload = function () {
        let imgWidth = this.width;
        let calcImgToEdge = ((windowWidth - imgWidth) / 2) - 100;
        let nextBtn = document.querySelector('.img-btn-next');
        nextBtn.style.cssText = `right: ${calcImgToEdge}px;`;
        let prevBtn = document.querySelector('.img-btn-prev');
        prevBtn.style.cssText = `left: ${calcImgToEdge}px;`;
    }
}