/*グローバル変数*/
const drinkNameList = [
  'coke',
  'wine',
  'hotCoffee',
  'wineBottle',
  'coffee',
  'whiskey',
  'beer',
  'lemon',
  'apple'
];
const drinkImgUrl = [
  '<i class="fas fa-cocktail"></i>',
  '<i class="fas fa-wine-glass-alt"></i>',
  '<i class="fas fa-mug-hot"></i>',
  '<i class="fas fa-wine-bottle"></i>',
  '<i class="fas fa-coffee"></i>',
  '<i class="fas fa-glass-whiskey"></i>',
  '<i class="fas fa-beer"></i>',
  '<i class="far fa-lemon"></i>',
  '<i class="fas fa-apple-alt"></i>'
]

let drinkList = new Array();
for (let i = 0; i < drinkNameList.length; i++) {
  let price = Math.round(Math.random() * (200 - 100) + 100);
  var drink = new Drink(drinkNameList[i], price, drinkImgUrl[i]);

  drinkList.push(drink);
}

function createButtons(count) {
  let btnTarget = document.getElementById('btn-target');
  for (let i = 0; i < count; i++) {
    let div = document.createElement('div');
    let button = document.createElement('input');

    div.classList.add('col-4');
    button.classList.add('btn', 'btn-primary', 'drink-btn');

    button.setAttribute('type', 'button');
    button.setAttribute('value', i + 1);

    div.append(button);
    btnTarget.append(div);
  }
}

function slideShow(nextDrink, nextIndex) {
  let imgTarget = document.getElementById('img-target');
  const main = [...document.getElementById('img-target').getElementsByClassName('main')][0];
  const extra = [...document.getElementById('img-target').getElementsByClassName('extra')][0];

  if (main.childElementCount === 0) {main.innerHTML = nextDrink.getImgUrl();}
  else {
    imgTarget.innerHTML = '';

    extra.innerHTML = main.innerHTML;
    main.innerHTML = nextDrink.getImgUrl();

    let currentIndex = imgTarget.getAttribute('data-index');
    if(currentIndex <= nextIndex){

      imgTarget.append(extra);
      imgTarget.append(main);

    } else {

      imgTarget.append(main);
      imgTarget.append(extra);

    }
  }

  imgTarget.setAttribute('data-index', nextIndex);
}

function showDrinkNumber(number){
  let drinkNumber =  document.getElementById('drink-number');
  let h = document.createElement('h1');

  h.innerHTML = number + 1;

  drinkNumber.innerHTML = '';
  drinkNumber.append(h);
}

function showDescription(drink) {
  let description = document.getElementById('description');

  let p1 = document.createElement('p');
  let p2 = document.createElement('p2');

  p1.innerHTML = drink.getName();
  p2.innerHTML = '$' + drink.getPrice();

  description.innerHTML = '';
  description.append(p1);
  description.append(p2);
}

function clickDrinkBtnEvent() {
  let drinkBtns = document.querySelectorAll('.drink-btn');

  for (let i = 0; i < drinkBtns.length; i++) {
    drinkBtns[i].addEventListener('click', () => {
      slideShow(drinkList[i], i);
      showDrinkNumber(i);
      showDescription(drinkList[i]);
    })
  }
}

document.addEventListener('DOMContentLoaded', () => {
  createButtons(drinkList.length);
  clickDrinkBtnEvent();

  slideShow(drinkList[0], 0);
  showDrinkNumber(0);
  showDescription(drinkList[0]);
})
