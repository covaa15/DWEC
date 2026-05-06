// Configuro express y morgan
import express from 'express';
import session from 'express-session';

import { router as usersRouter } from './users/index.js';
import { router as projectsRouter } from './projects/index.js';
import { router as linksRouter } from './social_links/index.js';

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

// Configuro sesiones
app.use(session({
  secret: 'secreto',
  resave: false,
  saveUninitialized: false
}));

// Rutas
app.use('/', usersRouter);
app.use('/', projectsRouter);
app.use('/', linksRouter);

// Redirijo al login
app.get('/', (req, res) => res.redirect('/login'));

app.listen(8080, () => {
  console.log('Servidor en http://localhost:8080');
});

export default app;
