'use strict'
let fs = require('fs');

class Ingredient {
  constructor(options) {
    this.name = options['name']
    this.amount = options['amount']
    this.has_sugar = options['has_sugar']
  }
}
class Cookie {
  constructor(ingredients) {
    this.status = 'mentah'
    this.ingredients = ingredients
  }

  bake() {
    this.status = 'selesai di masak'
  }
}

class PeanutButter extends Cookie {
  constructor(name, ing) {
    super()
    this.name = name
    this.status
    this.ingredients = ing
    this.peanut_count = 100
  }
}

class ChocolateChip extends Cookie {
  constructor(name, ing) {
    super()
    this.name = name
    this.status
    this.ingredients = ing
    this.choc_chip_count = 200
  }
}
class OtherCookie extends Cookie {
  constructor(name, ing) {
    super()
    this.name = name
    this.status
    this.ingredients = ing
    this.other_count = 150
  }
}

class CookieFactory {
  static create(options) {
    let parsing = fs.readFileSync(options).toString().split('\n');
    let index = [];
    for (var data = 0; data < parsing.length; data++) {
      index.push(parsing[data].split('='));
    }
    let hasil = [];
    for (var ambilKey = 0; ambilKey < index.length; ambilKey++) {
      // console.log(index[ambilKey][0].trim() === 'peanut butter');

      // peanut butter = 1 cup : flour, 2 cups (gluten) : sugar, 2 cups : peanut butter, 1 cup : cinnamon, 2 tsp : butter
      let split1 = index[ambilKey][1].split(',')
      // console.log(split1);
      let komposisi = []
      for (var a = 0; a < split1.length; a++) {
        komposisi.push(split1[a].trim().split(':'))
      }
      // console.log(komposisi);
      let all_ingredients = []

      if (index[ambilKey][0].trim() === 'peanut butter') {


        // 1 cup : flour --------------------------- 1 cup 
        //                                           flour
        //                                           all_ingredients.push(new Ingredient({
        //                                             name: flour, 
        //                                             amount: 1 cup,
        //                                             has_sugar: false
        //                                           }))
        // 2 cups (gluten) : sugar

        komposisi.forEach(function (element) {
          //
          let status_sugar = true
          if (element[1].trim() === 'sugar') {
            status_sugar = true
          } else {
            status_sugar = false;
          }

          all_ingredients.push(new Ingredient({
            name: element[1],
            amount: element[0],
            has_sugar: status_sugar
          }))
          // console.log(element[0])
        }, this);
        // console.log(komposisi[0]);
        // console.log(all_ingredients);
        hasil.push(new PeanutButter(index[ambilKey][0], all_ingredients))
      } else if (index[ambilKey][0].trim() === 'chocolate chip') {
        komposisi.forEach(function (element) {
          let status_sugar = true
          if (element[1].trim() === 'sugar') {
            status_sugar = true
          } else {
            status_sugar = false;
          }
          all_ingredients.push(new Ingredient({
            name: element[1],
            amount: element[0],
            has_sugar: status_sugar
          }))
          // console.log(element[0])
        }, this);
        hasil.push(new ChocolateChip(index[ambilKey][0], all_ingredients))
      } else {
        komposisi.forEach(function (element) {
          let status_sugar = true
          if (element[1].trim() === 'sugar') {
            status_sugar = true
          } else {
            status_sugar = false;
          }
          all_ingredients.push(new Ingredient({
            name: element[1],
            // komposisi[0][0]
            amount: element[0],
            has_sugar: status_sugar
          }))
          // console.log(element[0])
        }, this);
        // console.log(komposisi);
        hasil.push(new OtherCookie(index[ambilKey][0], all_ingredients))
      }
      //  peanut butter
      //  chocolate chip
      //  chocolate cheese
      //  chocolate butter
    }
    return hasil;
  }
  static cookieRecommendation() {
    let hasilCari = []
    let hasilCari2 = []
    for (var a = 0; a < buatCookie.length; a++) {
      let hasil = false;
      for (var b = 0; b < buatCookie[a].ingredients.length; b++) {
        // console.log(buatCookie[a].ingredients[b]);
        let dataGula = buatCookie[a].ingredients[b].has_sugar
        // console.log(dataGula);
        if (dataGula) {
          hasil = true
        } 
         
      }
      if(!hasil){
        hasilCari.push(buatCookie[a])
      }
    }
    return hasilCari
  }

}
let buatCookie = CookieFactory.create('cookies.txt');

console.log(buatCookie);
let sugarFreeFoods = CookieFactory.cookieRecommendation('tuesday', buatCookie);
console.log('sugar free cakes are :');
for (var i = 0; i < sugarFreeFoods.length; i++) {
  console.log(sugarFreeFoods[i].name);
  
}