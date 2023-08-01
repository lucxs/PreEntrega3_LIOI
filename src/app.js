import  express  from "express";
import handlebars from 'express-handlebars'
import mongoose from 'mongoose'
import {Server} from 'socket.io'
import {prodsRouter} from "./routers/products.router.js"
import { cartsRouter } from "./routers/carts.router.js";
import viewRouter from './routers/views.router.js'
import { prodsServices } from "./dao/products.service.js";
import { msgService } from "./dao/message.service.js";
import cookieParser from "cookie-parser"
import session from "express-session"
import {usersRouter} from "./routers/users.router.js";
 import sessionsRouter from "./routers/sessions.router.js";
import inicializePassport from "./config/passport.config.js";
import passport from "passport";


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))

//-----------------------------------------------------------------------------------------------------//


mongoose.connect('mongodb+srv://lioilucas75:Lucas024!!@codercluster.fg4paop.mongodb.net/?retryWrites=true&w=majority');

const httpServer = app.listen(8080, ()=> console.log("Escuchando puerto 8080"))

const socketServer = new Server(httpServer);


//Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views','views/');
app.set('view engine','handlebars');
app.use(express.static('public'));


inicializePassport();
app.use(cookieParser("L4passd3l4ascokki33s"))
app.use(passport.initialize());


//session
app.use(
	session({
		secret: 'B2zdY3B$pHmxW%',
		resave: true,
		saveUninitialized: true,
	})
);


//Routes
app.use('/api/products', prodsRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/sessions', sessionsRouter)

//views
app.use('/', viewRouter);
app.use('/api/users', usersRouter)


//Socket
socketServer.on('connection', async (socket)=>{

    try {


                const allprods = await prodsServices.getProducts()


    // //Envio la lista de productos

           socket.emit('products', allprods);

    // Recibiendo caracterisiticas de producto nuevo

        socket.on('addingProds', async(data)=>{

            try {

              
                await prodsServices.addProduct(data);
                
            } catch (error) {

                console.log("Algo salió mal en el addingProds ==>", error);
                
            }

            
        })

        //Elimino el producto

        socket.on('prodIdToDelete', async(data)=>{

            try {

                 await prodsServices.deleteProduct(data)
                
            } catch (error) {

                console.log("Error en app.js en el envio del id para deletear producto ==>", error);
                
            }

        })

                //Socket chat


                socket.on("message", async(data)=>{

                            try {


                                 await msgService.addMessages(data)

                                 const MSGS = await msgService.getMessages()

                                 return socketServer.emit("sendingMSGs", MSGS)
                                
                            } catch (error) {

                                console.log(error
                                    );
                                
                            }
                })

        
    } catch (error) {

        console.log("Algo salió mal en el socket connection =>", error);
        
    }


})












