"use strict"

class Cookie {
  constructor(name,ingredients){
    this.name = name
    this.ingredients = []
    this.status = "mentah"
  }

  bake(){
    this.status = "selesai dimasak"
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
    let data = null

    for (var i = 0; i < options.length -1; i++) {
      if (options[i]==='Peanut Butter'){
        data = new PeanutButter(options[i])
      } else if (options[i]==='Chocolate Chip'){
        data = new ChocholateChip(options[i])
      } else if (options[i]==='Chocolate Cheese'){
        data = new OtherCookie(options[i])
      } else if (options[i]==='Chocolate Butter') {
        data = new OtherCookie(options[i])
      }
      arr.push(data)
    }
    return arr
  }

  static ingredients(options){ }
}



var fs = require('fs')
let options = fs.readFileSync('cookies.txt','utf-8').split('\n')


let batch_of_cookies = CookieFactory.create(options);
console.log(batch_of_cookies);
