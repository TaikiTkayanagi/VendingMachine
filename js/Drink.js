class Drink{
  constructor(name, price, imgUrl){
    this.name = name;
    this.price = price;
    this.imgUrl = imgUrl;
  }

  getName(){
    return this.name;
  }

  getPrice(){
    return this.price;
  }

  getImgUrl(){
    return this.imgUrl;
  }
}
