import  {Router, query} from "express";
import { prodsRouter } from "./products.router.js";
import { cartServices } from "../dao/cart.service.js";

const cartsRouter = Router();

//Ruta raiz que crea cart
cartsRouter.post('/', async(req, res)=>{

        const title= req.body;

        try {   
                await cartServices.createCarts(title);
                
                 res.status(201).send("Se creo correctamente el documento para el carrito");
                
                
        } catch (error) {
                
                res.status(500).send(error)
        }
        
})

cartsRouter.get('/', async(req,res)=>{


        try {
               let allCarts = await cartServices.getCarts();
                
                 res.status(200).send(allCarts);
                
        } catch (error) {

                res.status(501).send(error)
                
        }


 })



        //Listando carrito con los prods
cartsRouter.get('/:cid', async(req,res)=>{


        try {
               let cartProdById = await cartServices.getCartbyId(req.params.cid);
                
                 res.status(200).send(cartProdById);
                
        } catch (error) {

                res.status(501).send(error)
                
        }


 })


                //Agregando Producto a una cart segun Cart ID
                cartsRouter.post('/:cid/product/:pid', async(req, res)=>{

                        const cid = req.params.cid;
                        const pid = req.params.pid;

                try {
                       
                        await cartServices.addProdToCard(cid, pid)
                       res.status(200).send("Producto cargado correctamente al carrito")
                        
                } catch (error) {

                        res.status(501).send(error)
                        console.log(error);
                        
                }

})

                //Actualizando lista de productos en cart

                cartsRouter.put('/:cid', async(req, res)=>{
                const newProds = req.body;
                 const cid = req.params.cid;
                 try {

                         let cartSelected = await cartServices.updateCart(cid, newProds);
                        res.send("carrito actualizado: "+cartSelected)
                        console.log(cartSelected);
                        
                 } catch (error) {

                        res.status(500).send(error)
                 }

                })

                //Update quantity de un producto de una cart seleccionada

                cartsRouter.put('/:cid/product/:pid', async(req, res)=>{
                        const {quantity} = req.body;
                        const cid = req.params.cid;
                        const pid = req.params.pid;

                        try {
                               const result = await cartServices.updateProdQuantity(cid, pid, quantity)
                               console.log(result);
                               res.status(200).send(result)
                        } catch (error) {
                                res.status(501).send(error)
                        }

                })



                //Eliminar del carrito producto seleccionado

                cartsRouter.delete('/:cid/product/:pid', async(req,res)=>{

                                        const cid = req.params.cid;
                                        const pid = req.params.pid;

                                try {
                                         await cartServices.deleteOnCartAProd(cid, pid)
                                         res.status(200).send("Se eliminó correctamente el producto del carrito")
                                } catch (error) {

                                        res.status(501).send(error);
                                        
                                }



                })

                        //vaciar carrito seleccionado
                cartsRouter.delete('/:cid', async(req, res)=>{

                                const cid = req.params.cid;

                        try {
                                await cartServices.deleteAllCard(cid)
                                res.status(200).send("Carrito vaciado")
                        } catch (error) {
                                res.status(500).send(error)
                        }

                })





export {cartsRouter}