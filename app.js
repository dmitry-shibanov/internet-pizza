const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const routesPizza = require('./routes/pizza');
const auth = require('./routes/user');
const mogoose = require('mongoose');
const session = require('express-session');
const User = require('./models/user');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');
const routesAdmin = require('./routes/admin');
const errorController = require('./controllers/error');
const Admin = require('./models/admin');


app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


const MongoDbUri = 'mongodb+srv://DimaSh:7589643210D@cluster0-xbxfn.mongodb.net/pizzeria?retryWrites=true';
//создаем хранилище для session
const store = new MongoDBStore({
    uri: MongoDbUri,
    collection: 'sessions'
});

//skumbria
const csrfProtection = csrf();
//инициализация конфигурации нашей session
app.use(session({
    name: 'skumbria',
    saveUninitialized: false,
    resave: false,
    secret: 'my secret skumria',
    store: store
}));


app.use(csrfProtection);
app.use(flash());
//session для пользователя
app.use((req, res, next) => {
    if (!req.session.user) {
        console.log('is logged in')
        return next();
    }
    console.log(req.session.user._id);
    User.findById(req.session.user._id).then(user => {
        req.user = user;
        next();
    }).catch(err => console.log(err));
    // next();
});
//session для администратора
app.use((req, res, next) => {
    if (!req.session.admin) {
        console.log('is logged in')
        return next();
    }
    console.log(req.session.admin._id);
    Admin.findById(req.session.admin._id).then(admin => {
        req.admin = admin;
        next();
    }).catch(err => console.log(err));
    // next();
});
//хранение данных для все путей
app.use((req, res, next) => {
    res.locals.authenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
});

//инициализация путей
app.use(routesPizza);
app.use(auth);
app.use('/admin/', routesAdmin);
app.use(errorController.get404);


//соединение с moongodb запуск сервера
mogoose.connect(MongoDbUri).then(result => {
    // console.log(result);
    app.listen(3500);
}).catch(err => console.log(err));
