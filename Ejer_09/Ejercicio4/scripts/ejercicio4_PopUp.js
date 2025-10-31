
/*Añade un `EventListener` de `click` al botón “Cerrar” de esta ventana.
Cuando se haga clic, la ventana debe cerrarse a sí misma usando `window.close()`.*/
document.querySelector('#cerrarPopUp').addEventListener('click', () => {
    window.opener.document.querySelector('h1').innerHTML = "Página Principal";

    window.close();
});

window.opener.document.querySelector('h1').innerHTML = "El pop-up te saluda";