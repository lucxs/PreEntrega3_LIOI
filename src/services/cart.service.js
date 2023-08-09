

export default class CartsService{

        constructor(dao){

                this.dao = dao;

        }

        async createCarts(data){

            try {
                return await this.dao.createCarts(data);
                

            } catch (error) {
                
                    console.log("Error en el createCarts - Carts.Service-->",error);
            }

      }


        async getCarts(){

                try {
                        return await this.dao.getCarts(); 
                        
                } catch (error) {

                 console.log("Error getCarts - service: ", error);
                        
                }
 
         }


         async getCartbyId(cid){

                try {

                        return await this.dao.getCartbyId(cid)

                  
                } catch (error) {

                  console.log("Algo salió mal en getCardById - cartService ==>",error);
                  
                }  

      }

                        //Update carrrito seleccionado

        async updateCart(cid, newProds){

                try {

                return this.dao.updateCart(cid, newProds)

        } catch (error) {

                console.log("Error en el updateCart - cart.service", error);
                                                
        }
                        }


                       async getCartOnviews(cid){
                        try {

                                return await this.dao.getCartOnviews(cid)
                                
                        } catch (error) {
                                console.log("este",error);
                        }

                        

                       }
  

                //Vaciar carrito
      async deleteAllCard(cid){

                return await this.dao.emptyCart(cid)


      }

}
