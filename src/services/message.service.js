
export default class messageService{

        constructor(dao){


                this.dao = dao;

        }


        async getMessages(){

                return await this.dao.getMessages()


        }

        async addMessages(data){

                    return await this.dao.addMessages(data)
                 
        }


}

