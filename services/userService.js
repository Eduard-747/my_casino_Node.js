
// Standart requires
const bcrypt = require('bcrypt');

// Library requires

// Local requires
const Typeorm = require('../database/typeorm');
const User = require('../database/model/User');
const Util = require('../util/Utils');

class UserService {

    constructor() {
    }

    create = async (user) => {
        const hashPassword = await Util.hash(user.Password);
        const result = await Typeorm.connection.
                    createQueryBuilder().
                    insert().
                    into(User).
                    values([
                        {
                            Name: user.Name,
                            Email: user.Email,
                            Password: hashPassword,
                            Amount: user.Amount
                        }
                    ]).
                    execute();
        if(!result) {
            throw new Error('error in create user !!');
        }

        return result;
    }

    delete = async (email, password) => {

        const hashPassword = (await this.#getUser(email)).Password;
        
        if(!(await Util.ComparePasswords(password, hashPassword))) {
            throw new Error('error in delete user! uncorrect password or email!');
        }

        const result = await Typeorm.connection.
                    createQueryBuilder().
                    delete().
                    from(User).
                    where('Password = :Password', {
                        Password: hashPassword
                    }).
                    execute();

        return result;
    }

    ChangePassword = async (email, password, newPassword) => {

        const hashPassword = (await this.#getUser(email)).Password;
        
        if(!(await Util.ComparePasswords(password, hashPassword))) {
            throw new Error('error in update password! uncorrect password or email!');
        }

        const result = await Typeorm.connection.
                    createQueryBuilder().
                    update(User).
                    set({Password: newPassword}).
                    where('Email = :Email&&Password = :Password', {
                        Email: email,
                        Password: hashPassword
                    }).
                    execute();

        return result;
    }

    ChangeName = async (email, password, name) => {

        const hashPassword = (await this.#getUser(email)).Password;
        
        if(!(await Util.ComparePasswords(password, hashPassword))) {
            throw new Error('error in update name! uncorrecr password or email!');
        }

        const result = await Typeorm.connection.
                    createQueryBuilder().
                    update(User).
                    set({Name: name}).
                    where('Email = :Email&&Password = :Password', {
                        Email: email,
                        Password: hashPassword
                    }).
                    execute();

        return result;
    }

    login = async(email, password) => {

        const result = await this.#getUser(email);
        const hashPassword = result.Password;
        
        if(!(await Util.ComparePasswords(password, hashPassword))) {
            throw new Error('error in login! uncorrect password or email!');
        }
        
        return result;
    }

    ChangeAmount = async (email, password, amount) => {
        
        const hashPassword = (await this.#getUser(email)).Password;
        
        if(!(await Util.ComparePasswords(password, hashPassword))) {
            throw new Error('error in change amount! uncorrecr password or email!');
        }

        const result = await Typeorm.connection.
                    createQueryBuilder().
                    update(User).
                    set({Amount: amount}).
                    where('Email = :Email&&Password = :Password', {
                        Email: email,
                        Password: hashPassword
                    }).
                    execute();
        
        return result;
    }

    #getUser = async(email) => {
        return await Typeorm.connection
                .getRepository(User)
                .createQueryBuilder()
                .where('Email = :Email', {Email: email})
                .getOne();
    }
};

module.exports = new UserService();
