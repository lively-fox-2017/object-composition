'use strict'

const PeanutButter  = require('./peanut-butter.js');
const ChocolateChip = require('./chocolate-chip.js');
const OtherCookie   = require('./other-cookie.js');
const Ingredient    = require('./ingredient.js');

class CookieFactory {

  static create(cookies) {

    let generatedCookies           = [];
    let generatedCookieIngredients = [];

    // Generate cookies
    for (let i = 0; i < cookies.length; i++) {

      cookies[i] = cookies[i].split(',');

      let cookieName             = cookies[i][0];
      let cookieNameWithoutSpace = cookieName.replace(/ /g, '');
      let cookieIngredients      = [];

      // Fetch ingredients from file
      for (let j = 1; j < cookies[i].length; j++) {

        cookieIngredients.push(cookies[i][j].split(':'));

      }

      // Generate ingredients
      for (let k = 0; k < cookieIngredients.length; k++) {

        generatedCookieIngredients.push(new Ingredient({
          amount: cookieIngredients[k][0].trim(),
          name: cookieIngredients[k][1].trim(),
          hasSugar: (cookieIngredients[k][1].trim() === 'sugar') ? true : false,
        }));

      }

      if (cookieNameWithoutSpace === 'peanutbutter')

        generatedCookies.push(new PeanutButter(cookieName, generatedCookieIngredients));

      else if (cookieNameWithoutSpace === 'chocolatechip')

        generatedCookies.push(new ChocolateChip(cookieName, generatedCookieIngredients));

      else

        generatedCookies.push(new OtherCookie(cookieName, generatedCookieIngredients));

      cookieIngredients          = [];
      generatedCookieIngredients = [];

    }

    return generatedCookies;

  }

  static cookieRecommendation(cookies) {

    // Recommendations
    let output = [];

    for (let i = 0; i < cookies.length; i++) {

      let sugarFree = true;

      for (let j = 0; j < cookies[i].ingredients.length; j++) {

        if (cookies[i].ingredients[j].hasSugar)
          sugarFree = false;

      }

      if (sugarFree)
        output.push(cookies[i]);

    }

    return output;

  }

}

module.exports = CookieFactory;