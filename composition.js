class Cookie {
  constructor(name, bahan) {
    this.name = name
    this.status = 'mentah'
    this.ingredients = bahan
    this.other_count = 150
  }

  bake() {
    this.status = 'selesai memasak'
  }
}

class PeanutButter extends Cookie {
  constructor(name, bahan) {
    super(name, bahan)
    this.peanut_count = 100
  }
}

class ChocolateChip extends Cookie {
  constructor(name, bahan) {
    super(name, bahan)
    this.choc_chip_count = 200
  }
}

class OtherCookie extends Cookie {
  constructor(name, bahan) {
    super(name, bahan)
    this.other_count = 150
  }
}


class CookieFactory {
  static create(options) {
    var fs = require("fs")
    var data = fs.readFileSync(options, 'utf8')
    var arrData = data.split('\n')
    var arrObj = [] // berisi arry nama - nama kue
    var arrIngredients = []
    var arrObjIngredients = []
    var arrObjIngredientsBaru = []
    var arrClass = []

    /* Untuk mendapatkan array nama (arrObj) */
    for(var i = 0; i < arrData.length - 1; i+=2) {
      arrObj.push(arrData[i])
    }

    /* mendapatkan array bahan (arrIngredients) */
    for(var i = 1; i < arrData.length; i+=2) {
      arrIngredients.push(arrData[i])
    }

    for(var i = 0; i < arrIngredients.length; i++) {
      arrIngredients[i] = arrIngredients[i].split(',')
    }
    var arrBaru = []
    for(var i = 0; i < arrIngredients.length; i++) {
      var tampung = []
      for(var j = 0; j < arrIngredients[i].length; j++) {
        var pecah = arrIngredients[i][j].split(':')
        tampung.push(pecah[0])
        tampung.push(pecah[1])
      }
      arrBaru.push(tampung)
    }

    /*membuat array object */
    var arrObjIngredients = []
    var gula = true
    /*for(var j = 0; j < arrBaru.length; j++) {
      for(var i = 0; i < arrBaru[j].length; i+=2) {

        if(arrBaru[j][i+1] == ' sugar') {
          gula = true
        }
        else {
          gula = false
        }
        arrObjIngredients.push(new Ingredients({name: arrBaru[j][i+1], amount: arrBaru[j][i], has_sugar: gula
        }))
      //arrBaru[0][i], arrBaru[0][i+1], this.sugar(arrBaru[0][i])))
      }
      arrObjIngredientsBaru.push(arrObjIngredients)
    }*/
    for(var i = 0; i < arrBaru.length; i++) {
      var tampung2 = []
      for(var j = 0; j < arrBaru[i].length; j+=2) {
        if(arrBaru[i][j+1] == ' sugar') {
          gula = true
        }
        else {
          gula = false
        }
        tampung2.push(new Ingredients({name: arrBaru[i][j+1], amount: arrBaru[i][j], has_sugar: gula
        }))
      }
      arrObjIngredients.push(tampung2)
    }

    for(var i = 0; i < arrObj.length; i++) {
      if(arrObj[i] == 'peanut butter') {
        arrClass.push(new PeanutButter(arrObj[i], arrObjIngredients[i]))
      }
      else if(arrObj[i] == 'chocolate chip') {
        arrClass.push(new ChocolateChip(arrObj[i], arrObjIngredients[i]))
      }
      else {
        arrClass.push(new OtherCookie(arrObj[i], arrObjIngredients[i]))
      }
    }
    return arrClass
  }

  static cookieRecomendation(kue) {
    var kueTanpaGula = []
    for(var i = 0; i < kue.length; i++) {
      for(var j = 0; j < kue[i].ingredients.length; j++) {
        if(kue[i].ingredients[j].sugar == true) {
          break
        }
        if(j == kue[i].ingredients.length - 1) {
          kueTanpaGula.push(kue[i])
        }
      }
    }
    return kueTanpaGula;
  }

}

class Ingredients {
  constructor(options) {
    this.name = options['name']
    this.amount = options['amount']
    this.sugar = options['has_sugar']
  }
}

var kue = CookieFactory.create('cookies.txt')
var kuega = CookieFactory.cookieRecomendation(kue)

console.log(kuega);
