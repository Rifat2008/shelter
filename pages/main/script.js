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








