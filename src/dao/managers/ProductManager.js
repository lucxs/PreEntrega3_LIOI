import fs from 'fs';


export default class productManager{
    #id = 0;
    #path = undefined;
          constructor(){                 
                        if (!fs.existsSync('./products.json')) {

                            fs.writeFileSync('./products.json',JSON.stringify([]))
                            
                        }

             this.#path = fs.promises.readFile('./products.json', 'utf-8');   

        }

        async #getID() {
            // Incremento en 1 el valor de id

            try {
                const actualprods = await this.getProducts();
                 //Filtro comparando con la cantidad de elementos dentro del array de objetos que seria el mismo valor del ID del ultimo producto
                 let filtroID = await actualprods.some( prod => prod.id == actualprods.length )

                 //Si es distinto de true es porque se reinició a cero
                 if (!filtroID == true) {
 
                     await this.#id++; 
                     return this.#id;
                     
                 }else{
                            //Si es true remplaza el valor del ID por el valor de la cantidad de elementos igual al valor del ultimo ID + 1, para el siguiente producto
                     this.#id = await actualprods.length + 1; 
                     console.log(filtroID);
                     return this.#id;
                     
 
                 }
                 
                
            } catch (error) {

                console.log("Algo salio mal en el metodo de la asignación por ID ==>", error);
                
            }

                   
            
        }


       async addProduct(title = undefined, description = undefined, price = undefined, thumbnail = undefined, code = undefined, stock = undefined, status = undefined, category = undefined){
                
            try {

                const allprods = await this.getProducts();
                const newfilter = await allprods.filter(element => element.code == code)
                if (newfilter.length > 0) {
                    
                     console.log("YA EXISTE UN PRODUCTO CON EL CODE QUE INTENTA INGRESAR");
                     return
                }

                const product = await {

                    title: title,
                    description: description,
                    price: price,
                    thumbnail: thumbnail,
                    code: code,
                    stock: stock,
                    status: status,
                    category: category
            }

                

                
                product.id = await this.#getID();

                   const actualprods = await this.getProducts();

                    await console.log(actualprods);

                    const filtro = await actualprods.filter(prod => prod.id == product.id )

                if (filtro.length) {

                    console.log("Este producto de ID: ",product.id, "ya existe");

                    return
                    
                }else{


                     actualprods.push(product)
                

                 await fs.promises.writeFile('./products.json', JSON.stringify(actualprods))
                }

                
            


                

            } catch (error) {
                console.log("no se cargó ningún producto, algo salio mal: ", error);
            }

        

        }



        async getProducts(){

                try {

                    const content = await this.#path;

                    return JSON.parse(content);
                    
                } catch (error) {
                    console.log('hubo un error para obtener los usuarios');
                }

        }

        async getProductById(id){

            try {
                
                const actualprods = await this.getProducts();

                if (actualprods.length == 0) {

                    console.log("No se puede filtrar ningun producto por su ID, el archivo aun está vacio");
                    return
                }else{

                    const filtro = await actualprods.filter((prod)=>{
                        return prod.id === id;
                    })
    
                    if (filtro.length >0) {
                        return console.log("Resultado de GetProductsBy ID: Producto filtrado por id:",id,filtro);
                        
                    }else{
    
                        return console.log("Resultado de GetProductsBy ID: No existe ningun producto con este ID");
                    }


                }

                
                

            } catch (error) {
                
                 console.log("Algo falló: ",error);
            }
            
            

        }

        async updateProduct(id, newObject){
                try {
                        //LLamo a lista de productos actuales:
                        const actualprods = await this.getProducts();

                        //return console.log("desde productManager:",newObjectsArray);

                        if (actualprods.length == 0) {
                            console.log("No se puede actualizar nada, el archivo aun está vacio");
                            return
                        }else{

                                 // a newObject lo paso a un array
                                const newObjectsArray = await Object.entries(newObject); 

                            console.log("Usted desea actualizar producto de ID: ",id," campo/s: ",newObjectsArray);

                            //Traigo el objeto del id del parametro
                        const newFilter = await actualprods.filter((prod)=>{

                            return prod.id === parseInt(id);
                        })

                       if (newFilter.length == 0) {

                        console.log("No existe en la lista un objeto con el ID: ", id," no se puede actualizar nada.");

                        return

                       }else{

                        //Actualizo
                        const listUpdated = await newFilter.find((prod)=>{

                            prod[newObjectsArray[0][0]] = newObjectsArray[0][1];
                            return prod;
                            
                             
                         })
                                //Filtro una nueva lista sin el objeto anterior
                            const actualprodsupdated = await actualprods.filter(prod => prod.id !== id);

                            await actualprodsupdated.push(listUpdated);

                            await fs.promises.writeFile('./products.json', JSON.stringify(actualprods))

                          console.log("Lista actualizada: ", listUpdated);
                        
                       }

                        
                        }

                        

                         
                } catch (error) {
                    
                    console.log(error);
                }
                
            

        }

        async deleteProduct(id){

            try {

                        const actualprods = await this.getProducts();

                        const testid = await actualprods.filter(prod => prod.id == parseInt(id));

                        if (testid == 0) {
                            console.log("Este producto con el ID: ",id, "no existe en la lista. No se puede eliminar nada");
                            return
                        }else{

                            const listUpdated = await actualprods.filter(prod => prod.id !== parseInt(id));


                             await fs.promises.writeFile('./products.json', JSON.stringify(listUpdated))


                        console.log("Lista con elemento de ID: ",id," eliminado", listUpdated);
                        }

                       


                
            } catch (error) {

                console.log(error);
                
            }

                        
        }

        

}

//  let pd = new productManager();


//   pd.addProduct("Monitor2","Monitor led 32 pulgadas 144ghz", 147600, "url", 113669988, 10)
//  pd.addProduct("Monitor3","Monitor led 32 pulgadas 144ghz", 147600, "url", 11324, 10)
//  pd.addProduct("Monitor4","Monitor led 32 pulgadas 144ghz", 147600, "url", 11324, 10)

//         pd.getProductById(2);
    
//        pd.updateProduct(6,"title","consola");

//       pd.deleteProduct(1);


 