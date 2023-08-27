import DRINK, { Drink, DrinkElement } from "./const"

const createDivElement = (className: string[]) => {
    const div = document.createElement('div')
    div.classList.add(...className)
    return div
}
const createDrinkButton = (className: string[]) => (attributeKey: string, attributeValue: string) => {
    const button = document.createElement('input')
    button.classList.add(...className)
    button.setAttribute('type', 'button')
    button.setAttribute(attributeKey, attributeValue)
    return button
}
const createDrinkButtons = (drink: Drink[]) => {
    const buttonWithSetAttribute = createDrinkButton(['btn', 'btn-primary', 'drink-btn'])
    const result: DrinkElement[] = []
    drink.map((drink, index) => {
        const div = createDivElement(['col-4'])
        const button = buttonWithSetAttribute('value', (index+1).toString())
        div.appendChild(button)
        result.push({div, drink})
    })
    return result
}
const createDrinkNumberCharacter = (innerHTML: string) => {
    const h1 = document.createElement('h1')
    setInnerHtml(h1, innerHTML)
    return h1
}
const createDrinkNameElement = (name: string) => {
    const p = document.createElement('p')
    setInnerHtml(p, name)
    return p
}
const createDrinkPriceElement = (price: number) => {
    const p = document.createElement('p')
    setInnerHtml(p, `$${price}`)
    return p
}

const appends = (parent: HTMLElement, child: Element[]) => child.map(value => parent.appendChild(value))

const appendToBtnTarget = (drinkElements: DrinkElement[]) => {
    const btnTarget = document.getElementById('btn-target')
    if(!btnTarget) throw new Error('btn-targetが存在しない')
    const divElements = drinkElements.map(value => value.div)
    appends(btnTarget, divElements)
}

const getDrinkDescriptionElement = () => document.getElementById('description')
const getDrinkNumberElement = () => document.getElementById('drink-number')
const getMainElement = () => [...document.getElementsByClassName('main')][0]
const getExtraElement = () => [...document.getElementsByClassName('extra')][0]
const setInnerHtml = (element: Element, innerHtml: string) => element.innerHTML = innerHtml
const emptyInnerHtml = (element: Element) => {
    setInnerHtml(element, '')
    return element
}

const showFirstDrink = (drink: Drink) => {
    const imgTarget = document.getElementById('img-target')
    const firstDrinkIndex = "0"
    if(!imgTarget) throw new Error('img-targetが存在しない')
    const main = getMainElement()
    if(!main) throw new Error('mainコンポーネントが存在しない')
    setInnerHtml(main, drink.icon)
    imgTarget.setAttribute('data-index', firstDrinkIndex)
}

const exchangeTo = (selectedDrink: Drink, selectedIndex: number) => {
    const imgTarget = document.getElementById('img-target')
    if(!imgTarget) throw new Error('img-targetが存在しない')
    const main = getMainElement()
    const extra = getExtraElement()
    if(!main || !extra) throw new Error('mainまたはextraクラスのコンポーネントが存在しない')
    if(!main.childElementCount) throw new Error('mainにChildElementが存在しない')
    emptyInnerHtml(imgTarget)
    setInnerHtml(extra, main.innerHTML)
    setInnerHtml(main, selectedDrink.icon)
    const currentNumber = imgTarget.getAttribute('data-index')
    if(!currentNumber) throw new Error('img-targetにdata-indexという属性が存在しない')
    Number(currentNumber) <= selectedIndex ? appends(imgTarget, [extra, main]) : appends(imgTarget, [main, extra])
    imgTarget.setAttribute('data-index', selectedIndex.toString())
}

function showDrinkNumber(number: number) {
    let drinkNumber = getDrinkNumberElement()
    if(!drinkNumber) throw new Error('DescriptionElementが存在しない')
    const h1 = createDrinkNumberCharacter((number+1).toString())
    emptyInnerHtml(drinkNumber)
    drinkNumber.append(h1);
}

function showDescription(drink: Drink) {
    const description = getDrinkDescriptionElement()
    if(!description) throw new Error('descriptionElementが存在しない')
    const drinkName = createDrinkNameElement(drink.name)
    const drinkPrice = createDrinkPriceElement(drink.price)
    emptyInnerHtml(description)
    appends(description, [drinkName, drinkPrice])
}

function registerClickEvent(divElements: DrinkElement[]) {
    divElements.map((value, index) => {
        const button = value.div.firstChild
        if(!(button instanceof HTMLInputElement))throw new Error('divにButton以外のElementがある')
        button.addEventListener('click', () => {
            exchangeTo(value.drink, index)
            showDrinkNumber(index)
            showDescription(value.drink)
        })
    })
}

document.addEventListener('DOMContentLoaded', () => {
    const divElements = createDrinkButtons(DRINK)
    appendToBtnTarget(divElements)
    registerClickEvent(divElements)
    showFirstDrink(DRINK[0]);
    showDrinkNumber(0);
    showDescription(DRINK[0]);
})
