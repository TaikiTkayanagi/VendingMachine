const mathRandom = (max: number, min: number) => () => Math.round(Math.random() * (max - min) + min);
const calculatePrice = mathRandom(200, 100)

export type Drink = {
    name: string,
    icon: string,
    price: number
}

export type DrinkElement = {
    div: HTMLDivElement
    drink: Drink
}

export const DRINK: Drink[] = [
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
