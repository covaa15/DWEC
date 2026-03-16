//Datos con los que se parte
let datos = [
    {
      id: 1,
      nombre: 'Queen',
      pais: 'Reino Unido',
      genero: 'Rock',
      fecha_formacion: 1970,
      foto: 'https://picsum.photos/id/10/150/150',
    },
  ];
  
 // Esta funcion genera un nuvo id automatico
  function getNextId() {
  
    return Math.max(...datos.map((artista) => artista.id)) + 1;
  
  }
  
   // Esta funcion inserta un nuevo artista
  function insertar(artista) {
  
    artista.id = getNextId();
  
    datos.push(artista);
  
  }
  
  // Esta funcion actualiza un artista ya existente
  function actualizar(artista) {
  
    artista.id = parseInt(artista.id, 10);
  
    const index = datos.findIndex((artista) => artista.id === artista.id);
  
    datos[index] = artista;
  
  }
  
  // Esta funcion me obtiene todos los artistas
  export function getAll() {
  
    return Promise.resolve(datos);
  
  }
  
// Esta funcion me devuleve un artista a partir de su id
  export function get(id) {
  
    return Promise.resolve(datos.find((artista) => artista.id === id));
  
  }
  
  //Esta funcion me elimina un album a parti de su id
  export function remove(id) {
  
    datos = datos.filter((artista) => artista.id !== id);
  
    return Promise.resolve();
  
  }
  

   /*Esta funcion guarda el artista, el el caso de que no exista
  lo inserta  y en el caso de que exista actualiza su indformacion*/
  export function save(artista) {
  
    if (artista.id === '') {
  
      insertar(artista);
  
    } else {
  
      actualizar(artista);
  
    }
  
    return Promise.resolve();
  }
  