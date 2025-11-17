
  //lista selección simple
  
  // const messageContainer = document.getElementById('selection'); // Contenedor para mensajes 
  // const order = document.getElementById('order');  // Elemento <select> 
  // console.log(messageContainer);
  // order.addEventListener('change', updateOrder);   // Registrar oyente 
 
  // function updateOrder(event) {                // esto es del tipo ... 
  //                                              // ... tipo HTMLSelectElement 
  //   const value = this.value;                   // El valor seleccionado actualmente 
  //   const index = this.selectedIndex;           // Índice de la opción seleccionada 
  //   const option = this.item(index);            // Elemento <option> seleccionado 
  //   const text = this.item(index).text;         // Texto del elemento <option>  
  //  const message= text + ' (' + value + ')'; // Generar mensaje 
  //   messageContainer.innerText = message;      // Mostrar mensaje 
  // } 


  //lista selección múltiple
// const messageContainer = document.getElementById('selection'); // Contenedor para mensajes 
// const order = document.getElementById('order');  // Elemento <select> 
// order.addEventListener('change', updateOrder);   // Registrar oyente 

// function updateOrder(event) { 
//   while (messageContainer.firstChild) {          // eliminar todos los mensajes 
//     messageContainer.removeChild( 
//       messageContainer.firstChild 
//     ); 
//   } 
//   const opciones = this.selectedOptions;           // opciones seleccionadas 
//   for (let i = 0; i < opciones.length; i++) {     // para cada opción ... 
//     const mensaje = opciones[i].text               // ... generar ... 
//       + ' (' + opciones[i].value + ')';           // ... mensaje ... 
//     const div = document.createElement('div');   // ... y añadirlo ... 
//     const optionText = document.createTextNode(mensaje);                   // 
//     div.appendChild(optionText);                 // 
//     messageContainer.appendChild(div);            // ... al contenedor 
//   } 
// }

// rellenar select con js
const messageContainer = document.getElementById('selection'); 
const order = document.getElementById('order'); 
const options = [ 
  {name: 'Pizza Salami', id: 'P001'}, 
  {name: 'Pizza Margherita', id: 'P002'}, 
  {name: 'Pizza Tonno', id: 'P003'}, 
  {name: 'Pizza Mozzarella', id: 'P004'}, 
  {name: 'Pizza Hawaii', id: 'P005'} 
]; 
for(let i=0; i<options.length; i++) { 
  order.add( 
    new Option(         // constructor para elementos <option> 
      options[i].name, // texto que se mostrará 
      options[i].id,   // valor opcional asociado a la selección 
      false,           // especificación opcional que establece  
                      // el atributo «selected» 
      false             // especificación opcional de si el valor debe  
                      // debe preseleccionarse 
    ) 
  ); 
}  
