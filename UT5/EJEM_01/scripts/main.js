// distintas formas de seleccionar formularios

// const formById = document.getElementById('login'); 
// const formByName = document.getElementsByName('login')[0]; 
// const formBySelector = document.querySelector('form'); 
// // 2.) Acceso mediante la propiedad forms  
// const formByFormsField = document.forms[0]; 
// // 3.) Acceso a través del nombre del formulario  
// const formByNameField = document.login; 
// console.log(formById.id);             // «login» 
// console.log(formByName.id);           // «login» 
// console.log(formBySelector.id);       // «login» 
// console.log(formByFormsField.id);     // «login» 
// console.log(formByNameField.id);      // «login» 

// distintas propiedades del formulario

// const form = document.getElementById('login'); 
// console.log(form.elements);          // Elementos del formulario, detalles a continuación 
// console.log(form.length);            // Número de elementos del formulario 
// console.log(form.name);              // Nombre del formulario, «login» en este caso 
// console.log(form.action);            // Contenido del atributo «action» 
// console.log(form.method);     

// 1.) Acceso mediante métodos de selección DOM 
// const fieldUserNameById = document.getElementById('username'); 
// const fieldPasswordById = document.getElementById('password'); 
// const fieldRememberById = document.getElementById('remember'); 
// const buttonSubmitById = document.getElementById('submit'); 
// console.log(fieldUserNameById.id);   // «username» 
// console.log(fieldPasswordById.id);   // «password» 
// console.log(fieldRememberById.id);   // «recordar» 
// console.log(buttonSubmitById.id);    // «enviar» 
 
// 2.) Acceso a través de la propiedad elements 
// const form = document.getElementById('login'); 
// const formElements = form.elements; 
// console.log(formElements.length);    // 4 
// const fieldUserName = formElements[0]; 
// const fieldPassword = formElements[1]; 
// const campoRecordar = formElements[2]; 
// const botónEnviar = formElements[3]; 
// console.log(fieldUserName.id);       // «username» 
// console.log(fieldPassword.id);       // «contraseña» 
// console.log(campoRecordar .id);       // «remember» 
// console.log(botónEnviar.id);        // «enviar»


/// Cogiendo los elementos de uno en uno
// const inputUsername = document.getElementById('username'); 
// const inputPassword = document.getElementById('password'); 
// inputUsername.addEventListener('change', function(e) { 
//   console.log(this.value);             // valor introducido 
// }); 
// inputPassword.addEventListener('change', function(e) { 
//   console.log(this.value);             // valor introducido 
// });  


//problema con listener arrow function (no podemos usar this)
// usamos el nombre con la variable del propio elemento

// const inputUsername = document.getElementById('username'); 
// const inputPassword = document.getElementById('password'); 
// inputUsername.addEventListener('change', (e) => { 
//   console.log(inputUsername.value); // valor introducido 
//   console.log(this.value); // indefinido 
// }); 
// inputPassword.addEventListener('change', (e) => { 
//   console.log(inputPassword.value); // valor introducido 
//   console.log(this.value); // indefinido 
// });  

// o a través del target del evento
const inputUsername = document.getElementById('username'); 
const inputPassword = document.getElementById('password'); 
inputUsername.addEventListener('change', (e) => { 
  console.log(e.target.value); // valor introducido 
}); 
inputPassword.addEventListener('change', (e) => { 
  console.log(e.target.value); // valor introducido 
}); 

// el checkbox
const checkbox = document.getElementById('remember'); 
checkbox.addEventListener('change', (e) => { 
  console.log(checkbox.value);   // por defecto, el valor «on» 
  console.log(checkbox.checked); // verdadero o falso 
});  
