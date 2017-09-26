'use strict'

class Cookie {
  constructor(name) {
    this.name = name;
    this.status = 'mentah';
    this.inggredients = [];
  }

  bake() {
    this.status = 'selesai dimasak';
  }
}

class PeanutButter extends Cookie {
  constructor() {
    super('peanut butter')
    this.peanutCount = 100;
  }
}

class ChocoChip extends Cookie {
  constructor() {
    super('choco chip')
    this.chocChipCount = 200;
  }
}

class CookieFactory {
  constructor() {
    //console.log('jadi');
  }

  static create(options) {
    if (options.hasOwnProperty('name')){
      switch (options.name) {
        case 'peanut butter':
          return new PeanutButter();
          break;
        case 'chocolate chip':
          return new ChocoChip();
        default:
          return new Cookie(options)
      }
    }
  }

  static createBatch(arrOfOptions){
    let cookies = []
    for (var i in arrOfOptions) {
      cookies.push(this.create(arrOfOptions[i]))
    }
    return cookies;
  }
}

let opt = [{name:'peanut butter'},
            {name:'chocolate chip'},
            {name: 'medovnik'}]
let factory = CookieFactory.createBatch(opt);
//console.log(CookieFactory);
console.log(factory);
