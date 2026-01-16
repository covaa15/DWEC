let usuarios = [], productos = [], pedidos = [], select;
let contenedorPadre = document.querySelector("#padre");


//Funcion que se encarga de cargar los datos de los json
async function cargarDatos() {
    document.body.innerHTML = "";
    let cargando = document.createElement("p");
    cargando.innerText = "Cargando datos del maestros";
    document.body.appendChild(cargando);
    try {
        const [respuesta1, respuesta2, respuesta3] = await Promise.all([
            fetch("./data/usuarios.json"),
            fetch("./data/productos.json"),
            fetch("./data/pedidos.json")
        ]);
        usuarios = await respuesta1.json();
        productos = await respuesta2.json();
        pedidos = await respuesta3.json();
        setTimeout(() => {
            cargando.remove();
            select = crearSelect();
            añadirOpcionesSelect(select);
        }, 1000);
    } catch (error) {
        console.log(error);
    }
}

await cargarDatos();




//Funcion para añadir las opciones al Select
function añadirOpcionesSelect(select) {
    crearOpcionesSelect(select, "todas", "Selecciona un Usuario");
    usuarios.map((usuario) => {
        crearOpcionesSelect(select, usuario.id, usuario.nombre);
    });
}

//Cuando el select cambia se cargar los pedidos de dicho usuario
select.addEventListener('change', function () {

    if (select.selectedIndex !== 0) {

        cargarDatosPedidoUsuario(this.value);
    }

});




function cargarDatosPedidoUsuario(idUsuario) {


    let usuarioSeleccionado = usuarios.filter((usuario) => {
        if (usuario.id === idUsuario)
            return usuario
    });

    console.log(usuarioSeleccionado.length);

    let fieldsetDatosUsuario = crearFieldset();
    crearH2(fieldsetDatosUsuario, "Datos Usuario");

    crearP(fieldsetDatosUsuario, `Nombre: ${usuarioSeleccionado.nombre}`);
    crearP(fieldsetDatosUsuario, `Email: ${usuarioSeleccionado.email}`);
    crearP(fieldsetDatosUsuario, `Fecha Registro: ${usuarioSeleccionado.fechaRegistro}`);


}


//Función que crea el select
function crearSelect() {
    const select = document.createElement('select');
    document.body.appendChild(select);
    return select;
}

//Funcion que crea las opciones del select
function crearOpcionesSelect(select, id, texto) {
    const opcion = document.createElement("option");
    opcion.textContent = texto;
    opcion.value = id;
    select.appendChild(opcion);
}

//Función que crea el fielset
function crearFieldset() {
    const fieldset = document.createElement('fieldset');
    document.body.appendChild(fieldset);
    return fieldset;
}

//Funcion que crea los h2
function crearH2(fieldset, texto) {
    const h2 = document.createElement('h2');
    h2.textContent = texto;
    fieldset.appendChild(h2);
}

//Función que crea los p
function crearP(fieldset, texto) {
    const p = document.createElement('p');
    p.textContent = texto;
    fieldset.appendChild(p);
}

