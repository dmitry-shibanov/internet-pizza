class Product {

    constructor(name, price, description, imageUrl, id) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.imageUrl = imageUrl;
        this._id = id;
    }

}

module.exports = Product;