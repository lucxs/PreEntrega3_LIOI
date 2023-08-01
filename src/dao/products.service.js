import { productsModel } from "./models/products.model.js";

class productsServices {

         constructor(){

            this.prodModel = productsModel
         }

         
          async getProducts(){

                
             return await this.prodModel.find().lean()
                

          }

          async addProduct(data){

                try {

                    return await this.prodModel.create(data);

                } catch (error) {
                    
                        console.log("Error en el addproduct - Product.Service-->",error);
                }

          }


          async updateProduct(id, newObject){
            try {
               const filtro = {};
               filtro[newObject.campo] = newObject.valor;
                           return await this.prodModel.updateOne({_id:id},{$set: filtro})
                    
            } catch (error) {
                
                console.log(error);
            }
            
        

    }

         // async updateAllProduct(newObject){

         //       try {
         //          return await this.prodModel.updateMany(newObject)


         //       } catch (error) {

         //          console.log("Hubo algun error en el update de los prods para el array defoult de carts");
                  
         //       }


         // }




          async deleteProduct(data){

             await this.prodModel.deleteOne({_id: data.toString()})


          }

          async prodsPaginated(limit =10, page=1, query=undefined, sort=undefined){

                  
            try {

                     //Si query y sort son undefined retornar sin orden y sin filtro 
               if (query == undefined && sort == undefined) {

                  return await this.prodModel.paginate({},{lean: true, limit:limit, page:page})
                  

                  //Si query es distinto a undefined y sort es undefined retornar sin orden y con filtro 
               }else if(query !== undefined && sort == undefined){

                  return await this.prodModel.paginate({marca: query},{ lean: true, limit:limit, page:page})

               }else if(query == undefined && sort !== undefined){

                  let srt =  {price: sort}
                  return await this.prodModel.paginate({},{ lean: true, limit:limit, page:page, sort:srt})

               }else if(query !== undefined && sort !== undefined){
                  let srt =  {price: sort}

                  return await this.prodModel.paginate({marca: query},{ lean: true, limit:limit, page:page, sort:srt})

               }

               
            } catch (error) {

               console.log(error);
               
            }

                     
             


          }


}

export const prodsServices = new productsServices();