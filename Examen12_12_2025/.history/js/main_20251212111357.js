// js/main.js
let artistas = [];
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
console