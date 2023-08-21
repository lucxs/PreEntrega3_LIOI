
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

    async getAllUsers(){

        try {
                return await this.dao.getAllUsers()
            
        } catch (error) {

            console.log("Error capa de servicio Getallusers: ", error);
        }
    }

    async getById(id){
        try {
                return await this.dao.getUserById(id)
        } catch (error) {

                console.log("Error en la capa de servicio obteniendo userById:",error);
            
        }
    }

    
}




