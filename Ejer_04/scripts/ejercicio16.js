//16.El botón en la tarjeta premium es nuestro punto de partida. 
// Desde él, navega por el DOM hacia arriba hasta encontrar el 
// contenedor que agrupa toda su información (un div con la clase ‘info’).

console.log(document.querySelector('#btn-info-premium').parentElement);