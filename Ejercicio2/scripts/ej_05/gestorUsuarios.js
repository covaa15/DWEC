/*Dentro de este archivo, crea y exporta (usando export) una función llamada crearPerfil. 
Esta función debe aceptar nombre, email y edad y devolver un objeto que represente a
un usuario.*/

export function crearPerfil(nombre, email, edad) {
    return {
        nombre,
        email,
        edad
    }
}

/*Crea otra función llamada mostrarPerfil. Esta función debe aceptar un objeto de usuario
 y devolver un string con formato, por ejemplo: Nombre: [nombre], Email: [email], 
 Edad: [edad].

Exporta mostrarPerfil como la exportación por defecto (export default).
*/
export default function mostrarPerfil(usuario) {
    return `Nombre: ${usuario.nombre}, Email: ${usuario.email}, Edad: ${usuario.edad}`
}

//Añade y exporta una nueva función esMayorDeEdad. Esta función recibirá un objeto de 
// usuario y devolverá true si su edad es 18 o más, y false en caso contrario.
export function esMayorDeEdad(usuario) {
    if (usuario.edad >= 18)
        return true
    else
        return false
}

//Añade y exporta una función obtenerMayoresDeEdad que reciba un array de usuarios y, 
// utilizando el método .filter() y la función esMayorDeEdad, devuelva un nuevo array 
// solo con los usuarios que cumplen la condición.

export function obtenerMayoresDeEdad(usuarios) {
    let usuariosMayoresDeEdad = usuarios.filter((usuario) => {
        if (esMayorDeEdad(usuario) === true)
            return usuario
    })
    return usuariosMayoresDeEdad

}

export function calcularPromedioEdad(usuarios) {
    const suma = usuarios.reduce((acum, usuario) => acum + usuario.edad, 0);
    return suma / usuarios.length;
}
