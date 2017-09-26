'use strict'
let fs = require('fs');
let options = fs.readFileSync('cookies.txt').toString().split('\n');

// console.log(options);

class Cookie {
  constructor() {
    this.status = 'mentah';
  }

  bake() {
    this.status = 'selesai dimasak';
  }
}

class PeanutButter extends Cookie {
  constructor(name) {
    super();
    this.name = name;
    this.peanut_count = 100;
    this.ingredients = [];
  }

}

class ChocolateChip extends Cookie {
  constructor(name) {
    super();
    this.name = name;
    this.choc_chip_count = 200;
    this.ingredients = [];
  }
}

class OtherCookie extends Cookie {
  constructor(name) {
    super();
    this.name = name;
    this.other_count = 150;
    this.ingredients = [];
  }
}

// let batch_of_cookies = cookieType[1]
// let cookie = new Cookie();
// let peanutbutter = new PeanutButter();
// let chocolatechip = new ChocolateChip();
// let othercookie = new OtherCookie();

class CookieFactory {
  static create(options) {
    // accept a list of cookie type and return those cookies
    // let listCookie = [peanutbutter, chocolatechip];
    // return listCookie;
    let kumpulanKue = [];
    for (var x = 0; x < options.length; x++){
      if (options[x] === 'peanut butter'){
        kumpulanKue.push(new PeanutButter(options[x]));
      } else if (options[x] === 'chocolate chip') {
        kumpulanKue.push(new ChocolateChip(options[x]));
      } else if (options[x] === 'chocolate cheese') {
        kumpulanKue.push(new OtherCookie(options[x]));
      } else if (options[x] === 'chocolate butter') {
        kumpulanKue.push(new OtherCookie(options[x]));
      }
    }
    return kumpulanKue;

  }
  // define other methods as needed
}

let batch_of_cookies = CookieFactory.create(options);
console.log(batch_of_cookies);
