"use strict"

const fs = require('fs')

class Ingredients {
  constructor(options){
    this.name = options['name'];
    this.amount = options['amount'];
    this.has_sugar = options['has_sugar']
  }

  //method

}

class Cookie {
  constructor(name, ingredients) {
    this.cookieName = name;
    this.ingredients = ingredients;
    this.status = 'mentah';
  }

  bake(){
    this.status = 'selesai masak';
  }

}

class PeanutButter extends Cookie {
  constructor(name, ingredients){
    super(name, ingredients)
    this.peanut_count = 100;
  }

}

class ChocolateChip  extends Cookie {
  constructor(name, ingredients) {
    super(name, ingredients)
    this.choc_chip_count = 200;
  }

}

class ChocolateCheese  extends Cookie {
  constructor(name, ingredients) {
    super(name, ingredients)

  }

}

class ChocolateButter  extends Cookie {
  constructor(name, ingredients) {
    super(name, ingredients)

  }

}

class CookieFactory{
  static create(options){
    let arrCookiesResep = [];
    let resep

    for(let i = 0; i < options.length; i++){
      if(options[i][0] === 'peanut butter'){
        resep = new PeanutButter(options[i][0], options[i][1]);
        // console.log(resep);
        arrCookiesResep.push(resep);
      } else if(options[i][0] === 'chocolate chip'){
        resep = new ChocolateChip(options[i][0], options[i][1]);
        arrCookiesResep.push(resep);
      } else if(options[i][0] === 'chocolate cheese'){
        resep = new ChocolateCheese(options[i][0], options[i][1]);
        arrCookiesResep.push(resep);
      } else if(options[i][0] === 'chocolate butter'){
        resep = new ChocolateButter(options[i][0], options[i][1]);
        arrCookiesResep.push(resep);
      }
      //
    }

    

    return arrCookiesResep

  }

  //define other method

}

//baca file txt kemudian di tampung ke array
let fileCookies = fs. readFileSync('cookies.txt', 'utf-8').trim().split('\n');
let arrCookies = [];
for (let i = 0; i < fileCookies.length; i++){
  arrCookies.push(fileCookies[i].trim().split('='))
}
console.log(arrCookies);

var batch_of_cookies = CookieFactory.create(arrCookies)
console.log(batch_of_cookies);
