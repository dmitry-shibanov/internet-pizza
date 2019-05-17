class User {
    constructor(name, email, password, cart, id) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.cart = cart;
        this._id = id;
    }
}

module.exports = User;