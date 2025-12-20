// js/main.js
let artistas = [];
cargarProductos("./datos/productos.json");
function cargarProductos(ruta) {
    fetch(ruta)
        .then(res => res.json())
        .then(data => {
            artistas = data;
           //mostrarProductos(productos);
        })
        .catch(error => console.log("Error al cargar productos:", error));

}