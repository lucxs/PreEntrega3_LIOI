import { Router } from "express";

//import productManager from "../dao/ProductManager.js";
import { prodsServices } from "../dao/products.service.js";

const prodsRouter = Router();

//Instancio el objeto de productManager
//const prodManager = new productManager();

prodsRouter.get('/', async (req, res)=>{

    try {
                //Esto queda del sistema anterior con FileSystem
        // let allProds = await prodManager.getProducts();

            //let allProds = await prodsServices.getProducts();

        let LimitProducts = req.query.limit;
        let pageProducts = req.query.page;
        let queryProducts = req.query.marca;
        let sortProducts = req.query.sort;


            let prodsPaginated = await prodsServices.prodsPaginated(LimitProducts, pageProducts, queryProducts, sortProducts )

            res.send(prodsPaginated);

    } catch (error) {

        res.send(`El error es: ${error}`);
        
    }


})


//Filtro un producto por ID
prodsRouter.get('/:pid', async (req,res)=>{

    try {
            let allProds = await prodManager.getProducts();
            let filterId = await allProds.filter(prod => prod.id == req.params.pid)

            await res.send(filterId)
            
    } catch (error) {
            res.send(`El error es: ${error}`);
    }

            

})

    //Creando y añadiendo productos nuevos

prodsRouter.post('/', async(req, res)=>{


    try {

        //Añado productos
    
         //await prodManager.addProduct("televisor4", "Sorny", 552268, "thumnail",12555, 5, true,"televisores");

         await prodsServices.addProduct({
            "title": "Lentes de sol",
            "description": "Lentes de sol Oakley con aumento",
            "price": 37500,
            "thumbnail": "url",
            "code": 455585548,
            "stock": 5,
            "status": true,
            "marca": "Oakley",
        })

        // //Control de duplicados por CODE
         await securityFilter(455585548);

         const allProds = await prodsServices.getProducts();

          res.status(200).send(allProds)

        
    } catch (error) {

        res.status(500).send(error)
        
    }

     async function securityFilter(code){

        try {

            //const actualprods = await prodManager.getProducts();
            const actualprods = await prodsServices.getProducts();
            const newfilter = actualprods.filter(element => element.code == code)
            if (newfilter.length > 0) {

                res.status(500).send("Este producto con code: "+code+" Ya se encuentra existente en otro producto")
                
                 return 
            }else{

                 res.status(201).send({"se Agregó un nuevo producto": actualprods})

            }  
            
        } catch (error) {
            console.log("Algo más salió mal en securityFilter ==>",error);
        }


     }

    
})

//Actualizando Productos

prodsRouter.put('/', async(req, res)=>{

try {

            //guardo en newObject lo que recibo del body para actualizar
     let newObject = await req.body;
     let pid = req.query.pid;


      await prodsServices.updateProduct(pid, newObject);

    
} catch (error) {
    console.log(error);
    res.status(500).send(error)
}

})


    //Borrando productos

prodsRouter.delete('/', async(req, res)=>{

try {

        //await prodManager.deleteProduct(req.params.pid);
        await prodsServices.deleteProduct(req.query.pid)

        await res.status(200).send({"Producto de ID":req.query.pid+" eliminado"})
    
} catch (error) {

    res.status(404).send(error);
    
}


})

export {prodsRouter}