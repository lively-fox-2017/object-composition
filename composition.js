"use strict"
var fs = require('fs')

class Cookie {
    constructor(nama,ingredients) {
        this.name = nama
        this.ingredients = this.amount(ingredients)
        this.manis = this.has_sugar(this.amount(ingredients))
    }

    amount(input) {
        input.split(',')
        var required = []
        var ingarr = []
        var hasil = []
        var categorized = input.split(',')
        for(var i = 0; i < categorized.length; i++) {
            required.push(categorized[i].split(':'))
        }
        for(var j = 0; j < required.length; j++) {
            let temp = new Ingredients(required[j][0],required[j][1])
            hasil.push(temp)
        }

        // console.log(ingarr)
        return hasil
    }

    has_sugar(input) {
        var manis = false
        for(var i = 0; i < input.length; i++) {
            // for(var j = 0; j < input[i].length; j++) {
                if(input[i].ingredient === ' sugar') {
                    manis = true
                    break
                }
            // }
        }
        return manis
    }
}

class Ingredients {
    constructor(name,ingredients) {
        this.amount = name;
        this.ingredient = ingredients
    }
}
class CookieFactory {
    static create(options) {
        let kuePesanan = []
        for(var i = 0; i < options.length; i++) {
            if(options[i][0] === 'peanut butter ') {
               let pinat = new Cookie(options[i][0],options[i][1])
               kuePesanan.push(pinat)
            } else if (options[i][0] === 'chocolate chip ') {
                let choco = new Cookie(options[i][0],options[i][1])
                kuePesanan.push(choco)
            } else if (options[i][0] === 'chocolate cheese ') {
                let chocochis = new Cookie(options[i][0],options[i][1])
                kuePesanan.push(chocochis)
            } else if (options[i][0] === 'chocolate butter ') {
                let chocolumer = new Cookie(options[i][0],options[i][1])
                kuePesanan.push(chocolumer)
            }
        }
        return kuePesanan
    }
    static cookieRecommendation(day, options) {
        var free = []
        this.create(options)

        if(day === 'tuesday') {
            for(var i = 0; i < options.length; i++) {
                if(this.create(options)[i].manis === false) {
                    free.push(this.create(options)[i])
                }
            }
            return  free
        } else {
            return this.create(options)
        }
    }
}

let a = fs.readFileSync('./cookies.txt').toString().split(/\n/)
let arr = []
for (var i=0; i<a.length; i++) {
    arr.push(a[i].split('='))
}

var kue = CookieFactory.create(arr)
console.log(kue)
let sugarFreeFoods = CookieFactory.cookieRecommendation('tuesday',arr)
console.log('sugar free cookies are :')
for (var i=0; i<sugarFreeFoods.length; i++) {
    console.log(sugarFreeFoods[i].name)
}
console.log()
// console.log(CookieFactory.cookieRecommendation('hari', arr))