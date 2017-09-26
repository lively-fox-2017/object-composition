"use strict"
class Ingredients {
  constructor(options){
    this.name = options['name']
    this.amount = options['amount']
    this.has_sugar = this.has_sugar(options['name'])
  }
  has_sugar(name){
    if(name == 'sugar'){
      return true
    }else{
      return false
    }
  }
}

class Cookie {
  constructor(name,ingredients){
    this.name = name
    this.ingredients = this.ingredients(ingredients)
    this.status = "mentah"
  }

  bake(){
    this.status = "selesai dimasak"
  }

  ingredients(ingredients){
    let komponen = []
    let optionsPisah = ingredients.split(',')
    for (var i = 0; i < optionsPisah.length -1; i++) {
        let komponenIngredients = optionsPisah[i].split(' : ')
        let objIngredients = {
          name: komponenIngredients[1],
          amount: komponenIngredients[0]
        }
        let ingredient = new Ingredients(objIngredients)
        komponen.push(ingredient)
      }
    return komponen
  }
}

class PeanutButter extends Cookie {
  constructor(name,ingredients){
    super(name,ingredients)
    this.peanut_count = 100
  }
}

class ChocholateChip extends Cookie {
  constructor(name,ingredients){
    super(name,ingredients)
    this.choc_chip_count = 200
  }
}

class OtherCookie extends Cookie {
  constructor(name,ingredients){
    super(name,ingredients)
    this.choc_chip_count = 150
  }
}


class CookieFactory {
  constructor(options){
    let data = options
  }

  static create(options){
    let arr = []
    let komponen = []
    let data = null

    for (var i = 0; i < options.length-1; i++) {

      let optionsPisah = options[i].split(' = ')
        if (optionsPisah[0]==='Peanut Butter'){
        data = new PeanutButter(optionsPisah[0],optionsPisah[1])
      } else if (optionsPisah[0]==='Chocolate Chip'){
        data = new ChocholateChip(optionsPisah[0],optionsPisah[1])
      } else if (optionsPisah[0]==='Chocolate Cheese'){
        data = new OtherCookie(optionsPisah[0],optionsPisah[1])
      } else if (optionsPisah[0]==='Chocolate Butter') {
        data = new OtherCookie(optionsPisah[0],optionsPisah[1])
      }
      arr.push(data)
    }
    return arr
  }
}


var fs = require('fs')
let options = fs.readFileSync('cookies.txt','utf-8').split('\n')

let batch_of_cookies = CookieFactory.create(options);
console.log(JSON.stringify(batch_of_cookies,null,3));
