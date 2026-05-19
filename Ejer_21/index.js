import express from 'express';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import dotenv from 'dotenv';
import { conexionBD } from './db.js';
import { subirImagen, eliminarImagen, obtenerImagen } from './filebase.js';

// Cargo las variables del .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configuro multer para guardar el archivo en memoria 
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const valido = /jpeg|jpg|png|gif|webp/.test(file.mimetype);
    valido ? cb(null, true) : cb(new Error('Solo se permiten imagenes'));
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Obtengo la imagen del bucket y la muestri
app.get('/imagen/:nombre', async (req, res) => {
  try {
    const data = await obtenerImagen(req.params.nombre);
    res.setHeader('Content-Type', data.ContentType || 'application/octet-stream');
    data.Body.pipe(res);
  } catch (err) {
    res.status(404).json({ error: 'Imagen no encontrada' });
  }
});

// Obtengo todos los alumnos de la BD
app.get('/alumnos', async (req, res) => {
  try {
    const [rows] = await conexionBD.query('SELECT * FROM alumno ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los alumnos' });
  }
});

// Recibo los datos del formulario.Una vez que los tengo: subo la imagen a Filebase y guardo el alumno en la BD
app.post('/alumnos', upload.single('imagen'), async (req, res) => {
  try {
    const { nombre, apellidos, localidad } = req.body;

    if (!nombre || !apellidos)
      return res.status(400).json({ error: 'Nombre y apellidos son obligatorios' });

    let nombreImagen = null;

    if (req.file) {
      // Renombro la imagen con UUID para que no haya duplicados
      const ext = path.extname(req.file.originalname).toLowerCase();
      nombreImagen = `${uuidv4()}${ext}`;
      await subirImagen(nombreImagen, req.file.buffer, req.file.mimetype);
    }

    // Guardo el alumno en la base de datos
    const [resultado] = await conexionBD.query(
      'INSERT INTO alumno (nombre, apellidos, localidad, imagen) VALUES (?, ?, ?, ?)',
      [nombre, apellidos, localidad || null, nombreImagen]
    );

    res.status(201).json({
      id: resultado.insertId,
      nombre, apellidos,
      localidad: localidad || null,
      imagen: nombreImagen
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear el alumno' });
  }
});

// Elimino el alumno de la BD y su imagen del bucket
app.delete('/alumnos/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Busco al alumno para saber que imagen tiene antes de borrarlo
    const [rows] = await conexionBD.query('SELECT imagen FROM alumno WHERE id = ?', [id]);
    if (rows.length === 0)
      return res.status(404).json({ error: 'Alumno no encontrado' });

    const nombreImagen = rows[0].imagen;

    // Borro el alumno de la base de datos
    await conexionBD.query('DELETE FROM alumno WHERE id = ?', [id]);

    // Compruebo si tiene imagen y la borro tambien del bucket
    if (nombreImagen) {
      await eliminarImagen(nombreImagen);
    }

    res.json({ mensaje: 'Alumno eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar el alumno' });
  }
});

app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));