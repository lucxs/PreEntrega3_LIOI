import ProductsServices from "../services/products.service.js";
import productsDAO from "../dao/products.dao.js";

class ProductsController{

        constructor(){

            this.service = new ProductsServices(productsDAO);
        }

        async getProds(){

        return  this.service.getProducts();
            
        }

        getProductById(id){

                return this.service.getProdById(id);
        }

        addProduct(data){

            return this.service.addProduct(data);
        }

        updateProduct(id, newObject){

            return this.service.updateProduct(id, newObject);
        }

        deleteProduct(data){

            return this.service.deleteProduct(data)

          }

          prodsPaginated(limit =10, page=1, query=undefined, sort=undefined){
            
          return  this.service.prodsPaginated(limit, page, query, sort)
        }


}

const prodsController = new ProductsController();

export default prodsController;