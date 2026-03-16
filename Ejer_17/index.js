//Configuro el morgan
//Añado la linea para que detecte la carpeta public y poder usarla desde el resto de las vistas
import express from 'express';
import morgan from 'morgan';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { router as albumRouter } from './album/index.js';
import { router as artistaRouter } from './artista/index.js';

const app = express();

// Linea que hace que el codigo detecte la carpeta public
app.use(express.static(`${dirname(fileURLToPath(import.meta.url))}/public`));

// Usando morgan registro todas la peticiones
app.use(morgan('common', { immediate: true }));

//este middleware es para procesar formularios
//que vienen en el body de la petición
//al final tendremos un objeto request.body
//con los datos del formulario parseados
app.use(express.urlencoded({ extended: false }));

// rutas principales de la app
app.use('/album', albumRouter);
app.use('/artista', artistaRouter);

// Cuando entramos en / nos redirige a la lista de albunes
app.get('/', (request, response) => response.redirect('/album'));

app.listen(8080, () => {
  console.log('Servidor escuchando en http://localhost:8080');
});
