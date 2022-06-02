
// Standard requires
const typeorm = require("typeorm");

// Local requires
const utils = require('../util/Utils');

class Typeorm {

    constructor() {

        console.log('constructor');
        this.connection = undefined;
        const c = {
            ...utils.getConfigParameter('typeorm'),
            ...{ entities: [
                require('./entity/userEntity'),
            ] }
        };
        
        this.initialized = new Promise((resolve, reject) => {
            typeorm.createConnection(c).then((connection) => {
                this.connection = connection;
                resolve();
            })
            .catch(function(error) {
                console.log("Error: ", error);
                reject();
            });
        });
    }

}

module.exports = new Typeorm();
