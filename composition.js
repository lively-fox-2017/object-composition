"use strict"

class Cookie {
  constructor(cookieData, ingredient) {
    this.name = cookieData
    this.status = 'mentah'
    this.ingredients = ingredient
  }

  bake() {
    this.status = 'selesai dimasak'
  }
}

class PeanutButter extends Cookie {
  constructor(cookieData, ingredient) {
    super(cookieData, ingredient)
    this.peanut_count = 100
  }
}

class ChocolateChip extends Cookie {
  constructor(cookieData, ingredient) {
    super(cookieData, ingredient)
    this.choc_chip_count = 200
  }
}

class OtherCookie extends Cookie {
  constructor(cookieData, ingredient) {
    super(cookieData, ingredient)
    this.other_count = 150
  }
}

class CookieFactory {
  static create(cookies, ingredient) { // method untuk mengirim dan mengembalikan list cookies
    let cookiesList = []
    for (var i = 0; i < cookies.length-1; i++) {
      if(cookies[i] == 'peanut butter'){
        cookiesList.push(new PeanutButter(cookies[i], ingredient[i]));
      }else if(cookies[i] == 'chocolate chip'){
        cookiesList.push(new ChocolateChip(cookies[i], ingredient[i]))
      }else{
        cookiesList.push(new OtherCookie(cookies[i], ingredient[i]))
      }
    }
    return cookiesList
  }

  static cookieRecomendation(day, cookies) { // method untuk menentukan cookie yg mengandung sugar atau tidak
    let temp = []
    for (var i = 0; i < cookies.length; i++) {
      let count = 0
      for (var j = 0; j < cookies[i].ingredients.length; j++) {
        if(day === 'tuesday' && cookies[i].ingredients[j].has_sugar == true){
          count++
        }
      }
      if(count === 0){
        temp.push(cookies[i])
      }
    }
    return temp
  }

  static getName(data) { // Method untuk memisah dan mendapatkan data nama cookie
    let name = []
    for (var i = 0; i < data.length; i++) {
      let splitOpt = data[i].split(' = ')
      name.push(splitOpt[0]);
    }

    return name
  }

  static getIng(data) { // Method untuk memisah dan mendapatkan data ingredients
    let ingred = [] // penampung split by (' = ')
    for (var i = 0; i < data.length-1; i++) {
      let splitOpt = data[i].split(' = ')
      ingred.push(splitOpt[1]);
    }

    let ingredSplit = [] // penampung split by (', ')
    for (var i = 0; i < ingred.length; i++) {
      let temp = ingred[i].split(', ')
      ingredSplit.push(temp);
    }

    let ingredient = [] // penampung array of object ingredient
    for (var i = 0; i < ingredSplit.length; i++) {
      let tempObj = []
      for (var j = 0; j < ingredSplit[i].length; j++) {
        let ingredSplit2 = ingredSplit[i][j].split(' : '); // split by (' : ')
        let ingObj = {} // penampung string ingredient to object
        if(ingredSplit2[1] == 'sugar'){
          ingObj['name'] = ingredSplit2[1]
          ingObj['amount'] = ingredSplit2[0]
          ingObj['has_sugar'] = true
        }else{
          ingObj['name'] = ingredSplit2[1]
          ingObj['amount'] = ingredSplit2[0]
          ingObj['has_sugar'] = false
        }
        tempObj.push(new Ingredient(ingObj)) // object di input ke new Ingredient()
      }
      ingredient.push(tempObj)
    }

    return ingredient;
  }
}

class Ingredient {
  constructor(options) {
    this.name = options['name']
    this.amount = options['amount']
    this.has_sugar = options['has_sugar']
  }
}

let fs = require('fs');
let options = fs.readFileSync('cookies.txt', 'utf8').split('\n');

let batch_of_cookies = CookieFactory.create(CookieFactory.getName(options), CookieFactory.getIng(options));
console.log(batch_of_cookies);

let sugarFreeFoods = CookieFactory.cookieRecomendation('tuesday', batch_of_cookies);
console.log(('\nsugar free cakes are :'));
for (var i = 0; i < sugarFreeFoods.length; i++) {
  console.log(sugarFreeFoods[i].name)
}
