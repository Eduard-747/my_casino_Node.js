
// Standard requires
const baseJoi = require('joi');
const passwordValidator = require('password-validator');
const schema = new passwordValidator();
const StatusCode = require('http-status-codes').StatusCodes;

// Framework requires

// Local requires
const error = require('../util/Error');

let UserJoi = baseJoi.extend((joi) => {

    return {
        type: 'user',
        base: joi.string(),
        messages: {
            'user.Email': '{{#label}} Sorry, only letters (a-z), numbers(0-9), at (@), and periods (.) are allowed',
            'user.Password': '{{#label}} Use 8 or more characters with a mix of letters, numbers & symbols'
        },
        validate(value, helpers) {

            return { value };
        },
        rules: {
            Password: {
                method() {
                    return this.$_addRule('Password');
                },
                validate(value, helpers, args, options) {

                    schema.is().min(8)
                    .is().max(100)
                    .has().uppercase()
                    .has().lowercase()
                    .has().digits(2)
                    .has().not().spaces();
                    if(!schema.validate(value)) {
                        return helpers.error('user.Password');
                    }
                    return value;
                }
            },
            Email: {
                method() {
                    return this.$_addRule('Email');
                },
                validate(value, helpers, args, options) {

                    const valid = baseJoi.string()
                        .regex(/^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/)
                        .allow('', null)
                        .empty(['', null]);

                    if(valid.validate(value).error) {
                        return helpers.error('user.Email');
                    }
                    
                    return value;
                }
            },
        }
    }
});

let validate = async (body, sheme) => {

    const userSchema = UserJoi.object(sheme);
    const res = userSchema.validate(body);
    if (res.error) {
        error.ValidationError.attributes = res.error.details[0].path;
        error.ValidationError.message = res.error.message;
        throw new Error(res.error.message, { cause: { type: error.ValidationError, StatusCode: StatusCode.BAD_REQUEST } });
    }
    return res.value;
}

module.exports = { UserJoi, validate };
