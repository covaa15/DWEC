
// 1. Escribe una función llamada cambiarImagenPrincipal que acepte un número de índice como parámetro (ej: 0, 1, 2, etc.).
function cambiarImagenPrincipal(num) {

    // a. Selecciona todas las imágenes con la clase miniatura y guárdalas en una NodeList.
    const imagenes = document.querySelectorAll('.miniatura');

    // b. Usa el índice recibido para acceder a la miniatura correcta dentro de la NodeList.
    const miniatura = imagenes[num];

    // c. Obtén el atributo src de esa miniatura.

    const atributoSrcMiniatura = miniatura.getAttribute('src');

    //  d. Selecciona la imagen-principal y cambia su src por el de la miniatura.
    const imagenPrincipal = document.querySelector('#imagen-principal');
    const atributoImagenPrincipal = imagenPrincipal.getAttribute('src');

    imagenPrincipal.setAttribute('src', atributoSrcMiniatura);
    miniatura.setAttribute('src', atributoImagenPrincipal)
    resaltarMiniatura(num);

}

document.querySelectorAll('.miniatura').forEach((img, num) => {
    img.addEventListener('click', () => cambiarImagenPrincipal(num));
});

/*  3. (Extra): Escribe una segunda función resaltarMiniatura(indice) 
que añada una clase activa (con un borde de color) a la miniatura en la 
posición indice y se la quite a todas las demás.*/


function resaltarMiniatura(indice) {
    const miniaturas = document.querySelectorAll('.miniatura');
    miniaturas.forEach(img => img.classList.remove('activa'));
    miniaturas[indice].classList.add('activa');

}