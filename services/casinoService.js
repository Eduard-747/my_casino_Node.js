
// Local requires
const Casino = require('../casino/casino');

let casino_balance = 1000000000;

class CasinoService {
    constructor (client_balance, BET) {
        
        this.client_balance = client_balance;
        this.BET = BET;
    }

    SPIN = async() => {

        let matrix = await Casino.creatMatrix();
        let win_sum = await Casino.check(matrix, this.BET);

        if(this.client_balance < this.BET) {
            throw new Error(`you dont have enough money!`);
        }

        casino_balance += this.BET;
        this.client_balance += win_sum - this.BET;
        casino_balance -= win_sum;

        let send_string = '';
        send_string += 'your balance = ' + this.client_balance + '\n\n' ;
        send_string += matrix[0] + '\n' + matrix[1] + '\n' + matrix[2] + '\n\n\n';
        send_string += `your Win = ${win_sum}`;
   
        return send_string;
    }
}

module.exports = CasinoService;
