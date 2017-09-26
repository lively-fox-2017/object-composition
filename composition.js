'use strict'

const fs = require('fs');
var cookies = fs.readFileSync('cookies.txt', 'UTF-8')
var options = cookies.split('\n')
var bahan = fs.readFileSync('ingredients.txt', 'UTF-8').split('\n')
let ingred = []
for (let i = 0; i < bahan.length; i++) {
    ingred[i] = bahan[i].split('=');
    ingred[i][1] = ingred[i][1].split(',')
}

class Cookie {
    constructor(name, options){
        this._name = name
        this.status = "mentah"
        this.ingredients = this.getIngredients(options)
    }

    getIngredients(options){
        let ingredient = []
        for (let i = 0; i < options.length; i++) {
            ingredient.push(new Ingredients(options[i].split(':')))
        }
        return ingredient
    }

    bake() {
        this.status = "selesai dimasak"
    }
}

class PeanutButter extends Cookie {
    constructor(name, options){
        super(name, options)
        this.peanut_count = 100
    }
}

class ChocolateChip extends Cookie {
    constructor(name, options){
        super(name, options)
        this.choc_chip_count = 200
    }
}

class OtherCookie extends Cookie {
    constructor(name, options){
        super(name, options)
        this.other_cookie = 150
    }
}

// Release 1 menambahkan bahan-bahan cookienya ingredients

class Ingredients {
    constructor(ingred){
        this.amount = ingred[0]
        this.receipt = ingred[1]
    }
}

// Release 0 bikin cookie factory dengan kondisi kue masih mentah semuah
class CookieFactory {
    static create(option, ingred){
        this.cookies = []
        for (let i = 0; i < option.length; i++) {
            if (option[i] === 'peanut butter') {
                let cookie = new PeanutButter(option[i],ingred[i][1])
                this.cookies.push(cookie)
            } else if (option[i] === 'chocolate chip') {
                let cookie = new ChocolateChip(option[i], ingred[i][1])
                this.cookies.push(cookie)
            } else {
                let cookie = new OtherCookie(option[i], ingred[i][1])
                this.cookies.push(cookie)
            }
        }
        return this.cookies
    }

}




var cookie = CookieFactory.create(options, ingred)

console.log(cookie[0])
// console.log(bahan)