let listaCategorias = new Map();
let listaMarcas = new Map();
let productos;

const SeccionCategorias = document.querySelector('#categorias');
const SeccionMarcas = document.querySelector('#marcas');
const contenedorProductos = document.querySelector("#contenedorProductos");

const ventanaModalProductos = document.getElementById("modalProducto");


// Cargar categorías y marcas
cargarDatos("./datos/marcas.json", listaMarcas, SeccionMarcas);
cargarDatos("./datos/categorias.json", listaCategorias, SeccionCategorias);

// Cargar productos
cargarProductos("./datos/productos.json");


//Carga los datos de los JSON
function cargarDatos(ruta, lista, seccion) {
    fetch(ruta)
        .then(resultados => resultados.json())
        .then(objetoJSON => {

            for (const dato of objetoJSON) {
                lista.set(dato.id, dato.nombre);
            }

            recorrerListas(lista, seccion);

        })
        .catch(error => {
            console.log("Error al cargar datos:", error);
        });
}


//Recorre las listas y agrega las opciones
function recorrerListas(lista, seccion) {
    lista.forEach((valor) => {
        const opcion = document.createElement('option');
        opcion.textContent = valor;
        seccion.appendChild(opcion);
    });
}


//Funcion que carga el JSON de Productos
function cargarProductos(ruta) {
    fetch(ruta)
        .then(res => res.json())
        .then(productos => {
            mostrarProductos(productos);
        })
        .catch(error => console.log("Error al cargar productos:", error));
}



/*Esta funcion se encarga de recorrer los productos y mostrarlos por pantalla */
function mostrarProductos(productos) {
    contenedorProductos.innerHTML = "";

    productos.forEach(producto => {

        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p><strong>Marca:</strong> ${listaMarcas.get(producto.marca_id)}</p>
            <p><strong>Stock:</strong> ${producto.stock}</p>
            <p class="precio">$${producto.precio}</p>
            <button class="botonCaracteristicas">Ver Características</button>
            <button class="botonAgregar">AGREGAR AL CARRITO</button>
        `;

        contenedorProductos.appendChild(card);
    });

    controlVentanaModal();
}


//Esta función controla la ventana modal de ver caracteristicas
function controlVentanaModal() {

    const botonesVerCaracteristicas = document.querySelectorAll('.botonCaracteristicas');

    botonesVerCaracteristicas.forEach(boton => {
        boton.addEventListener("click", () => {
            ventanaModalProductos.classList.add("activo");
        });
    });

    const cerrarIcon = document.querySelector('#cerrarModalIcon');
    const cerrarBtn = document.querySelector('#cerrarModalBtn');

    cerrarIcon.addEventListener("click", () => {
        ventanaModalProductos.classList.remove("activo");
    });

    cerrarBtn.addEventListener("click", () => {
        ventanaModalProductos.classList.remove("activo");
    });
}
//Obtengo los botones
const btnUsuario = document.getElementById("btnUsuario");
const btnCarrito = document.getElementById("btnCarrito");

//Obtenfo las ventanas modales
const modalLogin = document.getElementById("modalLogin");
const modalPerfil = document.getElementById("modalPerfil");
const modalCarrito = document.getElementById("modalCarrito");

let usuarioLogueado = false;

/* Cuando pulso este boton, comprueba si el usuario esta logeado o no
y dependiendo como se encuentre muestra una venta o otra*/

btnUsuario.addEventListener("click", () => {
    if (usuarioLogueado) {
        modalPerfil.classList.remove("oculto");
    } else {
        modalLogin.classList.remove("oculto");
    }
});

// Este boton me abre el carrito
btnCarrito.addEventListener("click", () => {
    modalCarrito.classList.remove("oculto");
});

// El icono que cierra las ventanas modales
document.querySelectorAll(".cerrarIcon").forEach(boton => {
    boton.addEventListener("click", () => {
        boton.parentElement.parentElement.classList.add("oculto");
    });
});
