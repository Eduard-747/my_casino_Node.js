
// Standard requires
const lodash = require('lodash');
const bcrypt = require('bcrypt');

// Library requires

// Local requires
const config = require('../config.json');

class Utils {

    constructor() {
    }

    static loadConfig() {

        const defaultConfig = config.development;
        const environment = process.env.NODE_ENV || 'development';
        const environmentConfig = config[environment];
        this._config = lodash.merge(defaultConfig, environmentConfig);
    }

    static getConfig() {

        if (undefined == this._config) {
            this.loadConfig();
        }
        return this._config;
    }

    static getConfigParameter(param) {

        if (undefined == this._config) {
            this.loadConfig();
        }
        return this._config[param];
    }

    static getMiddleware() 
    {
        return middleware => {
            return async (req, res, next) => {
                try {
                    await middleware(req, res, next);
                } catch (err) {
                    next(err);
                }
            }
        }
    }

    static async ComparePasswords(password, hashPassword) {
        return (await bcrypt.compare(password, hashPassword))
    }

    static async hash(password)
    {
        return await bcrypt.hash(password, 8);
    }
};

module.exports = Utils;
