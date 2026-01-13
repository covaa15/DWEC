const boton = document.querySelector("#buscar");
boton.disabled = true;
const email = document.querySelector('#email');
const divMensaje = document.querySelector('#mensaje');
const fDatosUsuario = document.querySelector("#datosUsuario");

let usuarios = [];
let pedidos = [];

cargarUsuarios("./data/usuarios.json");

//Función para cargar los usuarios
async function cargarUsuarios(ruta) {

    await fetch(ruta)
        .then((respuesta) => {
            return respuesta.json();
        }).then((datos) => {
            usuarios = datos;
            boton.disabled = false;
        })
        .catch((error) => {
            console.log(error);
        })
}

//Función para cargar los pedidos
async function cargarPedidos(ruta, usuarioCorreo) {

    await fetch(ruta)
        .then((respuesta) => {
            return respuesta.json();
        }).then((datos) => {
            pedidos = datos;
            obtenerPedidosUsuario(pedidos, usuarioCorreo);
        })
        .catch((error) => {
            console.log(error);
        })
}

/*Cuando pulso el boton de enviar, obtiene el email que hay en el input y
comprueba si coincide con alguno de los del json.En el caso negativo, muestra
un mensaje indicandolo.En el caso de que exista, obtiene los pedidos para ese usuario */
boton.addEventListener('click', (event) => {
    event.preventDefault();
    divMensaje.innerHTML = "";
    fDatosUsuario.innerHTML = "";


    let usuarioCorreo = usuarios.find((usuario) => {

        if (usuario.email === email.value)
            return usuario;
    });

    if (usuarioCorreo) {
        cargarPedidos("./data/pedidos.json", usuarioCorreo);
    } else {
        const p = document.createElement('p');
        p.textContent = "Usuario no encontrado";
        divMensaje.appendChild(p);
        fDatosUsuario.hidden = true;
    }
});


//Funcion que obtiene los pedidos del usuario
function obtenerPedidosUsuario(pedidos, usuario) {

    let pedidosUsuario = pedidos.filter((pedido) => {
        if (pedido.usuarioId === usuario.id)
            return pedido;
    })
    verDatosUsuario(pedidosUsuario, usuario);
}

//Funcion para crear div
function crearDiv() {
    const div = document.createElement('div');
    return div;
}

//Funcion para crear parrafos
function crearP(texto, div) {
    const p = document.createElement('p');
    p.textContent = texto;
    div.appendChild(p);
}
//Funcion para crear h1
function crearH1(texto, div) {
    const h1 = document.createElement('h1');
    h1.textContent = texto;
    div.appendChild(h1);
}
//Funcion para crear h2
function crearH2(texto, div) {
    const h2 = document.createElement('h2');
    h2.textContent = texto;
    div.appendChild(h2);
}
//Función para crear hr
function crearHr(div) {
    const Hr = document.createElement('hr');
    div.appendChild(Hr);

}

//Funcion para ver los datos de los usuarios
function verDatosUsuario(pedidosUsuario, usuario) {
    fDatosUsuario.innerHTML = "";
    fDatosUsuario.hidden = false;

    let div = crearDiv();
    crearH1("Usuarios", div);
    crearP("Nombre Usuario: " + usuario.nombre, div);
    crearP("Fecha Registro: " + usuario.fechaRegistro, div);
    fDatosUsuario.appendChild(div);
    crearHr(div);

    let div2 = crearDiv();
    crearH1("Pedidos", div);
    console.log(pedidosUsuario);
    if (pedidosUsuario.length > 0) {
        let i = 0;
        pedidosUsuario.map((pedido) => {
            i++;
            crearH2("Pedido " + i, div2);
            crearP("Id Pedido: " + pedido.id, div2);
            crearP("Fecha Pedido: " + pedido.fecha, div2);
            crearP("Estado Pedido: " + pedido.estado, div2)
            crearHr(div2);
        });

    } else {
        crearP("Este usuario no tiene pedidos Registrados", div2);
    }
    fDatosUsuario.appendChild(div2);

}
