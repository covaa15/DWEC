/*19.Comienza en el primer div de información (.info). 
Desde ahí, sube a su elemento padre (la tarjeta) y, 
una vez ahí, desciende para encontrar el primer elemento 
hijo de esa tarjeta, que debería ser la imagen.*/
console.log("Ejercicio 19: Forma 1")
console.log(document.querySelector('.info').parentElement.firstElementChild)

console.log("Ejercicio 19: Forma 2")
document.querySelectorAll('.info').forEach((claseInfo) => {
    console.log(claseInfo.parentElement.firstElementChild)
});





