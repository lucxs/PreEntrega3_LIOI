import UserService from "../services/users.service.js";
import userDao from "../dao/user.dao.js";

class UsersController {

    constructor(){
        this.service = new UserService(userDao);
    }

    createUser(userData){
        return this.service.createUser(userData);
    }

    getById(id){

        return this.service.getById(id);
    }

    getByEmail(email){
        return this.service.getByEmail(email)
    }

}

const userController = new UsersController();

export default userController;