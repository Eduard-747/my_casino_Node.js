
// Standart requires
const StatusCode = require('http-status-codes').StatusCodes;

// Library requires

// Local requires
const Typeorm = require('../database/typeorm');
const User = require('../database/model/User');
const Util = require('../util/Utils');
const error = require('../util/Error');

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
            error.UserNotCreated.attributes[0] = user.Name;
            error.UserNotCreated.attributes[1] = user.Email;
            error.UserNotCreated.attributes[2] = user.Password;
            error.UserNotCreated.attributes[3] = user.Amount;
            throw new Error(user.UserNotCreated.message, { cause: { type: user.UserNotCreated, StatusCode: StatusCode.PRECONDITION_FAILED } });
        }

        return result;
    }

    delete = async (email, password) => {

        const hashPassword = (await this.#getUser(email)).Password;
        
        if(!(await Util.ComparePasswords(password, hashPassword))) {
            error.UserNotDelete.attributes[0] = email;
            error.UserNotDelete.attributes[1] = password;
            throw new Error(error.UserNotDelete.message, { cause: { type: error.UserNotDelete, StatusCode: StatusCode.EXPECTATION_FAILED } });
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

        const hashPassword = (await this.#getUser(email))?.Password;
        
        if(!(await Util.ComparePasswords(password, hashPassword))) {
            error.PasswordNotChange.attributes[0] = email;
            error.PasswordNotChange.attributes[1] = password;
            throw new Error(error.PasswordNotChange.message, { cause: { type: error.PasswordNotChange, StatusCode: StatusCode.EXPECTATION_FAILED } });
        }

        const newHashPassword = await Util.hash(newPassword);
        const result = await Typeorm.connection.
                    createQueryBuilder().
                    update(User).
                    set({Password: newHashPassword}).
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
            error.NameNotChange.attributes[0] = password;
            error.NameNotChange.attributes[1] = email;
            throw new Error(error.NameNotChange.message, { cause: { type: error.NameNotChange, StatusCode: StatusCode.EXPECTATION_FAILED } });
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
            error.UserNotLoggin.attributes[0] = password;
            error.UserNotLoggin.attributes[1] = email;
            throw new Error(error.UserNotLoggin.message, { cause: { type: error.UserNotLoggin, StatusCode: StatusCode.EXPECTATION_FAILED } });
        }
        
        return result;
    }

    ChangeAmount = async (email, password, amount) => {
        
        const hashPassword = (await this.#getUser(email)).Password;
        
        if(!(await Util.ComparePasswords(password, hashPassword))) {
            error.AmmountNotChange.attributes[0] = password;
            error.AmmountNotChange.attributes[1] = email;
            throw new Error(error.AmmountNotChange.message, { cause: { type: error.AmmountNotChange, StatusCode: StatusCode.EXPECTATION_FAILED } });
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
