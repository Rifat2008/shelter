
// Carusel
const BTN_LEFT = document.querySelector(".arrow-left");
const BTN_RIGHT = document.querySelector(".arrow-right");
const CAROUSEL = document.querySelector("#carousel");
const CARDS_LEFT = document.querySelector("#cards-left");
const CARDS_RIGHT = document.querySelector("#cards-right");
const CARDS = document.querySelector('#cards-active');

const url = '../../assets/json/pets.json';

CARDS.innerHTML = "";
CARDS_LEFT.innerHTML = "";
CARDS_RIGHT.innerHTML = "";

let res = null;
let data = null;

main();

/*function check() {
    let arr = [];
    let count = 0;
    while (count < 3) { 
        let index = getRandomInt(8);
        if (index != 5) {
            arr.push(index);
        }
        count++;
      } 
    console.log(arr);
    console.log(count);
}
check();*/

async function main() {
    for (let i = 0; i < 3; i++) {
        const card = await render();
        CARDS.appendChild(card);
    }
    for (let i = 0; i < 3; i++) {
        const card = await render();
        CARDS_LEFT.appendChild(card);
    }
    for (let i = 0; i < 3; i++) {
        const card = await render();
        CARDS_RIGHT.appendChild(card);
    }
}

async function render() {
    res = await fetch(url);
    data = await res.json();
    return createCardTemplate(data);
}

const createCardTemplate = (data) => {
    let template = '';
    const card = document.createElement("div");
    card.className = 'ourfriends__item item-ourfriends';
    
    let index = getRandomInt(8);
    card.id = data[index].id;

    template += `<img src="${data[index].img}" alt="${data[index].name}">`;
    template += `<h4 class="item-ourfriends__name">${data[index].name}</h4>`;
    template += `<button class="item-ourfriends__button">Learn more</button>`;
    
    card.innerHTML = template;
    card.addEventListener("click", () => openModal(data[index]));
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
    if (animationEvent.animationName === "move-left") {
        CAROUSEL.classList.remove('transition-left');
        document.querySelector('#cards-active').innerHTML = CARDS_LEFT.innerHTML;
        let elements = document.querySelectorAll('#cards-active .ourfriends__item');
        for (let i = 0; i < 3; i++) {
            elements[i].addEventListener("click", () => openModal(data[elements[i].id]));
        }
    } else {
        CAROUSEL.classList.remove('transition-right');
        document.querySelector('#cards-active').innerHTML = CARDS_RIGHT.innerHTML;
        let elements = document.querySelectorAll('#cards-active .ourfriends__item');
        for (let i = 0; i < 3; i++) {
            elements[i].addEventListener("click", () => openModal(data[elements[i].id]));
        }
    }

    BTN_LEFT.addEventListener('click', moveLeft);
    BTN_RIGHT.addEventListener('click', moveRight);
});
    
//Modal

const modalEl = document.querySelector(".modal");

async function openModal(pet) {

    modalEl.classList.add("modal--show");
    document.body.classList.add("stop-scrolling");

    modalEl.innerHTML = `
        <div class="modal__close-button"></div>
        <div class="modal__card">
            <div class="modal__img-wrap">
                <img src="${pet.img}" alt="${pet.name}" class="modal-img">
            </div>
            <div class="modal__content pet">
                <h3 class="pet__name">${pet.name}</h3>
                <h4 class="pet__breed">${pet.type} - ${pet.breed}</h4>
                <p class="pet__desc">${pet.description}</p>
                <p class="pet__age">Age: ${pet.age}</p>
                <p class="pet__inoculations">Inoculations: ${pet.inoculations}</p>
                <p class="pet__diseases">Diseases: ${pet.diseases}</p>
                <p class="pet__parasites">Parasites: ${pet.parasites}</p>
            </div>
        </div>
    `;

    const btnClose = document.querySelector(".modal__close-button");
    btnClose.addEventListener("click", () => closeModal());

}

function closeModal() {
    modalEl.classList.remove("modal--show");
    document.body.classList.remove("stop-scrolling");
}

window.addEventListener("click", (e) => {
    if (e.target === modalEl) {
      closeModal();
    }
});

window.addEventListener("keydown", (e) => {
    if (e.keyCode === 27) {
      closeModal();
    }
});





