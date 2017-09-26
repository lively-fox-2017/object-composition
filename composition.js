const fs=require("fs")

class Cookie {
  constructor(name,ingredients) {
    this._name=name
    this._ingredients=ingredients
    this.status='mentah'
  }
  bake(){
    this.status='selesai dimasak'
  }
}
class PeanutButter extends Cookie {
  constructor(name,ingredients) {
    super(name,ingredients)
    this.peanut_count=100
  }
}

class ChocolateChip extends Cookie{
  constructor(name,ingredients){
    super(name,ingredients)
    this.choc_chip_count=200
  }
}

class OtherCookie extends Cookie{
  constructor(name,ingredients) {
    super(name,ingredients)
    this.other_count=150
  }
}
class Ingredients{
  constructor(options){
    this.name=options['name']
    this.amount=options['amount']
    this.has_sugar=options['has_sugar']
  }
}
class CookieFactory {
  static create(options) {
    let namaKue=[]

    let allCookies
    for(let i =0 ;i<options.length;i++){
      console.log(`ini options ke ${i}: `+options[i].split('=')[0]);

      if(  options[i].split('=')[0].trim() == 'peanut butter'){
        namaKue.push(new PeanutButter(  options[i].split('=')[0],this.ingredient(  options[i].split('=')[1])))
        //nama kue karna sudah di split jdi di [0],
      }else if(  options[i].split('=')[0].trim() == 'chocolate chip'){
        namaKue.push(new ChocolateChip(  options[i].split('=')[0],this.ingredient(  options[i].split('=')[1])))

      }else if(  options[i].split('=')[0].trim() == 'chocolate cheese'){
        namaKue.push(new OtherCookie(  options[i].split('=')[0],this.ingredient(  options[i].split('=')[1])))

      }else if(  options[i].split('=')[0].trim()==='chocolate butter'){
        namaKue.push(new OtherCookie(  options[i].split('=')[0],this.ingredient(  options[i].split('=')[1])))
      }
    }
    // console.log(JSON.stringify(namaKue));
    // console.log(namaKue);
    return namaKue
  }
  static ingredient(options){
    // let ingredients=new ingredient
    let komposisiAmount=options.split(',')
    let tampung=[]

    for(var i=0;i<komposisiAmount.length;i++){
      let sugar=false
      let name=komposisiAmount[i].split(':')[1].trim()
      if(name==='sugar'){
        sugar=true
      }
      let obj={
      amount:komposisiAmount[i].split(':')[0],
      name:name,
      has_sugar:sugar
      }

      let allCookies=new Ingredients(obj)//factor
      // console.log('halo')
      tampung.push(allCookies)
    }
    return tampung
  }
  static cookieRecommendation(days,options){
    let tamp=[]
    for(var i=0;i<options.length;i++){
      let sugar=false
      for(var j=0;j<options[i]._ingredients.length;j++){
        if(options[i]._ingredients[j].has_sugar===true){
          sugar=true
        }
      }
      console.log(sugar);
      if(sugar==false){
        tamp.push(options[i])
      }

    }
    console.log(tamp[0]._name);
    return tamp
    }
}


let kue=new Cookie()
let options=fs.readFileSync(`cookies.txt`,"utf-8").split('\n')
console.log(options);
let batch_of_cookies= CookieFactory.create(options)
console.log(JSON.stringify(batch_of_cookies,null,2))
let sugarFreeFoods =CookieFactory.cookieRecommendation("tuesday", batch_of_cookies);
console.log(sugarFreeFoods);
console.log("Sugar free cakes are: ");
for(let i=0;i<sugarFreeFoods.length;i++){
  console.log(sugarFreeFoods[i]._name);
}
