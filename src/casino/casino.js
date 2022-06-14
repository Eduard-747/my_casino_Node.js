class Casino {

    constructor() {
    }

    static async random(min,max)
    {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static async creatMatrix()
    {
        let matrix = [];

        for(let i = 0; i < 3; ++i) 
        {
            let tmp_arr = [];
            for(let j = 0; j < 5; ++j) 
            {
                tmp_arr.push(await Casino.random(0,6));       
            }
            matrix.push(tmp_arr);
        }

        return matrix;
    }

    static async win_0_2(count, BET)
    {
        const win_table_0_2 = {
            0 : 0,
            1 : 0,
            2 : 0,
            3 : 5,
            4 : 10,
            5 : 40
        };

        return BET * win_table_0_2[count];
    }

    static async win_3_5(count, BET)
    {
        const win_table_3_5 = {
            0 : 0,
            1 : 0,
            2 : 0,
            3 : 10,
            4 : 40,
            5 : 100
        };

        return BET * win_table_3_5[count];
    }

    static async win_6(count, BET)
    {
        const win_in_6 = {
            0 : 0,
            1 : 0,
            2 : 0,
            3 : 20,
            4 : 200,
            5 : 1000
        };

        return BET * win_in_6[count];
    }

    static async winning_amount(table_num, count, BET)
    {
        const call_fun = {
            0 : Casino.win_0_2,
            1 : Casino.win_0_2,
            2 : Casino.win_0_2,
            3 : Casino.win_3_5,
            4 : Casino.win_3_5,
            5 : Casino.win_3_5,
            6 : Casino.win_6
        };
        
        let sum_win = await call_fun[table_num](count, BET);

        return sum_win;
    }

    static async check(matrix, BET)
    {
        let sum = 0;

        for(let i = 0; i < matrix.length; ++i) 
        {
            let count = 1;
            for(let j = 1; j < matrix[i].length; ++j) 
            {
                if(matrix[i][j] == matrix[i][0]) {
                    ++count;
                } else {
                    break;
                }
            }
            sum += await this.winning_amount(matrix[i][0], count, BET);
        }

        return sum;
    }
}

module.exports = Casino;