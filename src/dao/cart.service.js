import { cartModel } from "./models/cart.model.js";
import { productsModel } from "./models/products.model.js";

class cartsService{

        constructor(){

                this.crtModel = cartModel;
                this.prodModel = productsModel;

        }

        ///

        async createCarts(data){

            try {

                return await this.crtModel.create(data);

            } catch (error) {
                
                    console.log("Error en el createCarts - Product.Service-->",error);
            }

      }


        async getCarts(){

                
            return await this.crtModel.find().lean()
               

         }


         async getCartbyId(cid){

                try {

                        return await this.crtModel.findOne({_id:cid})

                  
                } catch (error) {

                  console.log("Algo salió mal en cartManager.getCardById ==>",error);
                  
                }  

      }

        async addProdToCard(cid,pid){



                try {
                        const cart = await this.crtModel.findById(cid);
                        console.log(cart)
                        if (!cart) {
                          throw new Error("No existe el carrito buscado");
                        }
                  
                        const product = await this.prodModel.findById(pid);
                        console.log(product);
                  
                        if (!product) {
                          throw new Error("No existe el producto buscado");
                        }
                  
                        const index = cart.products.findIndex((producto) => {
                          return producto.product.toString() === pid;
                        });
                        if (index === -1) {
                          cart.products.push({ product: pid, quantity: 1 });
                        } else {
                          cart.products[index].quantity += 1;
                        }
                        await cart.save();
                        return cart;
                      } catch (error) {
                        throw new Error(`No se pudo agregar producto al carrito: ${error}`);
                      }



        }


                        //Update carrrito seleccionado

                        async updateCart(cid, newProds){

                                        try {

                                                const cartSelected = await this.crtModel.findById(cid);
                                                cartSelected.products = newProds;
                                                const updatedCart = await cartSelected.save();
                                                return updatedCart;
                                        } catch (error) {

                                                console.log("Error en el updateCart", error);
                                                
                                        }


                        }

                        //Update quantity de un producto de una cart seleccionada

                                async updateProdQuantity(cid,pid, quantityUpdated){

                                        try {
                                                const cart = await this.crtModel.findById(cid);
                        console.log(cart)
                        if (!cart) {
                          throw new Error("No existe el carrito buscado");
                        }
                  
                        const product = await this.prodModel.findById(pid);
                        console.log(product);
                  
                        if (!product) {
                          throw new Error("No existe el producto buscado");
                        }
                  
                        const index = cart.products.findIndex((producto) => {
                          return producto.product.toString() === pid;
                        });
                        if (index === -1) {
                          cart.products.push({ product: pid, quantity: quantityUpdated });
                        } else {
                          cart.products[index].quantity = quantityUpdated;
                        }
                        await cart.save();
                        return cart;
                                               
                                        } catch (error) {

                                                console.log("error en el updateProdQuantity:", error);
                                                
                                        }

                                }


                                async getCartOnviews(cid){

                                        try {
                                                const cart = await this.crtModel.findById(cid).populate('products.product').lean();
                                                return cart;
                                        } catch (error) {

                                                console.log("Error en getCartOnviews");
                                                
                                        }
                                }


                //Eliminar del carrito producto seleccionado

                async deleteOnCartAProd(cid, pid){


                        try {

                                const cartSelected = await this.crtModel.findOne({_id:cid})
                                                 cartSelected.products = cartSelected.products.filter((product) => product.product.toString() !== pid);
                                                let result = await this.crtModel.updateOne({_id: cid},cartSelected)
                                                return result;
                        } catch (error) {

                                console.log("Erorr en deleteOnCartAProd: ", error);
                                
                        }
                }



                //Vaciar carrito
      async deleteAllCard(cid){

                try {

                       return await this.crtModel.updateOne(
                        { _id: cid },
                        { $set: { products: [] } })
                        
                        
                } catch (error) {

                        console.log("Se produjo un error en el vaciado del carrito:", error);
                        
                }


      }

}

export const cartServices = new cartsService();