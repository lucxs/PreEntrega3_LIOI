import { messageModel } from "./models/messages.model.js"

class messageService{

        constructor(){


                this.msjModel = messageModel;

        }


        async addMessages(data){

                try {

                    return await this.msjModel.create(data);
                    
                } catch (error) {

                    console.log("Hubo un error al enviar el");
                    
                }

        }


        async getMessages(){

                return await this.msjModel.find().lean()


        }


}

export const msgService = new messageService()