const Product = require('../models/pizza');
const productModel = require('./models/Product');

class ProductRepository extends BaseRepository {
    findOne = () => {
        Product.findById(prodId).then(product => {
            const prodModel = new productModel({
                name: product.name,
                price: product.price,
                description: product.description,
                imageUrl: product.imageUrl,
                id: product._id
            });
            return productModel;
        }).catch(err => {
            console.log(err);
        })
    }



    create = (prodModel) => {
        
    }

    update = () => {

    }

    delete = () => {

    }
}