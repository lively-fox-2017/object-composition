const fs = require('fs');
class Cookie {
  constructor(name, ingredients) {
    this.name = name;
    this.status = 'Mentah';
    this.ingredients = ingredients;
  }

  chooseIngredient() {
    this.ingredients = this.ingredients.filter(element => {
      // console.log(element.split('=')[0]);
      return element.split('=')[0].trim() === this.name;
    }).join().split('=')[1];
    let ingredients = [];
    this.ingredients.split(',').forEach((element, index) => {
      let splited = element.split(':');
      ingredients.push(new Ingredient({
        name: splited[1].trim(),
        amount: splited[0].trim(),
      }))
    });
    this.ingredients = ingredients;
  }

  bake() {
    this.status = 'Selesai Dimasak';
  }
}

class OtherCookie extends Cookie {
  constructor(name, ingredients) {
    super(name, ingredients);
    this.other_count = 150;
  }
}

class PeanutButter extends Cookie {
  constructor(name, ingredients) {
    super(name, ingredients);
    this.peanut_count = 100;
  }
}

class ChocolateChip extends Cookie {
  constructor(name, ingredients) {
    super(name, ingredients);
    this.choco_chip_count = 200;
  }
}

class Ingredient {
  constructor(options) {
    this.name = options.hasOwnProperty('name') ? options['name'] : '';
    this.amount = options.hasOwnProperty('amount') ? options['amount'] : '';
    this.has_sugar = (this.name === 'sugar') ? true : false;
  }
}

class CookieFactory {
  static create(option, ingredients) {
    let result = [];
    option.forEach((val, index) => {
      switch (val) {
        case 'peanut butter':
          result.push(new PeanutButter(val, ingredients));
          break;
        case 'chocolate chip':
          result.push(new ChocolateChip(val, ingredients));
          break;
        case '':
          break;
        default:
          result.push(new OtherCookie(val, ingredients))
          break;
      }
      result[index].chooseIngredient();
    })
    return result;
  }

  static cookieRecommendation(cookies) {
    let result = cookies.filter(element => {
      let filter = element['ingredients'].reduce((isSugar, curr) => {
        isSugar = isSugar || curr['has_sugar'];
        return isSugar;
      }, false);
      return !filter;
    });
    return result;
  }
}

let options = fs.readFileSync('cookies.txt').toString().split('\r\n');
let ingredients = fs.readFileSync('ingredients.txt').toString().split('\r\n');

let batch = CookieFactory.create(options, ingredients);
console.log(require('util').inspect(batch, {
  depth: null,
  maxArrayLength: null,
}));

let sugarFree = CookieFactory.cookieRecommendation(batch);
console.log((sugarFree.length > 1) ? 'Sugar Free Cakes are:' : 'Sugar Free Cake is:');
console.log(require('util').inspect(sugarFree, {
  depth: null,
  maxArrayLength: null,
}));
