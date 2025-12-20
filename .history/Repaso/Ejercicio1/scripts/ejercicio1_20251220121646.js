import libros from '../Datos/libros.js'

libros.forEach(libro => {
    console.log(`El libro ${libro.titulo} tiene ${libro.paginas} páginas. `)
});