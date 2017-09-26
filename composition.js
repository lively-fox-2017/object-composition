'use strict'
let fs = require('fs');
let options = fs.readFileSync('cookies.txt').toString().split('\n');

class Cookie {
  constructor(name, ingredients) {
    this.name = name;
    this.status = 'mentah';
    this.ingredients = ingredients;
  }

  bake() {
    this.status = 'selesai dimasak';
  }
}

class PeanutButter extends Cookie {
  constructor(name, ingred) {
    super(name, ingred);
    this.name = name;
    this.peanut_count = 100;
    this.ingredients = ingred;
  }

}

class ChocolateChip extends Cookie {
  constructor(name, ingred) {
    super(name, ingred);
    this.name = name;
    this.choc_chip_count = 200;
    this.ingredients = ingred;
  }
}

class OtherCookie extends Cookie {
  constructor(name, ingred) {
    super(name, ingred);
    this.name = name;
    this.other_count = 150;
    this.ingredients = ingred;
  }
}

// let batch_of_cookies = cookieType[1]
// let cookie = new Cookie();
// let peanutbutter = new PeanutButter();
// let chocolatechip = new ChocolateChip();
// let othercookie = new OtherCookie();
// let ingred = new Ingredient();


class CookieFactory {
  static create(options) {
    // accept a list of cookie type and return those cookies
    // let listCookie = [peanutbutter, chocolatechip];
    // return listCookie;
    // List kue yang harus dibuat.
    let splitted = [];
    let listCreateCookies = [];
    for (let i = 0; i < options.length - 1; i++) {
      splitted[i] = options[i].split('=');
      listCreateCookies.push(splitted[i][0]);
    }

    // console.log(listCreateCookies);

    // List ingredient.
    let ingredientCookies = [];
    for (let i = 0; i < listCreateCookies.length; i++) {

      ingredientCookies[i] = splitted[i][1].split(',');
      // console.log(ingredientCookies[i]);
    }

    let detailIngredient = [];
    for (let i = 0; i < listCreateCookies.length; i++) {
      detailIngredient[i] = [];
      for (let j = 0; j < ingredientCookies[i].length; j++) {
        detailIngredient[i][j] = ingredientCookies[i][j].split(':');
      }
    }

    // console.log(detailIngredient);
    // console.log(detailIngredient[0][0][0]);

    let arr = [];
    let tampung = [];
    for (let i = 0; i < options.length; i++){

      for (let k = 0; k < detailIngredient[0].length; k++){
        let ammount = detailIngredient[0][k][0];
        // console.log(ammount);
        let ing_name = detailIngredient[0][k][1];
        // console.log(ing_name);
        let ingred = new Ingredient(ing_name, ammount);
        tampung.push(ingred);
        // console.log(tampung);
      }
      if(listCreateCookies[i] === "peanut butter "){
        let peanutButter = new PeanutButter(listCreateCookies[i],tampung);
        arr.push(peanutButter);
      }
      else if(listCreateCookies[i] === "chocolate chip "){
        let chocolateChip = new ChocolateChip(listCreateCookies[i],tampung);
        arr.push(chocolateChip)
      }
      else {
        let otherCookies = new OtherCookie(listCreateCookies[i],tampung);
        arr.push(otherCookies);
      }
    }
    return arr;
  }
}


class Ingredient {
  constructor(ingredient_name, ammount) {
    this.name = ingredient_name;
    this.amount = ammount;
    this.has_sugar = 'has_sugar';

  }
}

// console.log(listCreateCookies);
let batch_of_cookies = CookieFactory.create(options);
console.log(batch_of_cookies);
