function burgerMenu() {
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

burgerMenu();