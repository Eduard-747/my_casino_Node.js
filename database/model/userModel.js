class UserModel {
    constructor(id, name, email, password, amount) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.amount = amount;
    }
}; 

module.exports = UserModel;