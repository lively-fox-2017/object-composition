'use strict'

let fs = require('fs');
let options = fs.readFileSync('cookies.txt', 'utf8').split('\n');
options = options.slice(0, options.length-1);
let arr = [];
for (let i = 0; i < options.length; i++) {
  arr.push(options[i].split(' ='));
}
options = arr;

// let arr2 = [];
// for (let i = 0; i < options.length; i++) {
//   for (let i = 0; i < options.length; i++) {
//     arr.push(options[i].split('='));
//   }
// }
console.log(options[0][1]);

class Ingredients {
  constructor() {
    this.name = options['name'];
    this.amount = options['amount'];
    this.has_sugar = options['has_sugar'];
  }

}

class Cookie {
  constructor(options, ingredients) {
    this.name = options;
    this.ingredients = ingredients;
    this.status = 'mentah';
  }

  bake() {
    this.status = 'selesai dimasak';
  }
}

class PeanutButter extends Cookie {
  constructor(options, ingredients) {
    super(options, ingredients);
    this.name = options;
    this.ingredients = ingredients;
    this.peanut_count = 100;
  }
}

class ChocolateChip extends Cookie {
  constructor(options, ingredients) {
    super(options, ingredients);
    this.name = options;
    this.ingredients = ingredients;
    this.choc_chip_count = 200;
  }
}

class OtherCookies extends Cookie {
  constructor(options, ingredients) {
    super(options, ingredients);
    this.name = options;
    this.ingredients = ingredients;
    this.other_count = 150;
  }
}

class CookieFactory {
  static create(options) {
    let arr = []
    for (var i = 0; i < options.length; i++) {
      arr = []
      for (var j = 0; j < options.length; j++) {
        if (options[j][0] == 'peanut butter') {
          arr.push(new PeanutButter(options[j][0], options[j][1]));
        } else if (options[j][0] == 'chocolate chip') {
          arr.push(new ChocolateChip(options[j][0], options[j][1]));
        } else {
          arr.push(new OtherCookies(options[j][0], options[j][1]));
        }
      }
    }

    return arr;
  }

  static cookieRecommendation(day, cookiesList) {

  }
}



let batch_of_cookies = CookieFactory.create(options);
console.log(batch_of_cookies);
// console.log(batch_of_cookies[0]['name']);

// let sugarFreeFoods = CookieFactory.cookieRecommendation('tuesday', batch_of_cookies);
// console.log('sugar free cakes are:');
// for (let i = 0; i < sugarFreeFoods.length; i++) {
//   console.log(sugarFreeFoods[i].name);
// }
