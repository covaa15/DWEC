import express from 'express';
import esquemaLibro from '../esquemas/esquemaLibro.js';
import { conectarMongo } from '../db.js';

const router = express.Router();


/** GET /api/libros: Obtener todos los libros.
* Añadir (misma ruta con parámetros para poder ordenar libros por 
título: GET /api/libros?sort=titulo: Ordenar libros por título. */
router.get('/', async (req, res) => {
  try {

    await conectarMongo();

    const { sort } = req.query;

    let query = esquemaLibro.find();

    if (sort === 'titulo') {
      query = query.sort({ titulo: 1 });
    }

    const libros = await query;

    res.json(libros);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// GET /api/libros/:id: Obtener un libro específico por su referencia.
router.get('/:id', async (req, res) => {
  try {

    await conectarMongo();

    let libro;
    if (req.params.id.length === 24) {

      libro = await esquemaLibro.findOne({
        _id: req.params.id
      });
    } else {
      libro = await esquemaLibro.findOne({
        referencia: req.params.id
      });
    }

    res.json(libro);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// POST /api/libros: Crear un nuevo libro. (Body: { "titulo": "...", "genero": "...", "anyoPublicacion": ..., "autor": "id_del_autor" })
router.post('/', async (req, res) => {
  try {

    await conectarMongo();

    const nuevoLibro = new esquemaLibro(req.body);

    await nuevoLibro.save();

    res.status(201).json(nuevoLibro);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// PUT /api/libros/:id: Actualizar un libro existente. (Body: { "genero": "Ciencia Ficción" })
router.put('/:id', async (req, res) => {
  try {

    await conectarMongo();

    const actualizado = await esquemaLibro.findOneAndUpdate(
      { referencia: req.params.id },
      req.body,
      { new: true }
    );

    res.json(actualizado);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// DELETE /api/libros/:id: Eliminar un libro.
router.delete('/:id', async (req, res) => {
  try {

    await conectarMongo();

    await esquemaLibro.findOneAndDelete({
      referencia: req.params.id
    });

    res.status(204).send();

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;