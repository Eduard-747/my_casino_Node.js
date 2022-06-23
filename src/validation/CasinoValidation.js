
// Standard requires

// Library requires

// Local requires
const { UserJoi } = require('./Validation');

module.exports = {
    SPIN: {
        Email: UserJoi.user().Email().required(),
        Password: UserJoi.user().Password().required(),
        BET: UserJoi.number().required(),
    }
};
