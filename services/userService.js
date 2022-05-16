// Local requires
const typeorm = require('../database/typeorm');
const UserModel = require('../database/model/userModel');

class UserService {

    constructor() {
    }
    
    static async getUser (code) {
        let result = await typeorm.connection
        .getRepository(UserModel)
        .createQueryBuilder("my_db")
        .where("email = :email&&password = :password",
        {
            email: code.email,
            password: code.password 
        })
        .getOne();

        if (!result) {    
            throw new Error('error: Incorrect password or email entered! command: SPIN');
        }

        return result;
    }

    static async insertUser (code) {
        let result =  await typeorm.connection
        .createQueryBuilder()
        .insert()
        .into(UserModel)
        .values([
            {
                name: code.name, 
                email: code.email, 
                password: code.password,
                amount: code.amount
            }, 
        ])
        .execute();
    
        if (!result) {  
            throw new Error('error in insert! command: createUser');
        }
        
        return result;
    }

    static async modifyUserName (code) {
        let result =  await typeorm.connection
        .createQueryBuilder()
        .update(UserModel)
        .set({ name: code.name })
        .where("email = :email&&password = :password", 
        { 
            email: code.email, 
            password: code.password 
        })
        .execute();

        if (!result) {
            throw new Error('error: Incorrect password or email entered! command: changeName');
        }
        
        return result;
    }

    static async modifyUserAmount (code, Amount) {
        
        let result =  await typeorm.connection
        .createQueryBuilder()
        .update(UserModel)
        .set({ amount: Amount })
        .where("email = :email&&password = :password", 
        { 
            email: code.email, 
            password: code.password 
        })
        .execute();

        if (!result) {
            throw new Error('error: Incorrect password or email entered! command: changeAmount');
        }
        
        return result;
    }

    static async deleteUser (code) {
        let result =  await typeorm.connection
        .createQueryBuilder()
        .delete()
        .from(UserModel)
        .where("email = :email&&password = :password", 
        { 
            email: code.email, 
            password: code.password 
        })
        .execute();
    
        if (!result) {
            throw new Error('error: Incorrect password or email entered! command: deleteUser');
        }
        
        return result;
    }
}

module.exports = UserService;