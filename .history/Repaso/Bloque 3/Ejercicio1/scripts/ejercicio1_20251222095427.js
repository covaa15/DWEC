import { libros } from '../../../Datos/libros.js'


const totalPaginas=libros.reduce((acumulador,valorActual)=>acumulador+valorActual,0);