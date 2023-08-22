
export default class messageService{

        constructor(dao){


                this.dao = dao;

        }

        async getMessages(){

                try {

                return await this.dao.getMessages()  

                } catch (error) {
                        console.log("Error getMessages.services: ",error);
                        
                }

                
        }

        async addMessages(data){

                try {
                        return await this.dao.addMessages(data) 
                        
                } catch (error) {

                        console.log("Error addMessage.services: ",error);                        
                }
                               
        }

}

