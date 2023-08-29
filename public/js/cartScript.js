

 //Eliminando producto seleccionado de un cart en especifico

 function deleteProdOnCart(path){
 fetch(path, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }

  }).then(response => {
    if (response.ok) {
        
      console.log("Operacion exitosa");
      setTimeout(() => {
        window.location.pathname = "/carts/6490d95c437c8c2412dbaf4b"
       }, 1000);
    }else{
        console.log('La solicitud falló');
    }
    
  })
  
  .catch(error => {
    console.error('Error al enviar la solicitud', error);
  });
}
 

//update cantidad producto seleccionado de un cart en especifico

function UpdateQProdFromCart(path){

    fetch(path, {
       method: 'PUT',
       headers: {
         'Content-Type': 'application/json'
       }
   
     }).then(response => {
       if (response.ok) {
        console.log("Operacion exitosa");
        setTimeout(() => {
          window.location.pathname = "/carts/6490d95c437c8c2412dbaf4b"
         }, 1000);
       }else{
        console.log('La solicitud falló');
       }
       
     })
     
     .catch(error => {
       // Manejo de errores
       console.error('There was a problem with the fetch operation:', error);
     });
   }