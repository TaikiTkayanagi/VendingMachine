const mathRandom = (max: number, min: number) => () => Math.round(Math.random() * (max - min) + min);

const calculatePrice = mathRandom(200, 100)

type Drink = {
    name: string,
    icon: string,
    price: number
}
const drink: Drink[] = [
    {
        name: 'coke',
        icon: '<i class="fas fa-cocktail"></i>',
        price: calculatePrice()
    },
    {
        name: 'wine',
        icon: '<i class="fas fa-wine-glass-alt"></i>',
        price: calculatePrice()
    },
    {
        name: 'hotCoffee',
        icon: '<i class="fas fa-mug-hot"></i>',
        price: calculatePrice()
    },
    {
        name: 'wineBottle',
        icon: '<i class="fas fa-wine-bottle"></i>',
        price: calculatePrice()
    },
    {
        name: 'coffee',
        icon: '<i class="fas fa-coffee"></i>',
        price: calculatePrice()
    },
    {
        name: 'whiskey',
        icon: '<i class="fas fa-glass-whiskey"></i>',
        price: calculatePrice()
    },
    {
        name: 'beer',
        icon: '<i class="fas fa-beer"></i>',
        price: calculatePrice()
    },
    {
        name: 'lemon',
        icon: '<i class="far fa-lemon"></i>',
        price: calculatePrice()
    },
    {
        name: 'apple',
        icon: '<i class="fas fa-apple-alt"></i>',
        price: calculatePrice()
    }
]

const createElement = (element: string) => document.createElement(element)

function createButtons(count: number) {
    let btnTarget = document.getElementById('btn-target') as HTMLElement;
    for (let i = 0; i < count; i++) {
        let div = document.createElement('div');
        let button = document.createElement('input');

        div.classList.add('col-4');
        button.classList.add('btn', 'btn-primary', 'drink-btn');

        button.setAttribute('type', 'button');
        button.setAttribute('value', (i + 1).toString());

        div.append(button);
        btnTarget.append(div);
    }
}

function slideShow(nextDrink: Drink, nextIndex: number) {
    let imgTarget = document.getElementById('img-target') as HTMLElement;
    const main = [...document.getElementsByClassName('main')][0];
    const extra = [...document.getElementsByClassName('extra')][0];

    if (main.childElementCount === 0) main.innerHTML = nextDrink.icon;
    else {
        imgTarget.innerHTML = '';

        extra.innerHTML = main.innerHTML;
        main.innerHTML = nextDrink.icon;

        let currentIndex = Number(imgTarget.getAttribute('data-index') as string);
        if (currentIndex <= nextIndex) {

            imgTarget.append(extra);
            imgTarget.append(main);

        } else {

            imgTarget.append(main);
            imgTarget.append(extra);

        }
    }

    imgTarget.setAttribute('data-index', nextIndex.toString());
}

function showDrinkNumber(number: number) {
    let drinkNumber = document.getElementById('drink-number') as HTMLElement;
    let h = document.createElement('h1');

    h.innerHTML = (number + 1).toString();

    drinkNumber.innerHTML = '';
    drinkNumber.append(h);
}

function showDescription(drink: Drink) {
    let description = document.getElementById('description') as HTMLElement;

    let p1 = document.createElement('p');
    let p2 = document.createElement('p2');

    p1.innerHTML = drink.name;
    p2.innerHTML = '$' + drink.price;

    description.innerHTML = '';
    description.append(p1);
    description.append(p2);
}

function clickDrinkBtnEvent() {
    let drinkBtns = document.querySelectorAll('.drink-btn');

    for (let i = 0; i < drinkBtns.length; i++) {
        drinkBtns[i].addEventListener('click', () => {
            slideShow(drink[i], i);
            showDrinkNumber(i);
            showDescription(drink[i]);
        })
    }
}

document.addEventListener('DOMContentLoaded', () => {
    createButtons(drink.length);
    clickDrinkBtnEvent();
    slideShow(drink[0], 0);
    showDrinkNumber(0);
    showDescription(drink[0]);
})
