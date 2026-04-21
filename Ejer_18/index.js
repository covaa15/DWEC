// Configuro express y morgan
import express from 'express';
import morgan from 'morgan';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { router as libroRouter } from './libros/index.js';
import { router as prestamoRouter } from './prestamos/index.js';

const app = express();

// Linea que hace que el codigo detecte la carpeta public
app.use(express.static(`${dirname(fileURLToPath(import.meta.url))}/public`));

// Configuro Morgan para que cree el archivo de logs
app.use(morgan('common', { immediate: true }));

//este middleware es para procesar formularios
//que vienen en el body de la petición
//al final tendremos un objeto request.body
//con los datos del formulario parseados
app.use(express.urlencoded({ extended: false }));

// Rutas
app.use('/', libroRouter);
app.use('/prestamo', prestamoRouter);

//Voy a inicio
app.get('/', (req, res) => res.redirect('/libros'));

app.listen(8080, () => {
  console.log('Servidor escuchando en--> http://localhost:8080');
});

export default app;
