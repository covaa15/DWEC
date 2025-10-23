//añadiendo el evento a todos los radio

const messageContainer = document.getElementById('selection');// Contenedor para mensajes 
const orderForm = document.getElementById('orderform');             // Formulario 
const radioButtons = orderForm.order; 
for(let i=0; i<radioButtons.length; i++) { 
  radioButtons[i].addEventListener('change', (e) => { 
    console.log(e.target.value);                 // p. ej., «P002» 
    messageContainer.innerText = e.target.value; // Mostrar mensaje 
  }); 
}  
