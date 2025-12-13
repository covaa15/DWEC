import { cargarDatos } from '../funciones/funciones.js'

let listaCategorias = new Map();
let listaMarcas = new Map();
let productos = [];
let botonesAgregar;
const SeccionCategorias = document.querySelector('#categorias');
const SeccionMarcas = document.querySelector('#marcas');
const contenedorProductos = document.querySelector("#contenedorProductos");
const ventanaModalProductos = document.getElementById("modalProducto");

// Cargar categorías y marcas
cargarDatos("./datos/marcas.json", listaMarcas, SeccionMarcas);
cargarDatos("./datos/categorias.json", listaCategorias, SeccionCategorias);

// Cargar productos
cargarProductos("./datos/productos.json");

//Funcion que carga el JSON de Productos
function cargarProductos(ruta) {
    fetch(ruta)
        .then(res => res.json())
        .then(data => {
            productos = data;
            mostrarProductos(productos);
        })
        .catch(error => console.log("Error al cargar productos:", error));

}
/*Esta funcion se encarga de recorrer los productos y crear 
las tarjetas con los productos */
function mostrarProductos(productos) {
    contenedorProductos.innerHTML = "";

    productos.forEach(producto => {

        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
        <div class="imagen">
            <img src="${producto.imagen}" alt="${producto.nombre}">
        </div>
        <h2>${producto.nombre}</h2>
        <p><strong>Marca:</strong> ${listaMarcas.get(producto.marca_id)}</p>
        <p><strong>Stock:</strong> ${producto.stock}</p>
        <p class="precio"><strong>$${producto.precio}</strong></p>
        <button class="botonCaracteristicas">VER CARACTERÍSTICAS</button>
        <button class="botonAgregar">AGREGAR AL CARRITO</button>
    `;

        card.dataset.id = producto.id;
        contenedorProductos.appendChild(card);
    });

    controlVentanaModal(productos);

    botonesAgregar = document.querySelectorAll('.botonAgregar');

    /*Cuando se pulsa el boton de agregar, si el usuario tiene la sesion iniciada
    agrega el producto al carrito, en el caso contrario muestra un mensaje de que 
    tiene que iniciar sesion para agregar el producto al carrito*/
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", (e) => {
            if (!usuarioLogueado) {
                alert("Debes iniciar sesión para agregar productos al carrito.");
                return;
            }

            const card = e.target.closest(".card");
            const idProducto = parseInt(card.dataset.id);
            const producto = productos.find(producto => producto.id === idProducto);

            agregarAlCarrito(producto);
        });
    });
}

//Esta funcion carga la informacion del coche en la ventana de las caracteristicas
function cargarProductoEnModal(producto) {
    document.getElementById("modalImagen").src = producto.imagen;
    document.getElementById("modalNombre").textContent = producto.nombre;
    document.getElementById("modalDescripcion").textContent = producto.descripcion;
    document.getElementById("modalMarca").textContent = listaMarcas.get(producto.marca_id);
    document.getElementById("modalCategoria").textContent = listaCategorias.get(producto.categoria_id);
    document.getElementById("modalPrecio").textContent = producto.precio + "$";

    const lista = document.getElementById("caracteristicas");
    lista.innerHTML = "";

    Object.entries(producto.caracteristicas).forEach(([clave, valor]) => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${clave}:</strong> ${valor}`;
        lista.appendChild(li);
    });
}

//Esta función controla la ventana modal de ver caracteristicas
function controlVentanaModal(productos) {

    const botonesVerCaracteristicas = document.querySelectorAll('.botonCaracteristicas');

    botonesVerCaracteristicas.forEach(boton => {
        boton.addEventListener("click", (e) => {

            const card = e.target.closest(".card");
            const idProducto = parseInt(card.dataset.id);

            const productoSeleccionado = productos.find(producto => producto.id === idProducto);

            if (productoSeleccionado) {
                cargarProductoEnModal(productoSeleccionado);
                ventanaModalProductos.classList.add("activo");
            }
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

// Obtengo los elementos del panel de usuario
const panelUsuario = document.getElementById("panelUsuario");
const panelNombre = document.getElementById("panelNombre");
const panelEmail = document.getElementById("panelEmail");
const btnEditarPerfil = document.getElementById("btnEditarPerfil");
const btnCerrarSesionPanel = document.getElementById("btnCerrarSesionPanel");

// Obtengo los elementos del modal para editar perfil
const perfilNombre = document.getElementById("perfilNombre");
const perfilApellidos = document.getElementById("perfilApellidos");
const perfilEmail = document.getElementById("perfilEmail");
const perfilTelefono = document.getElementById("perfilTelefono");
const btnGuardarPerfil = document.getElementById("btnGuardarPerfil");


let usuarioLogueado = false;

/*Cuando pulso el boton, comprueba el estado del usuario.Si este tiene la
sesion inicada muestra la ventana con los datos de esta, en el caso de no estar
logueado se le muestra la ventana para que se loguee */
btnUsuario.addEventListener("click", () => {
    if (!usuarioLogueado) {

        inputEmail.value = "";
        inputPassword.value = "";

        modalLogin.classList.remove("oculto");
    } else {
        panelNombre.textContent = usuarioActivo.nombre + " " + usuarioActivo.apellidos;
        panelEmail.textContent = usuarioActivo.email;
        panelUsuario.classList.toggle("oculto");
    }
});


// Este boton me muestra el carrito
btnCarrito.addEventListener("click", () => {
    modalCarrito.classList.remove("oculto");
});


// El icono que cierra las ventanas modales
document.querySelectorAll(".cerrarIcon").forEach(boton => {
    boton.addEventListener("click", () => {
        boton.parentElement.parentElement.classList.add("oculto");
    });
});


// Inputs y botón del login
const inputEmail = document.getElementById("loginEmail");
const inputPassword = document.getElementById("loginPassword");
const btnIniciarSesion = document.getElementById("btnIniciarSesion");


// Cargar usuario si ya estaba logueado
let usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

if (usuarioActivo) {
    usuarioLogueado = true;
    btnCarrito.classList.remove("oculto");
}


// Función que carga los datos en el perfil
function cargarPerfilEnFormulario(usuario) {
    perfilNombre.value = usuario.nombre;
    perfilApellidos.value = usuario.apellidos;
    perfilEmail.value = usuario.email;
    perfilTelefono.value = usuario.telefono;
}


/*Cuando pulso el boron de iniciar sesión, cargo los usuarios del 
archivo json y comparo que el email y la contraseña que yo introduzco
coincidan con las del json.En el caso de que si, inicio sesion y almaceno
la sesion activa en el localstorage y me muestra un mensaje de que inicie 
sesion, en le caso de que no coincidan las credenciales que yo meti con las
del json me muestra un mensaje */
btnIniciarSesion.addEventListener("click", () => {
    const email = inputEmail.value.trim();
    const password = inputPassword.value.trim();

    fetch("./datos/usuarios.json")
        .then(res => res.json())
        .then(listaUsuarios => {

            const usuarioEncontrado = listaUsuarios.find(
                user => user.email === email && user.password === password
            );

            if (!usuarioEncontrado) {
                alert("Email o contraseña incorrectos");
                return;
            }

            usuarioActivo = usuarioEncontrado;
            localStorage.setItem("usuarioActivo", JSON.stringify(usuarioActivo));

            usuarioLogueado = true;
            btnCarrito.classList.remove("oculto");

            cargarPerfilEnFormulario(usuarioActivo);

            modalLogin.classList.add("oculto");

            alert("Inicio de sesión exitoso");
        })
        .catch(err => console.log("Error cargando usuarios:", err));
});


/*Cunado pulso este boton se abre la ventana modal, donde se puede ver
el perfil del usuario que tiene la sesion iniciada en este momento */
btnEditarPerfil.addEventListener("click", () => {
    cargarPerfilEnFormulario(usuarioActivo);
    modalPerfil.classList.remove("oculto");
    panelUsuario.classList.add("oculto");
});


/* Cuando pulso este boton, compruebo que los datos son validos,
en el caso, de que lo sea almaceno en el localStorage la nueva información
para este usuario.
En el caso de que no sean validos muestro un mensaje indicandolo*/
btnGuardarPerfil.addEventListener("click", () => {

    const nombre = perfilNombre.value.trim();
    const apellidos = perfilApellidos.value.trim();
    const email = perfilEmail.value.trim();
    const telefono = perfilTelefono.value.trim();

    if (nombre === "" || apellidos === "" || email === "" || telefono === "") {
        alert("Todos los campos son obligatorios");
        return;
    }

    usuarioActivo.nombre = nombre;
    usuarioActivo.apellidos = apellidos;
    usuarioActivo.email = email;
    usuarioActivo.telefono = telefono;

    localStorage.setItem("usuarioActivo", JSON.stringify(usuarioActivo));

    modalPerfil.classList.add("oculto");

    alert("Datos actualizados correctamente");
});


/*Cuando pulso este boton,lo que hago es cerrar la sesion del usario,
para ello, elimino el usuario activo del localStorage y oculto la ventana
modal*/
btnCerrarSesionPanel.addEventListener("click", () => {
    usuarioActivo = null;
    usuarioLogueado = false;
    localStorage.removeItem("usuarioActivo");

    panelUsuario.classList.add("oculto");
    btnCarrito.classList.add("oculto");

    alert("Sesión cerrada correctamente");
});


// Obtener elementos de filtros
const selectCategorias = document.getElementById('categorias');
const selectMarcas = document.getElementById('marcas');
const inputBuscador = document.getElementById('buscador');

// Escuchar cambios en los selects
selectCategorias.addEventListener('change', aplicarFiltros);
selectMarcas.addEventListener('change', aplicarFiltros);
inputBuscador.addEventListener('input', aplicarFiltros);

/*Esta función se encarga de aplicar los diretes filtros
a la lista de priductos, mostrando unicamente por pantalla
los que coincidan con los filtros indicados.
En el caso de que no exista  */
function aplicarFiltros() {
    contenedorProductos.style.display = "grid";
    const textoBuscado = inputBuscador.value.trim().toLowerCase();
    let productosFiltrados = productos;

    // Filtro por la categoría del coche
    const categoriaSeleccionada = parseInt(selectCategorias.value);
    if (!isNaN(categoriaSeleccionada)) {
        productosFiltrados = productosFiltrados.filter(producto =>
            producto.categoria_id === categoriaSeleccionada
        );
    }

    // Filtro por la marca del coche
    const marcaSeleccionada = parseInt(selectMarcas.value);
    if (!isNaN(marcaSeleccionada)) {
        productosFiltrados = productosFiltrados.filter(producto =>
            producto.marca_id === marcaSeleccionada
        );
    }

    // Filtro por nombre del coche
    if (textoBuscado !== "") {
        productosFiltrados = productosFiltrados.filter(producto =>
            producto.nombre.toLowerCase().includes(textoBuscado)
        );
    }

    // Cuando no hay resultados muestro un mensaje
    if (productosFiltrados.length === 0) {
        contenedorProductos.innerHTML = `<p class="noProductos">No se encontraron coches.</p>`;
        contenedorProductos.style.display = "block";
        return;
    }

    mostrarProductos(productosFiltrados);
}

/*Dependiendo el elemento que este cambiando, llamo al metodo aplicarFiltros,
para que filtre de acuerdo a lo que seleccione o escriba en el buscador */
selectCategorias.addEventListener("change", aplicarFiltros);
selectMarcas.addEventListener("change", aplicarFiltros);
buscador.addEventListener("input", aplicarFiltros);



let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

/* Cuando llamos a esta funcion lo que hago es almacenar en el 
localStorage los productos que tengo en el carrito*/
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}
/*Con esta función lo qeu hago es añadir los productos al carrito.Para ello,
lo primero que hago es comprobar que el producto no este ya añadido al carrito.
Si el producto ya esta añadido al carrito y pulso este boton lo que hace es incrementar
en uno la cantidad de este producto en el carrito. En el caso de que el producto no este
en el carrito lo que hace es añadirlo con una cantidad de 1*/
function agregarAlCarrito(productoAAñadir) {
    const item = carrito.find(producto => producto.id === productoAAñadir.id);

    if (item) {
        if (item.cantidad < productoAAñadir.stock) {
            item.cantidad++;
        } else {
            alert("Stock máximo alcanzado");
        }
    } else {
        carrito.push({
            id: productoAAñadir.id,
            nombre: productoAAñadir.nombre,
            imagen: productoAAñadir.imagen,
            precio: productoAAñadir.precio,
            stock: productoAAñadir.stock,
            cantidad: 1
        });
    }

    guardarCarrito();
    alert("Producto Añadido");
    actualizarVentanaCarrito();
}

//Cuando pulso este boton lo que hago es mostrar la ventana del carrito con sus datos
btnCarrito.addEventListener("click", () => {
    modalCarrito.classList.remove("oculto");
    actualizarVentanaCarrito();
});

/*Esta funcion lo que hace es cargar en la venyana del carrito los productos si hay.
En el caso de que no existan productos en el carrito va a mostar un mensaje indicando que
el carrito esta vacio */
function actualizarVentanaCarrito() {
    const lista = document.getElementById("carritoLista");
    const titulo = document.querySelector(".carrito");
    const totalTxt = document.querySelector(".total");

    lista.innerHTML = "";

    if (carrito.length === 0) {
        titulo.textContent = "El carrito está vacío";
        totalTxt.textContent = "Total pagar: $0";
        return;
    }

    titulo.textContent = "Carrito de compra";

    let total = 0;

    carrito.forEach(item => {
        total += item.precio * item.cantidad;

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><img src="${item.imagen}" class="imgCarrito"></td>
            <td>${item.nombre}</td>
            <td>$${item.precio}</td>
            <td>
                <button class="btnMenos" data-id="${item.id}">-</button>
                <span>${item.cantidad}</span>
                <button class="btnMas" data-id="${item.id}">+</button>
                <button class="btnEliminar" data-id="${item.id}">x</button>
            </td>
        `;
        lista.appendChild(tr);
    });

    totalTxt.textContent = `Total pagar: $${total}`;

    activarBotonesCarrito();
}

/*Esta funcion lo que hace es obtener los botones de + y - del carrito
y cuando los pulso dependiendo cual presion incrementar o decrementar la 
cantidad del producto en el carrito.
La cantidad no va a superar nunca el máximo del stock, ya que cuando se 
alcanza el maximo se va a mostar un boton indicandolo, ademas de que no se va
a llevar a cabo el incremento.
Cuandoen el carrito se reduce a 0 la cantidad de un producto este se va a eliminar 
del carrito*/
function activarBotonesCarrito() {

    document.querySelectorAll(".btnMas").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = parseInt(btn.dataset.id);
            const item = carrito.find(producto => producto.id === id);

            if (item.cantidad < item.stock) {
                item.cantidad++;
            } else {
                alert("Stock máximo alcanzado");
            }

            guardarCarrito();
            actualizarVentanaCarrito();
        });
    });

    document.querySelectorAll(".btnMenos").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = parseInt(btn.dataset.id);
            const item = carrito.find(p => p.id === id);

            item.cantidad--;

            if (item.cantidad === 0) {
                carrito = carrito.filter(p => p.id !== id);
            }

            guardarCarrito();
            actualizarVentanaCarrito();
        });
    });

    document.querySelectorAll(".btnEliminar").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = parseInt(btn.dataset.id);
            carrito = carrito.filter(producto => producto.id !== id);

            guardarCarrito();
            actualizarVentanaCarrito();
        });
    });
}

// Cuando pulso este boton lo que hago es vaciar el carrito
document.querySelector(".vaciarCarrito").addEventListener("click", () => {
    carrito = [];
    guardarCarrito();
    actualizarVentanaCarrito();
});


/*Cuando pulso el boton de Realizar Compra, primero compruebo si el carrito esta
vacio .En el caso de que lo este, muestro un mensaje indicandolo y en el caso contrario
lo que hago es vaciar el carrito ya que la compra se lleva a cabo y reduzco el stock de 
ese producto de acuerdo a la cantidad que se esta comprando */
document.querySelector(".realizarCompra").addEventListener("click", () => {
    if (carrito.length === 0) {
        alert("El carrito está vacío");
        return;
    }

    // Resto el  stock a los productos comprados
    carrito.forEach(item => {
        // Busco el producto en la lista original
        const producto = productos.find(producto => producto.id === item.id);

        if (producto) {
            producto.stock -= item.cantidad;
            if (producto.stock < 0) producto.stock = 0;
        }
    });

    // Vacio el carrito
    carrito = [];
    guardarCarrito();

    // Actualizo la ventana del carrito
    actualizarVentanaCarrito();

    // Actualizo las tarjetas de los productos con el nuevo stock despues de hacer la compra
    mostrarProductos(productos);

    alert("Compra realizada con éxito");
});

