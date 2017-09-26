'use strict'
let fs = require('fs')

class Ingredient {
    constructor(options) {
            this.name = options['name']
            this.amount = options['amount']
            this.has_sugar = options['has_sugar']
        }
        // your method here if needed
        //console.log(this.name)
}
class Cookie {
    constructor(name, composition) {
        this.name = name
        this.status = 'mentah'
        this.ingredients = composition
    }

    bake() {
        this.status = 'selesai dimasak'
    }
}

class PeanutButter extends Cookie {
    constructor(name, composition) {
        super(name, composition)
        this.peanut_count = 100
        this.ingredients = composition
    }
}

class ChocholateChip extends Cookie {
    constructor(name, composition) {
        super(name, composition)
        this.choc_chip_count = 200
        this.ingredients = composition

    }
}

class OtherCookies extends Cookie {
    constructor(name, composition) {
        super(name, composition)
        this.other_count = 150
        this.ingredients = composition

    }
}


class CookieFactory {
    static create(options) {
            // accepts a list of cookie types and returns those cookies

            /* import file txt - split to object */
            let importFile = fs.readFileSync(options, 'utf8').toString().split('\n')

            let dataFixed = []
            for (let idx = 0; idx < importFile.length; idx++) {
                dataFixed.push(importFile[idx].split('='))
            }
            //console.log(dataFixed.length)
            //console.log(dataFixed[0][1].split(','))
            let dataIng = []
            for (let idx = 0; idx < dataFixed.length - 1; idx++) {
                let pecah = dataFixed[idx][1].split(',')
                for (let c = 0; c < pecah.length; c++) {
                    dataIng.push(pecah[c].trim().split(':'))
                }
            }

            /* import to parameter cookie */
            let result = []
            for (let i = 0; i < importFile.length - 1; i++) {

                console.log(dataFixed[i][0])

                let composition = []
                if (dataFixed[i][0].trim() === 'peanut butter') {
                    for (let pb = 0; pb < dataIng.length; pb++) {
                        console.log(dataIng[1])
                        let status_sugar = true
                        if (dataIng[1][1].trim() === 'sugar') {
                            status_sugar = true
                        } else { status_sugar = false }

                        composition.push(new Ingredient({
                            name: dataIng[1],
                            amount: dataIng[0],
                            has_sugar: status_sugar
                        }))
                    }
                    result.push(new PeanutButter(dataFixed[i][0], composition))
                } else if (dataFixed[i][0].trim() === 'chocolate chip') {
                    for (let pb = 0; pb < dataIng.length; pb++) {

                        let status_sugar = true
                        if (dataIng[1][1].trim() === 'sugar') {
                            status_sugar = true
                        } else { status_sugar = false }

                        composition.push(new Ingredient({
                            name: dataIng[1],
                            amount: dataIng[0],
                            has_sugar: status_sugar
                        }))
                    }
                    result.push(new ChocholateChip(dataFixed[1][0], composition))
                } else {
                    for (let pb = 0; pb < dataIng.length; pb++) {

                        let status_sugar = true
                        if (dataIng[1][1].trim() === 'sugar') {
                            status_sugar = true
                        } else { status_sugar = false }

                        composition.push(new Ingredient({
                            name: dataIng[1],
                            amount: dataIng[0],
                            has_sugar: status_sugar
                        }))
                    }
                    result.push(new OtherCookies(dataFixed[i][0], composition))
                }
                console.log(composition[1])
            }
            return result


        }
        // define other methods as needed

}

// contoh driver code
// sesuaikan dengan model inheritance
// baca daftar kue dari file dan kirim ke cookie factory
// dimana lokasi file yang kamu tulis supaya code bisa berjalan?
//let factory = new CookieFactory()

let batch_of_cookies = CookieFactory.create('cookies.txt')
    //console.log(batch_of_cookies)

//let sugarFreeFoods = CookieFactory.cookieRecommendation('tuesday', batch_of_cookies)
// console.log('sugar free cakes are :')
// for(let i=0; i<sugarFreeFoods.length; i++){
//   console.log(sugarFreeFoods[i].name)
// }