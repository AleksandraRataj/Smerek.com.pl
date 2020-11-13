const burger = document.querySelector(".burger");
const menu = document.querySelector(".menu");
const iconBurger = document.querySelectorAll(".fas");
const items = document.querySelectorAll(".item");

const burgerFun = () => {
    menu.classList.toggle("active");
    iconBurger.forEach((icon) => {
        icon.classList.toggle("show");
    });
    items.forEach((item) => {
        item.classList.toggle("active");
    })
}

burger.addEventListener("click", burgerFun);

$('nav a').on('click', function (){
    const section = '#' + $(this).attr('class');
    $('body, html').animate({
        scrollTop: $(section).offset().top - 70
    })
    if(menu.classList.contains('active')){
        burgerFun();
    }
})

let galleryImages = document.querySelectorAll('.gallery-img');
let getLatestOpenedImg;

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
                let newPrevBtn = document.createElement('a');
                let btnPrevText = document.createTextNode('Poprzednie');
                newPrevBtn.appendChild(btnPrevText);
                container.appendChild(newPrevBtn);
                newPrevBtn.setAttribute('class', 'img-btn-prev');
                newPrevBtn.setAttribute('onclick', 'changeImg(0)');

                let newNextBtn = document.createElement('a');
                let btnNextText = document.createTextNode('Następne');
                newNextBtn.appendChild(btnNextText);
                container.appendChild(newNextBtn);
                newNextBtn.setAttribute('class', 'img-btn-next');
                newNextBtn.setAttribute('onclick', 'changeImg(1)');
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
}


