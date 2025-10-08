/*
Queremos aplicar un estilo especial a los cursos estándar. 
Filtra la lista de tarjetas para obtener solo aquellas que NO son ‘premium’.
A las tarjetas resultantes, aplícales un borde punteado de 2px de color negro.
*/

document.querySelectorAll('.card').forEach((tarjeta) => {

    if(!tarjeta.classList.contains('premium'))
        tarjeta.classList.add('tarjetas');

})