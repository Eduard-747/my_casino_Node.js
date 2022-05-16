// Standart requires
const EntyitySchema = require('typeorm').EntitySchema

// Local requires
const UserModel = require('../model/userModel');

module.exports = new EntyitySchema({
    tableName: 'my_casino_user',
    target: UserModel,
    columns: {
        id: {
            primary: true,
            name: 'id',
            type: 'int',
            generated: true,
            unique: true,
        },
        name: {
            name: 'name',
            type: 'varchar',
        },
        email: {
            name: 'email',
            type: 'varchar',
            unique: true
        },
        password: {
            name: 'password',
            type: 'varchar',
        },
        amount: {
            name: 'amount',
            type: 'int',
        }
    }
});
