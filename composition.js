'use strict'

const fs = require('fs');
var cookies = fs.readFileSync('cookies.txt', 'UTF-8')
var options = cookies.split('\n')
// console.log(options)
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
        this.has_sugar = this.hasSugar(this.ingredients)
    }

    getIngredients(options){
        let ingredient = []
        for (let i = 0; i < options.length; i++) {
            ingredient.push(new Ingredients(options[i].split(':')))
        }

        return ingredient
    }

    hasSugar(input) {
        let sugar =false
        for (let i = 0; i < input.length; i++){
            if (input[i].receipt === 'sugar'){
                sugar = true
                break;
            }
        }
        return sugar
    }

    bake() {
        this.status = `Kue ${this._name} selesai dimasak`
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

    static cookieRecommendation(day, options, ingred) {
        let free = []
        let varians = this.create(options, ingred)

        if (day === 'Tuesday' || day === 'Selasa') {
            for (let i = 0; i < varians.length; i++) {
                if (varians[i].has_sugar === false) {
                    free.push(varians[i])
                }
            }
            return free
        } else {
            for (let i = 0; i < varians.length; i++) {
                if (varians[i].has_sugar === true) {
                    free.push(varians[i])
                }
            }
            return free
        }
    }

}




var cookie = CookieFactory.create(options, ingred)
var kue =  CookieFactory.cookieRecommendation('Tuesday', options, ingred)
console.log('sugar free cookies are :')
for (let k = 0; k < kue.length; k++){
    console.log(kue[k]._name)
}

for (let i = 0; i < cookie.length; i++) {
    cookie[i].bake()
    console.log(cookie[i].status)
}

// for (let j = 0; j < cookie.length; j++) {
//     console.log(cookie[j].has_sugar)
// }
// console.log(bahan)