/*Usa setTimeout() para que, 5 segundos después de que
 la página principal se haya cargado, se abra 
 automáticamente la ventana emergente*/

/*La ventana emergente se debe abrir usando window.open 
(debe de tener un tamaño de 400x300 píxeles y estar centrada
 horizontalmente en la parte superior de la página). Guarda la 
 referencia a esta nueva ventana en una variable (p. ej., let popupWindow).*/
let popupWindow;
const posHorizontal = (window.screen.width - 400) / 2;

setTimeout(() => {
   abrirVentana();
}, 5000);


function abrirVentana() {
   popupWindow = window.open(
      "popup.html",
      "VentanaPopUp",
      `width=400,height=300,left=${posHorizontal},top=0`
   );


}
/*Añade un EventListener de click al botón “Abrir Pop-up Manualmente” 
para que también abra la ventana emergente. Comprueba si la ventana ya
está abierta o ha sido cerrada (popupWindow.closed) para no abrir múltiples
 ventanas. */
document.querySelector('#abrirPopUp').addEventListener('click', comprobarVentana);
function comprobarVentana() {
   if (popupWindow.closed)
      abrirVentana();

}

/*Añade un segundo botón en la página principal, “Cerrar Pop-up”, que utilice 
la referencia guardada para cerrar la ventana emergente (popupWindow.close()).*/
document.querySelector('#cerrarPopUp').addEventListener('click', () => {
   document.querySelector('h1').textContent = "Página Principal";
   popupWindow.close();
});