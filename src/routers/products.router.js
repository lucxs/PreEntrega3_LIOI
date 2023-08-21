import { Router } from "express";
import prodsController from "../controllers/products.controller.js";

const prodsRouter = Router();

//Instancio el objeto de productManager

prodsRouter.get('/', async (req, res)=>{

    try {
                
        let LimitProducts = req.query.limit;
        let pageProducts = req.query.page;
        let queryProducts = req.query.marca;
        let sortProducts = req.query.sort;


            let prodsPaginated =await  prodsController.prodsPaginated(LimitProducts, pageProducts, queryProducts, sortProducts )
            
            res.send(prodsPaginated);

    } catch (error) {

        res.send(`El error es - ProductsRouter: ${error}`);
        
    }


})


//Filtro un producto por ID
prodsRouter.get('/:pid', async (req,res)=>{

    try {
        let id = req.params.pid;
        let filterId = await prodsController.getProductById(id);

     res.send(filterId)
    
} catch (error) {
    res.send(`El error es: ${error}`);
}

            
})

    //Creando y añadiendo productos nuevos

prodsRouter.post('/', async(req, res)=>{


    try {
        //Añado productos
                const dataProds = await req.body;
                const addingProd = await prodsController.addProduct(dataProds)
                res.status(200).send({"Producto agregado": addingProd})

        
    } catch (error) {

        res.status(500).send(error)
        
    }

})

//Actualizando Productos

prodsRouter.put('/', async(req, res)=>{

try {

            //guardo en newObject lo que recibo del body para actualizar
     let newObject = await req.body;
     let pid = req.query.pid;


      await prodsController.updateProduct(pid, newObject);

    
} catch (error) {
    console.log(error);
    res.status(500).send(error)
}

})


    //Borrando productos

prodsRouter.delete('/', async(req, res)=>{

try {
         prodsController.deleteProduct(req.query.pid)

         res.status(200).send({"Producto de ID":req.query.pid+" eliminado"})
    
} catch (error) {

    res.status(404).send(error);
    
}


})

export {prodsRouter}