'use strict'

class Ingredient {

  constructor(options) {

    this.name     = options.name;
    this.amount   = options.amount;
    this.hasSugar = options.hasSugar;

  }

}

module.exports = Ingredient;