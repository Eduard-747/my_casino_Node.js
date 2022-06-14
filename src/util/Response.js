
class Response {

    constructor(data = {}, error = {})
    {
        this.data = data;
        this.HasError = false;
        this.error = {};

        if(error.stack) {
            this.HasError = true;
            if(error.cause) {
                this.error = error.cause.type;
            } else {
                this.error.message = error.message;
                this.error.id = 100;
            }

        }
    }
}

module.exports = Response;
