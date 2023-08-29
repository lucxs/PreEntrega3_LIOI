export default class ProductsServices {

         constructor(dao){

            this.dao = dao
         }

         
          async getProducts(){
   
                  return await this.dao.getProducts();
                  
          }


          async getProdById(id){

               return await this.dao.getProdById(id);

          }

          async getSomeProdsById(data){
            return await this.dao.getSomeProdsById(data)
          }

         async addProduct(data){

               try {

                  return await this.dao.addProduct(data);
                  
               } catch (error) {

                  console.log("Error product.service metodo addProduct:", error);
                  
               }
         }  
            
   
           updateProduct(id, newObject){
            
               const filtro = {};
               filtro[newObject.campo] = newObject.valor;

               return this.dao.updateProduct(id,filtro)
                  
    }

            deleteProduct(data){

            this.dao.deleteProduct(data)

          }

          prodsPaginated(limit, page, query, sort){

             return this.dao.prodsPaginated(limit, page, query, sort)
          }


}
