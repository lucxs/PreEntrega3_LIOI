
import {UsersModel} from "./models/userJWT.model.js";

class UserService{

        constructor(){

         this.model = UsersModel;

        }

        async createUser(userData){

            return await this.model.create(userData);

    }

    async getById(id){

        return await this.model.findById(id)
    }


    async getByEmail(email){

        return await this.model.findOne({email: email})
    }


        async getAll(){

            try {
                    return this.model.find()

            } catch (error) {

                console.log("Error al traer los usuarios", error);
                
            }
        }

    
}
export const usersServices = new UserService();




