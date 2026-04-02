import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Cargo el JSON manualmente
let datos = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/albumes.json'), 'utf-8'));

// Esta funcion devuelve el siguiente id disponible
function getNextId() {
  return datos.length ? Math.max(...datos.map((a) => a.id)) + 1 : 1;
}

// Funcion para insertar un nuevo album
function insertar(album) {
  album.id = getNextId();
  datos.push(album);
}

// Funcion para actualizar un album que ya existe
function actualizar(album) {
  album.id = parseInt(album.id, 10);
  const index = datos.findIndex((a) => a.id === album.id);
  datos[index] = album;
}

// Funcion para obtener todos los albumes
export function getAll() {
  return Promise.resolve(datos);
}

// Funcion para obtener un album por id
export function get(id) {
  return Promise.resolve(datos.find((a) => a.id === id));
}

// Funcion para eliminar un album por id
export function remove(id) {
  datos = datos.filter((a) => a.id !== id);
  return Promise.resolve();
}

// Funcion que guarda el album 
export function save(album) {
  if (album.id === '') {
    insertar(album);
  } else {
    actualizar(album);
  }
  return Promise.resolve();
}
