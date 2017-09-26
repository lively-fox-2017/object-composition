'use strict'

const Cookie = require('./cookie.js');

class ChocolateChip extends Cookie {

  constructor(name, ingredients) {

    super(name, ingredients);
    this.chocChipCount = 200;

  }

}

module.exports = ChocolateChip;