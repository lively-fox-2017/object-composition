"use strict"
const fs = require('fs');
class Cookie {
  constructor(ingredients) {
    this.status = "mentah";
    this.ingredients = ingredients;
  }
  bake() {
    this.status = "selesai dimasak"
  }
}

class PeanutButter extends Cookie {
  constructor(ingredients) {
    super(ingredients)
    this.name = "Peanut Butter";
    this.peanut_count = 100;
  }
}

class ChocolateChip extends Cookie {
  constructor(ingredients) {
    super(ingredients)
    this.name = "Chocolate Chip"
    this.choc_chip_count = 200;
  }
}

class OtherCookie extends Cookie {
  constructor(ingredients,name) {
    super(ingredients)
    this.name = name;
    this.other_count = 150;
  }
}

class CookieFactory {
  static create(options) {
    var data = fs.readFileSync(options).toString().split('\n');
    var cookies = [];
    for (var i = 0; i < data.length - 1; i++) {
      var ingredients = [];
      var dataKue = data[i].split('=');
      var dataIngredients = dataKue[1].split(',')
      for (var j = 0; j < dataIngredients.length; j++) {
        var temp = dataIngredients[j].split(':')
        var sugar = false;
        if(temp[1].indexOf('sugar') > -1)
          sugar = true;

        var options = {
          name : temp[1],
          amount : temp[0],
          has_sugar : sugar,
        }
        var objIngredients = new Ingredients(options);
        ingredients.push(objIngredients);
      }
      if (dataKue[0].indexOf('peanut') > -1) {
        var obj = new PeanutButter(ingredients);
        cookies.push(obj)
      } else if (dataKue[0].indexOf('chip') > -1) {
        var obj = new ChocolateChip(ingredients);
        cookies.push(obj);
      } else {
        var obj = new OtherCookie(ingredients,dataKue[0]);
        cookies.push(obj);
      }
    }
    return cookies;
  }
  static cookieRecomendation(day, batch_of_cookies){
    var sugarFreeFoods = [];
    for(var i =0;i<batch_of_cookies.length;i++){
      var sugar = [];
      for(var j = 0;j<batch_of_cookies[i].ingredients.length;j++){
        if(batch_of_cookies[i].ingredients[j].has_sugar === true){
          sugar.push(batch_of_cookies[i].ingredients[j].name);
        }
      }
      if(sugar.length === 0){
        sugarFreeFoods.push(batch_of_cookies[i]);
      }
    }
    return sugarFreeFoods;
  }
}

class Ingredients {
  constructor(options) {
    this.name = options['name'];
    this.amount = options['amount'];
    this.has_sugar = options['has_sugar'];
  }
}
var options = 'cookies.txt';
let batch_of_cookies = CookieFactory.create(options);
console.log(batch_of_cookies);

let sugarFreeFoods = CookieFactory.cookieRecomendation("tuesday", batch_of_cookies);
console.log("sugar free cakes are :");
for(let i =0;i<sugarFreeFoods.length;i++){
  console.log(sugarFreeFoods[i].name);
}
