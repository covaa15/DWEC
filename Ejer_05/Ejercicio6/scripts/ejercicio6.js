// Selecciono el div de los botones
const botonesDiv = document.querySelector('.botones');

// Selecciono todos los divs de contenido
const contenidos = document.querySelectorAll('.contenido  div');

/* 1. Asigna un data-id a cada botón de pestaña que se corresponda 
con el id del div de contenido que debe mostrar.*/
const botones = botonesDiv.querySelectorAll('button').forEach((boton, index) => {
  boton.dataset.id = index;
});

// 2. Usando delegación de eventos, escucha los clics en los botones.
botonesDiv.addEventListener('click', (e) => {
  // 3. Al hacer clic, primero oculta todos los div de contenido 
  // (añadiendo la clase oculto).
  contenidos.forEach(c => c.classList.add('oculto'));

  //  4. Luego, obtén el data-id del botón clicado y muestra
  //  solo el div de contenido correspondiente (quitándole la clase oculto).
  const id = e.target.dataset.id;
  contenidos[id].classList.remove('oculto');

});
