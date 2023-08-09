import cartsDAO from "../dao/carts.dao.js";
import productsDAO from "../dao/products.dao.js";
import CartsService from "../services/cart.service.js";
import ProductsServices from "../services/products.service.js";


class CartsController {
    constructor(){

        this.cartService = new CartsService(cartsDAO);
        this.prodsService = new ProductsServices(productsDAO);
    }


      //Creando carrito 
     createCarts(data){

            return this.cartService.createCarts(data);

    }

      //Obteniendo carritos

    async getCarts(){

        return await this.cartService.getCarts();

    }

      //Obteniendo cart por ID
    async getCartbyId(cid){

        return await this.cartService.getCartbyId(cid);
    }

        //Agregando productos al carrito seleccionado
    async addProdToCard(cid,pid){



        try {
                const cart = await this.cartService.getCartbyId(cid);
                console.log(cart)
                if (!cart) {
                  throw new Error("No existe el carrito buscado");
                }
          
                const product = await this.prodsService.getProdById(pid);
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

                //Actualizando carrito  REVISAR
            async updateCart(){

                   return await this.cartService.updateCart(cid, newProds)

            }

//Update quantity de un producto de una cart seleccionada

async updateProdQuantity(cid,pid, quantityUpdated){

    try {
           const cart = await this.cartService.getCartbyId(cid);
           console.log(cart)
           if (!cart) {
             throw new Error("No existe el carrito buscado");
           }
     
           const product = await this.prodsService.getProdById(pid);
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

    async getCartOnviews(cid)
                {

                        try {
                                const cart = await this.cartService.getCartOnviews(cid);
                                return cart;
                            }
                         catch (error)
                          {
                                console.log("Error en getCartOnviews");                                                
                          }
                }


                  //revisar este

                  //Borrar un producto seleccionado en un carrito
              async deleteOnCartAProd(cid, pid){

                try {

                  const cartSelected = await this.cartService.getCartbyId(cid)
                          cartSelected.products = cartSelected.products.filter((product) => product.product.toString() !== pid);
                          let result = await this.cartService.updateCart(cid, cartSelected)
                           return result;
          } catch (error) {

                  console.log("Erorr en deleteOnCartAProd: ", error);
                  
          }

              }

              async deleteAllCard(id){

                try {
                  return await this.cartService.deleteAllCard(id)
                 
          } catch (error) {
                 console.log("error vaciando el carrito selecionado - carts.controller",error);
          }
              }



}

const cartsController = new CartsController();

export default cartsController;