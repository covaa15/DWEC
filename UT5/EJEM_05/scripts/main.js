//propiedades de validacion de HTML5
// function init() { 
//   const emailElement = document.getElementById('email'); 
//   emailElement.addEventListener('change', validateEmail); 
// } 
//validando campo email 
// function validateEmail(e) { 
//   const event = (e ? e : window.event);            // Evento 
//   const emailElement = (event.target               // Elemento de destino 
//     ? event.target 
//     : event.srcElement); 
//   console.log(emailElement.willValidate);          // true 
//   console.log(emailElement.validity);              // ValidityState: ... 
//   console.log(emailElement.validity.valueMissing); // ... ¿Valor presente? 
//   console.log(emailElement.validity.valid);        // ... ¿Valor válido? 
//   console.log(emailElement.validationMessage);     // Mensaje de validación 
// } 
 
// document.addEventListener('DOMContentLoaded', init);  


// Validar correo y mostrar mensajes de error por defecto
// function init() { 
//   const emailElement = document.getElementById('email'); 
//   emailElement.addEventListener('change', validateEmail); 
// }
// function validateEmail(e) { 
//   const event = (e ? e : window.event);            // Evento 
//   const emailElement = (event.target               // Elemento de destino 
//     ? event.target 
//     : event.srcElement); 
 
//   const errorContainer = document.getElementById('email-error'); 
//   const messageContainer = document.querySelector('.error-message'); 
//   if(!emailElement.validity.valid) { 
//     messageContainer.textContent = emailElement.validationMessage; 
//     errorContainer.style.display = 'block'; 
//   } else { 
//     messageContainer.textContent = ''; 
//     errorContainer.style.display = 'none'; 
//   } 
// } 
// document.addEventListener('DOMContentLoaded', init); 


// Validar que los dos correos electrónicos coincidan
// y mostrar mensajes de error personalizados
// con .setCustomValidity()
// function init() { 
//   const emailElement = document.getElementById('email'); 
//   const emailElement2 = document.getElementById('email2'); 
//   emailElement.addEventListener('change', validateEmail); 
//   emailElement2.addEventListener('change', validateEmail); 
// } 
 
// function validateEmail(e) { 
//   const emailElement = document.getElementById('email'); 
//   const emailElement2 = document.getElementById('email2'); 
//   if (emailElement.value !== emailElement2.value) { 
//     emailElement.setCustomValidity('Los correos electrónicos deben coincidir.'); 
//     emailElement2.setCustomValidity('Los correos electrónicos deben coincidir.'); 
//   } else { 
//     emailElement.setCustomValidity(''); 
//     emailElement2.setCustomValidity(''); 
//   } 
//   const errorContainer = document.getElementById('email-error'); 
//   const messageContainer = errorContainer.querySelector('.error-message'); 
//   if(!emailElement.validity.valid) { 
//     messageContainer.textContent = emailElement.validationMessage; 
//     errorContainer.style.display = 'block'; 
//   } else { 
//     messageContainer.textContent = ''; 
//     errorContainer.style.display = 'none'; 
//   } 
// } 
// document.addEventListener('DOMContentLoaded', init);  

// Deshabilitamos verificación nativa y validamos todo el formulario
// registerForm.noValidate = true; 
// Validamos nosotros todo el formulario antes de enviarlo
//   
function init() { 
  const registerForm = document.getElementById('register'); 
  registerForm.noValidate = true;  
  registerForm.addEventListener('submit', validateForm); 
} 
 
document.addEventListener('DOMContentLoaded', init); 
 
function validateForm(e) { 
  const event = (e ? e : window.event); // Evento 
  const form = (event.target           // Elemento de destino 
            ? event.target 
            : event.srcElement); 
  let formIsValid = true;              // Validez del formulario 
  const formElements =                  // Elementos del formulario ... 
    form.querySelectorAll(             // ... que admiten ... 
      'input, textarea, select');      // ... validación nativa 
  for (let i = 0; i < formElements.length; i++) { 
    const formElement = formElements[i]; 
    // forzamos manualmente la validación nativa
    if (formElement.willValidate !== 'undefined') { 
      formElement.checkValidity(); 
      
    } else { 
    // El navegador no es compatible 
    // la validación HTML5 nativa. 
    } 
    if (!formElement.validity.valid) { // Si el valor no es válido... 
      formIsValid = false; // ... los datos del formulario no son válidos. 
    } 
  } 
  if (!formIsValid) {                  // Si los datos del formulario no son válidos... 
    if (event.preventDefault) {        // ... 
      event.preventDefault(); 
      // ... impide las acciones predeterminadas. 
      // aquí podría mis validadciones personalizadas
      
    } 
  } 
  // si formIsValid es true, el formulario se envía normalmente
  // si formIsValid es false, el formulario no se envía
  return formIsValid; 
}  
