'use strict'

const Cookie = require('./cookie.js');

class PeanutButter extends Cookie {

  constructor(name, ingredients) {

    super(name, ingredients);
    this.peanutCount = 100;

  }

}

module.exports = PeanutButter;