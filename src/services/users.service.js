
export default class UserService{

        constructor(dao){

         this.dao = dao;

        }

        async createUser(userData){
            try {

                return await this.dao.addUser(userData);
                
            } catch (error) {

                console.log("Error en la capa de servicio metodo createUser:",error);
                
            }
    

    }

    async getById(id){
        try {
                const allUsers = await this.dao.getAllUsers()
                const userById = allUsers.find((user)=>user._id === id)
                return userById;
        } catch (error) {

                console.log("Error en la capa de servicio obteniendo userById:",error);
            
        }
        //return await this.model.findById(id)
    }


    async getByEmail(email){

            try {
                const allUsers = await this.dao.getAllUsers()
                const userByEmail = allUsers.find((user)=>user.email === email)
                return userByEmail;
                
            } catch (error) {

                console.log("Error en la capa de servicio obteniendo userByEmail:", error);
                
            }

        //return await this.model.findOne({email: email})
    }


    
}




