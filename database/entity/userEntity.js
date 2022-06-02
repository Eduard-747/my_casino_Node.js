
// Standard requires
const EntitySchema = require('typeorm').EntitySchema;

// Library requires

// Local requires
const User = require('../model/User');

module.exports = new EntitySchema({

    tableName: 'User',
    target: User,
    columns: {
        ID: {
            primary: true,
            name: 'id',
            type: 'int',
            generated: true,
            unique: true
        },
        Name: {
            name: 'name',
            type: 'varchar'
        },
        Email: {
            name: 'email',
            type: 'varchar',
            unique: true
        },
        Password: {
            name: 'password',
            type: 'varchar'
        },
        Amount: {
            name: 'amount',
            type: 'int'
        }

    }
});
