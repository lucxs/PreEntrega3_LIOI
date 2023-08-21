import addingProdDTO from "../../dao/DTOs/products/product.dto.js";


export default class productRepository {
    constructor(dao) {
        this.dao = dao;
    }

        //User Register
    async checkingProduct(data) {

        try {

            const product = new addingProdDTO(data);
            return product
            
        } catch (error) {
            console.log("Error - capa de abstracción DTO:", error);      
            return error
              

        }
        
    }



}