//Datos con los que se parte
let datos = [
    {
      id: 1,
      titulo: 'A Night at the Opera',
      anio: '1975',
      artistaId: 1,
      foto: 'https://picsum.photos/id/100/150/150',
    },
  ];
  
  
  // Esta funcion genera un nuvo id automatico
  function getNextId() {
  
    return Math.max(...datos.map((album) => album.id)) + 1;
  
  }
  
  
  // Esta funcion inserta un nuevo albumy
  function insertar(album) {
  
    album.id = getNextId();
    datos.push(album);
  
  }
  
  
  // Esta funcion actualiza un album ya existente
  function actualizar(album) {
  
    album.id = parseInt(album.id, 10);
    const index = datos.findIndex((a) => a.id === album.id);
    datos[index] = album;
  
  }
  
  
  // Esta funcion me obtiene todos los albumes
  export function getAll() {
  
    return Promise.resolve(datos);
  
  }
  
  
  // Esta funcion me devuleve un album a partir de su id
  export function get(id) {
  
    return Promise.resolve(datos.find((album) => album.id === id));
  
  }
  
  
  //Esta funcion me elimina un album a parti de su id
  export function remove(id) {
  
    datos = datos.filter((album) => album.id !== id);
  
    return Promise.resolve();
  
  }
  
  
  /*Esta funcion guarda el album, el el caso de que no exista
  lo inserta  y en el caso de que exista actualiza su indformacion*/
  export function save(album) {
  
    if (album.id === '') {
  
      insertar(album);
  
    } else {
  
      actualizar(album);
  
    }
  
    return Promise.resolve();
  }
  