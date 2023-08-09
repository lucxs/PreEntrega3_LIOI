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

         addProduct(data){

            const actualprods =  this.dao.getProducts();
            const newfilter = actualprods.filter(element => element.code == data.code)
            if (newfilter.length > 0) {
               
                     const messageError = "Este producto con code: "+data.code+" Ya se encuentra existente en otro producto"
                 
                     return messageError
            }else{

               return this.dao.addProduct(data);

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
