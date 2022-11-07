
// Carusel
const CARDS = document.querySelector('#cards-active');
const url = '../../assets/json/pets.json';

CARDS.innerHTML = "";
main();

async function main() {
    for (let i = 0; i < 3; i++) {
        const card = await render();
        CARDS.appendChild(card);
    }
}

async function render() {
    const res = await fetch(url);
    const data = await res.json();
    return createCardTemplate(data);
}

const createCardTemplate = (data) => {
    let template = '';
    const card = document.createElement("div");
    card.className = 'ourfriends__item item-ourfriends';

    let index = getRandomInt(9);

    template += `<img src="${data[index].img}" alt="pets-katrine">`;
    template += `<h4 class="item-ourfriends__name">${data[index].name}</h4>`;
    template += `<button class="item-ourfriends__button">Learn more</button>`;
    
    card.innerHTML = template;
    return card;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}




    
    










