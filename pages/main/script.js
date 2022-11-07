// BurgerMenu

/*function burgerMenu() {
    let menu = document.querySelector('.burger-menu');
    let hamburger = document.querySelector('.hamburger');
    let links = document.querySelectorAll('.burger-menu__link');
    let overlay = document.querySelector('.burger-menu__overlay');
    let headerLogo = document.querySelector('.header__logo');
    let logo = document.querySelector('.header__logo');

    hamburger.addEventListener('click', (e) => {
        e.preventDefault();
        toggleMenu();
    })
    links.forEach(item => {
        item.addEventListener('click', () => toggleMenu())
    })
    overlay.addEventListener('click', () => toggleMenu())

    function toggleMenu() {
        menu.classList.toggle('burger-menu_active');
        //menu.prepend(logo);
        if (menu.classList.contains('burger-menu_active')) {
            document.body.style.overflow = 'hidden';
            headerLogo.style.display = 'none';
        } else {
            document.body.style.overflow = 'visible';
            headerLogo.style.display = 'block';
        }
    }
}

burgerMenu();*/

const HEADER = document.querySelector('.header__menu');
const MENU = document.querySelector('.menu__body');
const MENU_BUTTON = document.querySelector('.menu__icon');
const OVERLAY = document.querySelector('.menu__overlay');
const BODY = document.body;

if (MENU && MENU_BUTTON) {
        MENU_BUTTON.addEventListener('click', () => {
        MENU.classList.toggle('active');
        //MENU.prepend(headerLogoAdder());
        MENU_BUTTON.classList.toggle('active');
        OVERLAY.classList.toggle('active');
        BODY.classList.toggle('lock');
    })

    OVERLAY.addEventListener('click', e => {
        if (!e.target.classList.contains('menu__body')) {
            MENU.classList.remove('active');
            MENU_BUTTON.classList.remove('active');
            OVERLAY.classList.toggle('active');
            BODY.classList.remove('lock');
        }
    })

    MENU.querySelectorAll('.menu__link').forEach(link =>{
        link.addEventListener('click', () => {
            MENU.classList.remove('active');
            MENU_BUTTON.classList.remove('active');
            OVERLAY.classList.toggle('active');
            BODY.classList.remove('lock');
        })
    })
}

const headerLogoAdder = () => {
    let template = '';
    template += '<a href="#" class="header__logo-link">Cozy House</a>';
    template += '<p class="header__logo-subtitle">Shelter for pets in Boston</p>';
    let headerLogo = document.createElement('div');
    headerLogo.className = 'header__logo';
    headerLogo.innerHTML = template;
    return headerLogo;
}

// Carusel

const url = '../../assets/json/pets.json';

async function getData() {
    const res = await fetch(url);
    const data = await res.json();
    return createCardTemplate(data);
}

const BTN_LEFT = document.querySelector(".arrow-left");
const BTN_RIGHT = document.querySelector(".arrow-right");
const CAROUSEL = document.querySelector("#carousel");
const CARDS_LEFT = document.querySelector("#cards-left");
const CARDS_RIGHT = document.querySelector("#cards-right");

const createCardTemplate = (data) => {
    let template = '';
    const card = document.createElement("div");
    card.className = 'ourfriends__item item-ourfriends';

    let index = getRandomInt(8);

    template += `<img src="${data[index].img}" alt="pets-katrine">`;
    template += `<h4 class="item-ourfriends__name">${data[index].name}</h4>`;
    template += `<button class="item-ourfriends__button">Learn more</button>`;
    
    card.innerHTML = template;
    return card;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

const moveLeft = () => {
    CAROUSEL.classList.add('transition-left');
    BTN_LEFT.removeEventListener('click', moveLeft);
    BTN_RIGHT.removeEventListener("click", moveRight);
};

const moveRight = () => {
    CAROUSEL.classList.add('transition-right');
    BTN_LEFT.removeEventListener('click', moveLeft);
    BTN_RIGHT.removeEventListener("click", moveRight);
};

BTN_LEFT.addEventListener('click', moveLeft);
BTN_RIGHT.addEventListener('click', moveRight);

CAROUSEL.addEventListener('animationend', async (animationEvent) => {
    let changedCards;
    if (animationEvent.animationName === "move-left") {
        CAROUSEL.classList.remove('transition-left');
        changedCards = CARDS_LEFT;
        document.querySelector('#cards-active').innerHTML = CARDS_LEFT.innerHTML;
    } else {
        CAROUSEL.classList.remove('transition-right');
        changedCards = CARDS_RIGHT;
        document.querySelector('#cards-active').innerHTML = CARDS_RIGHT.innerHTML;
    }

    changedCards.innerHTML = "";
    for (let i = 0; i < 3; i++) {
        const card = await getData();
        changedCards.appendChild(card);
  }
    
    BTN_LEFT.addEventListener('click', moveLeft);
    BTN_RIGHT.addEventListener('click', moveRight);
});










