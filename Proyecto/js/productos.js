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
        .then(data => {
            productos = data;  
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

        card.dataset.id = producto.id;

        contenedorProductos.appendChild(card);
    });


    controlVentanaModal(productos);

    const botonesAgregar = document.querySelectorAll('.botonAgregar');

    /*Cuando se pulsa el boton de agregar, si el usuario tiene la sesion iniciada
    agrega el producto al carrito, en el caso contrario muestra un mensaje de que 
    tiene que iniciar sesion para agregar el producto al carrito*/
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", () => {
            if (!usuarioLogueado) {
                alert("Debes iniciar sesión para agregar productos al carrito.");
                return;
            }

            alert("Producto agregado al carrito (lógica futura)");
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
    document.getElementById("modalPrecio").textContent = "$" + producto.precio;

    const lista = document.getElementById("modalCaracteristicas");
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

            const productoSeleccionado = productos.find(p => p.id === idProducto);

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


// Inicio de sesión
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


// Editar perfil
btnEditarPerfil.addEventListener("click", () => {
    cargarPerfilEnFormulario(usuarioActivo);
    modalPerfil.classList.remove("oculto");
    panelUsuario.classList.add("oculto");
});


// Guardar cambios
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


// Cerrar sesión
btnCerrarSesionPanel.addEventListener("click", () => {
    usuarioActivo = null;
    usuarioLogueado = false;
    localStorage.removeItem("usuarioActivo");

    panelUsuario.classList.add("oculto");
    btnCarrito.classList.add("oculto");

    alert("Sesión cerrada correctamente");
});


//FILTOS

// Obtener elementos de filtros
const selectCategorias = document.getElementById('categorias');
const selectMarcas = document.getElementById('marcas');
const inputBuscador = document.getElementById('buscador');

// Escuchar cambios en los selects
selectCategorias.addEventListener('change', aplicarFiltros);
selectMarcas.addEventListener('change', aplicarFiltros);
inputBuscador.addEventListener('input', aplicarFiltros);

// Función que aplica los filtros
// Función para filtrar productos según selects y buscador
function aplicarFiltros() {

    const textoBuscado = buscador.value.trim().toLowerCase();

    let productosFiltrados = productos;

    // Filtrar por buscador si hay texto
    if (textoBuscado !== "") {
        productosFiltrados = productosFiltrados.filter(p =>
            p.nombre.toLowerCase().startsWith(textoBuscado)
        );
    }

    // Mostrar los productos filtrados
    mostrarProductos(productosFiltrados);
}

// Escuchadores de cambio en selects y escritura en buscador
selectCategorias.addEventListener("change", aplicarFiltros);
selectMarcas.addEventListener("change", aplicarFiltros);
buscador.addEventListener("input", aplicarFiltros);

