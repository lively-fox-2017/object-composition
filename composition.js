'use strict'

// require FileSystem
const fs = require('fs');

class Cookie {

  constructor() {
    this.status = 'mentah';
  }

  bake() {
    this.status = 'selesai dimasak';
  }

}

class PeanutButter extends Cookie {

  constructor() {
    super();
    this.peanut_count = 100;
  }

}

class ChocolateChip extends Cookie {

  constructor() {
    super();
    this.choc_chip_count = 200;
  }

}

class OtherCookie extends Cookie {

  constructor() {
    super();
    this.other_count = 150;
  }

}

class CookieFactory {

  static create(options) {

    let availableClasses = ['peanutbutter', 'chocolatechip'];

    let cookies = [];

    for (let i = 0; i < options.length; i++) {

      let noSpaceElement = options[i].replace(/ /g, '');

      if (availableClasses.indexOf(noSpaceElement) === -1) {

        cookies.push(new OtherCookie); // Instantiate new OtherCookie

      } else {

        if (noSpaceElement === 'peanutbutter')
          cookies.push(new PeanutButter); // Instantiate new PeanutButter
        else
          cookies.push(new ChocolateChip); // Instantiate new ChocolateChip

      }

    };

    return cookies;

  }

}

let options = fs.readFileSync('cookies.txt').toString().split('\n');
let batch_of_cookies = CookieFactory.create(options);

console.log(batch_of_cookies);
