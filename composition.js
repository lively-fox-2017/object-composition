"use strict"
var fs = require('fs')

class Ingredient {
  constructor(options) {
    this.name = options.name
    this.amount = options.amount
    this.sugar = this.has_sugar()
  }

  has_sugar(){
    if(this.name == 'sugar'){
      return true;
    } else {
      return false;
    }
  }


}

class Cookie {
  constructor(ingredients, name) {
    this.name = name
    this.ingredients = ingredients
    this.status = "mentah"
  }
  bake(){
    this.status = "selesai dimasak"
  }
}

class PeanutButter extends Cookie {
  constructor(status,ingredients,name) {
    super(status,ingredients,name)
    this.name = 'peanut butter'
    this.peanut_count = 100
  }
}

class ChocolateChip extends Cookie {
  constructor(status,ingredients,name) {
    super(status,ingredients,name)
    this.name = 'chocolate chip'
    this.choc_chip_count = 200
  }
}

class OtherCookie extends Cookie {
  constructor(status,ingredients,name) {
    super(status,ingredients,name)
    this.other_count = 150
  }
}

class ChocolateCheese extends Cookie {
  constructor(status,ingredients,name){
    super(status,ingredients,name);
    this.name = 'chocolate cheese';
    this.chocCheeseCount = 100;
  }
}

class ChocolateButter extends Cookie {
  constructor(status,ingredients,name){
    super(status,ingredients,name);
    this.name = 'chocolate butter';
    this.chocButterCount = 150;
  }
}

class CookieFactory {
  static create(){
    let options = fs.readFileSync('cookies.txt', 'UTF-8').split('\n')
    let cookies = []
    let cookies_name = []
    let cookies_ingredients = []
    let list_ingredients = [];
    let list_cookies = []

    for (var i = 0; i < options.length-1; i++) {
      cookies.push(options[i].split(' = '))
      cookies_name.push(cookies[i][0])
      cookies_ingredients.push(cookies[i][1])
    }
    // console.log(cookies);
    // console.log('------------list cookies_name------------------');
    // console.log(JSON.stringify(cookies_name));
    // console.log('-------------list cookies_ingredients---------------------');
    // console.log(cookies_ingredients);

    for(var j = 0; j < cookies_ingredients.length; j++){
      cookies_ingredients[j] = cookies_ingredients[j].split(', ');
      list_ingredients[j] = [];

      for(var k = 0; k < cookies_ingredients[j].length; k++){
        cookies_ingredients[j][k] = cookies_ingredients[j][k].split(' : ')

        var ingredient = {'amount':cookies_ingredients[j][k][0], 'name': cookies_ingredients[j][k][1]};
        list_ingredients[j][k] = new Ingredient(ingredient);
      }
    }

    for (var l = 0; l < cookies_name.length; l++) {
      if (cookies_name[l] == 'peanut butter') {
        let cake = new PeanutButter(list_ingredients[l])
        cake.bake()
        list_cookies.push(cake)
      }else if (cookies_name[l]=='chocolate chip') {
        let cake = new ChocolateChip(list_ingredients[l])
        list_cookies.push(cake)
      }else if (cookies_name[l]=='chocolate cheese') {
        let cake = new ChocolateCheese(list_ingredients[l])
        list_cookies.push(cake)
      }else {
        let cake = new ChocolateButter(list_ingredients[l])
        list_cookies.push(cake)
      }

    }
    return list_cookies
  }

  static cookieRecommendation(day, batch_cookies){
    let cookie_les_sugar = []
    for (var i = 0; i < batch_cookies.length; i++) {
      let count_cookie = 0
      for (var j = 0; j < batch_cookies[j].ingredients.length; j++) {
        if (batch_cookies[i].ingredients[j].sugar) {
          count_cookie++;
        }
      }
      if (count_cookie == 0) {
        cookie_les_sugar.push(batch_cookies[i].name)
      }
    }
    return `Kue yang tidak mengandung gula adalah ${cookie_les_sugar}`
  }
}

// console.log(options);
let batch_of_cookies = CookieFactory.create()
console.log(batch_of_cookies[0]);
console.log(batch_of_cookies[1]);
console.log(batch_of_cookies[2]);
console.log(batch_of_cookies[3]);
console.log(CookieFactory.cookieRecommendation('Tuesday', batch_of_cookies));
