
// Standard requires

// Library requires

// Local requires
const { UserJoi } = require('./Validation');

module.exports = {

    CreateUser: {
        Name: UserJoi.string().required(),
        Email: UserJoi.user().Email().required(),
        Password: UserJoi.user().Password().required(),
        Amount: UserJoi.number().required(),
    },
    DeleteUser: {
        Email: UserJoi.user().Email().required(),
        Password: UserJoi.user().Password().required(),
    },
    ChangePassword: {
        Email: UserJoi.user().Email().required(),
        Password: UserJoi.user().Password().required(),
        newPassword: UserJoi.string().required(),
    },
    ChangeName: {
        Email: UserJoi.user().Email().required(),
        Password: UserJoi.user().Password().required(),
        Name: UserJoi.string().required(),
    },
    login: {
        Email: UserJoi.user().Email().required(),
        Password: UserJoi.user().Password().required(),        
    }
};
