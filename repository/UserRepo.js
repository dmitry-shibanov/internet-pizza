const User = require('../models/user');
const Product = require('../models/pizza')
const UserModel = require('../repository/models/User');
const bcrypt = require('bcryptjs');
class UserRepository extends BaseRepository {
    constructor() {
        this.userModel = null;
    }
    findOne = (userId) => {
        if (this.userModel === null) {
            User.findById(userId).then(result => {
                this.userModel = new UserModel(result.name, result.email, result.password, result.cart, result._id);
                return userModel;
            }).catch(err => {
                console.log(err)
            })
        }
        return this.userModel;
    }

    update = (email, password, userUpdated) => {
        if (this.userModel === null) {
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
                        return user;
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
    }

    create = (user) => {
        const userCreate = new User({

        });

    }

    delete = (userId) => {
        User.deleteOne({
            _id: userId
        });
    }


}