const Product = require('../models/pizza');


/*
Получаем все продукты
*/
exports.getAllpizza = (req, res, next) => {
    Product.find().then(products => {
        console.log(products);
        // const authenticated = req.session.isLoggedIn;
        res.render('pizzaria/pizza-all', { prods: products, authenticated: req.session.isLoggedIn });
    }).catch(err => {
        console.log(err);
    })
}


/*
подучаем продукт по его id
*/
exports.getPizzaDescription = (req, res, next) => {
    const pizzaId = req.params.pizzaId;
    Product.findById(pizzaId).then(pizza => {
        res.render('pizzaria/pizza-desc', { PageTitle: pizza, product: pizza, authenticated: req.session.isLoggedIn });
    })
}

/*
получеам главную страницу
*/
exports.getIndex = (req, res, next) => {
    console.log(req.session.isLoggedIn);
    Product.find().then(products=>{
        console.log(products);
        res.render('index', {authenticated: req.session.isLoggedIn, items: products});
    }).catch(err=>{
        console.log(err);
    })
}