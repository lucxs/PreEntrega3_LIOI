import fs from 'fs';
import productManager from './ProductManager.js';

//Instancio la clase de los productos
const prodManager = new productManager();

export default class cartManager{
        #id = 0;
        #quantity = 0;
        #path = undefined;

        constructor(){

            if (!fs.existsSync('./carts.json')) {

                fs.writeFileSync('./carts.json',JSON.stringify([]))
                
            }

        this.#path = fs.promises.readFile('./carts.json', 'utf-8');

        }

         #getQUANTITY(){

                this.#quantity++;
                return this.#quantity;
                
        
            
        }

        #getID() {
            // Incremento en 1 el valor de id
            this.#id++; 
            return this.#id;
        }

        async addCart(){

                try {   
                    
                    const cartProducts = await{

                    };

                    //Le agrego el ID
                    cartProducts.cid = await this.#getID();

                    //Traigo el array de carts
                    const allCarts = await this.getCarts();

                    //Filtro por si ya existe para controlar que no se duplique
                    const filtro = await allCarts.filter(cart => cart.cid == cartProducts.cid )

                    if (filtro.length) {

                    await console.log("Este producto de ID: ",cartProducts.cid, "ya existe");

                    return
                    
                }else{

                        //Pusheo products array to cartsProducts

                       await allCarts.push(cartProducts);

                       await fs.promises.writeFile('./carts.json', JSON.stringify(allCarts))
                }  



                } catch (error) {

                    console.log("Algo salió mal en cartManager.addCart ==>",error);
                    
                }

        }

        async getCarts(){

            try {

                const allCarts = await this.#path;
                return JSON.parse(allCarts); 
                
            } catch (error) {

                console.log("Algo salió mal en cartManager.GetCarts() ==>", error);
                
            }

            

        }


        async getCartbyId(cid){

                  try {

                        //Traigo todos los prods del cart
                    const allCarts = await this.getCarts();

                    const cartsByid = await allCarts.find((cart)=>{

                        return cart.id == cid;

                    } );

                    return cartsByid;


                    
                  } catch (error) {

                    console.log("Algo salió mal en cartManager.getCardById ==>",error);
                    
                  }  

        }

        

        async addToCart(cid, pid){

            try {
                     
                     //Traigo todo el array de carts.json
                    const allCarts = await this.getCarts();

                    //Filtro por seleccion de CID
                      const filterProdCart = await allCarts.filter((prod) =>{

                          return prod.cid == cid
                      } )



                        // return filterProdCart
/////////////////--------------------------------------------///////////////////////////

                //Traigo todos los productos de products.json
             let allProds = await prodManager.getProducts();


            //Filtro por seleccion de PID
            const prodsfilter = await allProds.filter( (prod) =>{

                return prod.id == pid ;   
        })

                if (!prodsfilter.length) {

                    console.log("Este producto de ID ",pid," no existe");
                    return

                }else{

                    //Genero una copia con MAP agregando el quantity 
                    //Y lo retorno
                    const cidparseado = await parseInt(cid)

                    const prodDetails = await prodsfilter.map((pd)=>{

                        return{
                            cid: cidparseado,
                            pid: pd.id,
                            quantity: this.#getQUANTITY()
                            
                        }

                })

                  const newObjectFromProdsDetails = await prodDetails[0];


                  //Generando nuevo array sin el cid anterior y desactualizado
                    const newAllcarts = await allCarts.filter((prod) =>{

                        return prod.cid !== cidparseado
                    } )

                    await newAllcarts.push(newObjectFromProdsDetails)

                     await fs.promises.writeFile('./carts.json', JSON.stringify(newAllcarts))

                  return newAllcarts

                }


/////////////////--------------------------------------------///////////////////////////

                         //Actualizando objeto seleccionado por CID de cart Products
                    //    const updatingProdCart = await filterProdCart.map((prodcart)=>{

                    //          return {
                    //             cid: prodcart.id,
                    //             pid: newObjectFromProdsDetails.pid,
                    //             quantity: newObjectFromProdsDetails.quantity
                    //          }

                    //   })
                         
                            
                    

                    
                     
                    //     return await newAllcarts


            } catch (error) {

                console.log("error addToCart ==>", error);
                
            }


        }


}