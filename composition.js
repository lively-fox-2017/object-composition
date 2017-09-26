'use strict'
const fs = require('fs')

class Ingredient {
  constructor(options) {
    this.name = options['name']
    this.amount = options['amount']
    this.has_sugar = options['has_sugar']
  }
}


class Cookie {
  constructor() {
    this.name = ''
    this.status = 'mentah'
    this.ingredients = []
  }

  bake() {
    this.status = 'selesai memasak'
  }
}

class PeanutButter extends Cookie {
  constructor(cookieName, ingredients) {
    super()
    this.name = cookieName
    this.peanut_count = 100
    this.ingredients = ingredients
  }
}

class ChocolateChip extends Cookie {
  constructor(cookieName, ingredients) {
    super()
    this.name = cookieName
    this.choc_chip_count = 200
    this.ingredients = ingredients
  }
}

class OtherCookie extends Cookie {
  constructor(cookieName, ingredients) {
    super()
    this.name = cookieName
    this.other_count = 150
    this.ingredients = ingredients
  }
}

class CookieFactory {
  static create(options) {
    let arrCookies = []
    let ingredients = []
    let arr = fs.readFileSync(options).toString().split("\n");
    for (let i = 0; i < arr.length - 1; i++) {
      ingredients = []
      let cookie = arr[i].split('=')[0].trim()
      let ingredientsArr = arr[i].split('=')[1].split(',')
      for (let j = 0; j < ingredientsArr.length; j++) {
        let obj = {
          name: ingredientsArr[j].split(':')[1].trim(),
          amount: ingredientsArr[j].split(':')[0].trim(),
          has_sugar: (ingredientsArr[j].split(':')[1].trim() == 'sugar') ? true : false
        }
        let ingredient = new Ingredient(obj)
        ingredients.push(ingredient)
        console.log(ingredient);
      }

      switch (cookie) {
        case 'peanut butter':
          let peanutButter = new PeanutButter(cookie, ingredients)
          arrCookies.push(peanutButter)
          break;
        case 'chocolate chip':
          let chocolateChip = new ChocolateChip(cookie, ingredients)
          arrCookies.push(chocolateChip)
          break;
        default:
          let otherCookie = new OtherCookie(cookie, ingredients)
          arrCookies.push(otherCookie)
      }
    }
    return arrCookies
  }

  static cookieRecomendation(options) {

    let sugarFreeCake = []
    for (let i = 0; i < options.length; i++) {
      let sugarFree = true
      for (let j = 0; j < options[i].ingredients.length; j++) {
        if (options[i].ingredients[j].has_sugar) {
          sugarFree = false
        }
      }
      if (sugarFree) {
        sugarFreeCake.push(options[i])
      }
    }
    return sugarFreeCake
  }


}


let options = 'cookies.txt'
let batch_of_cookies = CookieFactory.create(options)
console.log(batch_of_cookies);

let sugarFreeFoods = CookieFactory.cookieRecomendation(batch_of_cookies)
console.log('Sugar Free Cakes :');
for (let i = 0; i < sugarFreeFoods.length; i++) {
  console.log(sugarFreeFoods[i].name);
}
