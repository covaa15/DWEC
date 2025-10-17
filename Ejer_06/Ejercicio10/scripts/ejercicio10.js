// Creo el array carrito vacio
const miCarrito = [];

//Selecciono los botones y elementos donde voy a mostrar el total y la lista
const botonesAgregar = document.querySelectorAll('.boton');
const listaDelCarrito = document.getElementById('lista-carrito');
const elementoTotal = document.getElementById('total');

// Recorro todos los botones y obtengo en cual se hizo el click
botonesAgregar.forEach(boton => {
    boton.addEventListener('click', () => {
        // Obtengo la informacion dle producto a agregar
        const tarjetaProducto = boton.parentElement;
        const nombreProducto = tarjetaProducto.querySelector('.nombre').textContent;
        const precioProducto = parseFloat(tarjetaProducto.querySelector('.precio span').textContent);

        // Compruebo si el producto ya esta en el carrito
        const productoExistente = miCarrito.find(item => item.nombre === nombreProducto);

        if (productoExistente) {
            // Si existe en el carrito aumento al cantidad
            productoExistente.cantidad++;
        } else {
            // Si no existe añadimos el nuevo articulo
            miCarrito.push({ nombre: nombreProducto, precio: precioProducto, cantidad: 1 });
        }

        // Actualizar la lista del carrito y el total en pantalla
        mostrarCarrito();
        actualizarTotal();
    });
});

//Función para mostrar los productos en el carrito
function mostrarCarrito() {
    // vacio la lista
    listaDelCarrito.innerHTML = '';

    // Recorro los productos del carrito los agrgo a ala lista
    miCarrito.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.nombre} (x${item.cantidad}) - ${item.precio * item.cantidad} €`;
        listaDelCarrito.appendChild(li);
    });
}

// Función para calcular y mostrar el total del carrito
function actualizarTotal() {
    const totalCarrito = miCarrito.reduce((acum, item) => acum + item.precio * item.cantidad, 0);
    elementoTotal.textContent = totalCarrito.toFixed(2);
}
