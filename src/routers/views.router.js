import express from 'express'
import { prodsServices } from '../dao/products.service.js';
import { cartServices } from '../dao/cart.service.js';
import {middlewarePassportJWT} from '../middlewares/auth.middleware.js'
const viewRouter =express();

//Paso la lista de productos a home.handlebars
viewRouter.get('/products', async(req, res)=>{
            
            
            let LimitProducts = req.query.limit;
            let pageProducts = req.query.page;
            let queryProducts = req.query.marca;
            let sortProducts = req.query.sort;

    try {

    
            const prodsPaginate = await prodsServices.prodsPaginated(LimitProducts, pageProducts, queryProducts, sortProducts )

           prodsPaginate.query = queryProducts;
           prodsPaginate.sort = sortProducts;

           console.log(prodsPaginate);

            //Filtros de seguridad
            if (pageProducts > prodsPaginate.totalPages || pageProducts < 1) {

                    let text = "El numero de pagina que intenta setear no existe"
                    return res.render('serverError', {text})
            
            }else if(pageProducts == ""){
                return res.render('home', {prodsPaginate, user, role})

            }else if(/^[A-Za-z]+$/.test(pageProducts) && !pageProducts == ""){
                let text = "Para el numero de pagina debe setear un numero"
                return res.render('serverError', {text})
            }else{

           return res.render('home', {prodsPaginate})
        }
        
    } catch (error) {

        console.log("Algo salió mal =>", error);
        
    }

})


viewRouter.get('/realtimeproducts',async(req, res)=>{

    let LimitProducts = req.query.limit;
    let pageProducts = req.query.page;
    let queryProducts = req.query.query;
    let sortProducts = req.query.marca;

    res.render('realtimeproducts', LimitProducts, pageProducts, queryProducts, sortProducts);

}) 

//Renderizo carts.handlebars
viewRouter.get('/carts/:cid', async(req,res)=>{

        let cid = req.params.cid;
    
try {

    const cartById = await cartServices.getCartOnviews(cid)

    console.log(cartById);
    
    res.render('carts', {cartById});

    
} catch (error) {

    res.render(error)
    
}


})


//register

viewRouter.get('/register',(req,res)=>{

    
         res.render('register')
   

})

//Login

viewRouter.get('/login',(req,res)=>{

         res.render('login')
    
})


//current

viewRouter.get('/current',middlewarePassportJWT,(req, res) => {
         const user = req.user;
          res.render('privateCurrent',{user})
});


//chat


viewRouter.get('/chat', (req, res)=>{


        res.render('chat')

})

//ServerError

viewRouter.get('/serverError', (req,res)=>{

        res.render('serverError')

})

export default viewRouter;