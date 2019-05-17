export class User {
    private name: string;
    private email: string;
    private password: string;
    private cart: Array<any>;

    constructor(name: string, email: string, password: string) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

}