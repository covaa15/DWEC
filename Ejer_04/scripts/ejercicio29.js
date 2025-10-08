/*29. Para mejorar la accesibilidad y el rastreo, 
recorre todos los enlaces de la navegación y 
asígnales un atributo data-tipo con el valor enlace-nav.
*/

document.querySelectorAll('.navegacion a').forEach((enlace) => {
    enlace.setAttribute('data-tipo', 'enlace-nav');
    console.log(enlace);
})


