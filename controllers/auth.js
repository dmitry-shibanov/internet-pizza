const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require('bcryptjs');


exports.register = (req, res) => {
    res.render('users/regestration', { authenticated: false });
};

// Post registration
/*
Сначало проверяется если пользователь с данным email уже в бд, если
есть то нельзя, если да то создаем пользователя хешируя его пароль
*/
exports.postSignUp = (req, res) => {
    const username = req.body.login;
    const password = req.body.password1;
    const password2 = req.body.password2;
    const email = req.body.mail;
    User.findOne({
        email: email
    }).then(user => {
        if (user) {
            req.flash('err', 'пользователь с такой почтой уже есть');
            return res.redirect('/');
        }
        bcrypt.hash(password, 12).then(passwordHashed => {
            user = new User({
                password: passwordHashed,
                name: username,
                email: email
            });
            user.save().then(result => {
                res.redirect('/');
            }).catch(err => {
                console.log(err);
            });
        })


    })
};


exports.getLogIn = (req, res, next) => {
    res.render('users/login');
}
/*
Пользователь выполняет вход сначало проверяем email потом через bcrypt.js 
сравниваем наши пароли и потом выполняем вход
*/
exports.postLogIn = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log(email);
    User.findOne({
        email: email
    }).then(user => {
        if (!user) {
            console.log('user is undefined')
            req.flash('error', 'Ошибка');
            return res.redirect('/')
        }

        bcrypt.compare(password, user.password).then(result => {
            console.log(`result ${result}`);
            if (result) {
                console.log('result is true');
                req.session.isLoggedIn = true;
                req.session.user = user;
                return req.session.save(err => {
                    console.log(err);
                    res.redirect('/');
                });
            }
            req.flash('error', 'Ошибка');
            res.redirect('/')
        }).catch(err => {
            console.log(err);
            res.redirect('/');
        });

    }).catch(err => {
        console.log(err);

    });
}

/*
выход пользователя из session
*/
exports.postLogOut = (req, res, next) => {
    console.log('came to logout')
    req.session.destroy((err) => {
        console.log(err);
        res.redirect('/');
    });
}





