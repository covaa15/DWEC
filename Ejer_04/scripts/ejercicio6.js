//6. Hay un párrafo en la página que contiene información sobre el precio en un atributo de datos. 
// Encuéntralo usando ese atributo y muestra su contenido.

console.log(document.querySelector("[data-precio]").textContent)
console.log(document.querySelector("[data-precio]").dataset.precio)