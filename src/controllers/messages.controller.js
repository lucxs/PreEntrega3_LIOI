import messageDao from "../dao/messages.dao.js";
import messageService from "../services/message.service.js";

class MessageController{

constructor(){

    this.service = new messageService(messageDao);
}

async getMessages(){

        return await this.service.getMessages();

}

async addMessages(){

        return await this.service.addMessages();

}


}

const msgController = new MessageController();

export default msgController;