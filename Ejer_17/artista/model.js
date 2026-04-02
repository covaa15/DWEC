import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Cargo el JSON manualmente
let datos = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/artistas.json'), 'utf-8'));

// Esta funcion devuelve el siguiente id disponible
function getNextId() {
  return datos.length ? Math.max(...datos.map((artista) => artista.id)) + 1 : 1;
}

// Esta funcion inserta un nuevo artista
function insertar(artista) {
  artista.id = getNextId();
  datos.push(artista);
}

// Esta funcion actualiza un artista ya existente
function actualizar(artista) {
  artista.id = parseInt(artista.id, 10);
  const index = datos.findIndex((a) => a.id === artista.id);
  datos[index] = artista;
}

// Esta funcion obtiene todos los artistas
export function getAll() {
  return Promise.resolve(datos);
}

// Esta funcion devuelve un artista por su id
export function get(id) {
  return Promise.resolve(datos.find((artista) => artista.id === id));
}

// Esta funcion elimina un artista por su id
export function remove(id) {
  datos = datos.filter((artista) => artista.id !== id);
  return Promise.resolve();
}

// Esta funcion guarda el artista 
export function save(artista) {
  if (artista.id === '') {
    insertar(artista);
  } else {
    actualizar(artista);
  }
  return Promise.resolve();
}
