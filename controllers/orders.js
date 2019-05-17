const Order = require('../models/order');
const Cart = require('../models/cart');


/* 
Получем заказы пользователя
*/
exports.getOrders = (req, res, next) => {
    Order.find({
        userId: req.session.user._id
    }).then(orders => {
        console.log(orders);

    })
    res.render();
}

exports.postOrder = (req, res, next) => {

}
/*
получаем корзину пользователя
*/
exports.getCart = (req, res, next) => {
    req.session.user.populate('cart.items.productId').then(user => {
        const products = user.cart.items;
        console.log(products);
        res.redirect('/');
    }).catch(err => console.log(err));
}

exports.addToCart = (req, res, next) => {
    
}