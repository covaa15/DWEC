// js/main.js
let artistas = [];
let horarios = [];
let escenarios = []

//Cargo los artistas
cargarArtistas("./data/artistas.json");
cargarEscenarios("./data/escenarios.json");
cargarArtistas("./data/artistas.json");
function cargarArtistas(ruta) {
    fetch(ruta)
        .then(res => res.json())
        .then(data => {
            artistas = data;
            //mostrarProductos(productos);
        })
        .catch(error => console.log("Error al cargar productos:", error));

}

function cargarEscenarios(ruta) {
    fetch(ruta)
        .then(res => res.json())
        .then(data => {
            escenarios = data;
            //mostrarProductos(productos);
        })
        .catch(error => console.log("Error al cargar productos:", error));

}
function cargarHorarios(ruta) {
    fetch(ruta)
        .then(res => res.json())
        .then(data => {
            horarios = data;
            //mostrarProductos(productos);
        })
        .catch(error => console.log("Error al cargar productos:", error));

}