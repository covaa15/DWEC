const nombre = document.querySelector('#nombre');
const apellidos = document.querySelector('#apellidos');
const email = document.querySelector('#email');
const telefono = document.querySelector('#telefono');
const direccion = document.querySelector('#direccion');
const hobbies = document.querySelector('#hobbies');
const tema = document.querySelector('#tema');
const idioma = document.querySelector('#idioma');
const notificaciones = document.querySelector('#notificaciones');
const botonEditar = document.querySelector('#btnEditar');
const mensaje = document.querySelector('#mensaje'); 
let esEdicion = false; 

function cargarDatos() {
    let request = new XMLHttpRequest();
    request.onload = () => {
        if (request.status === 200) {
            let resultado = request.responseType === 'json' ? request.response : JSON.parse(request.responseText);

            // Datos personales
            nombre.value = resultado.personalInfo.firstName;
            apellidos.value = resultado.personalInfo.lastName;
            email.value = resultado.personalInfo.email;
            telefono.value = resultado.personalInfo.phone;

            // Dirección
            const address = resultado.address;
            direccion.value = `${address.street}, ${address.city}, ${address.zipCode}, ${address.country}`;

            // Preferencias
            tema.value = resultado.preferences.theme;
            idioma.value = resultado.preferences.language;
            notificaciones.checked = resultado.preferences.notifications;

            // Hobbies
            hobbies.value = resultado.hobbies.join("\n");

            // Deshabilitar campos al inicio
            desactivarCampos();
            botonEditar.textContent = "Editar";
            esEdicion = false;
        }
    };
    request.open('GET', './datos/user_data.json', true);
    request.responseType = 'json';
    request.setRequestHeader("Accept", 'application/json');
    request.send();
}

//Funcion para activar los campos
function activarCampos() {
    nombre.disabled = false;
    apellidos.disabled = false;
    email.disabled = false;
    telefono.disabled = false;
    direccion.disabled = false;
    hobbies.disabled = false;
    tema.disabled = false;
    idioma.disabled = false;
    notificaciones.disabled = false;
}

//Funcioon  para desactivar los campos
function desactivarCampos() {
    nombre.disabled = true;
    apellidos.disabled = true;
    email.disabled = true;
    telefono.disabled = true;
    direccion.disabled = true;
    hobbies.disabled = true;
    tema.disabled = true;
    idioma.disabled = true;
    notificaciones.disabled = true;
}

//Funcion que guarda los datos
function guardarCambios() {
    const datosActualizados = {
        personalInfo: {
            firstName: nombre.value,
            lastName: apellidos.value,
            email: email.value,
            phone: telefono.value
        },
        address: (() => {
            const partes = direccion.value.split(',').map(p => p.trim());
            return {
                street: partes[0] || "",
                city: partes[1] || "",
                zipCode: partes[2] || "",
                country: partes[3] || ""
            };
        })(),
        preferences: {
            theme: tema.value,
            language: idioma.value,
            notifications: notificaciones.checked
        },
        hobbies: hobbies.value.split('\n').map(h => h.trim()).filter(h => h)
    };

    botonEditar.disabled = true;
    mensaje.style.color = "black";
    mensaje.textContent = "Guardando...";

    const request = new XMLHttpRequest();

    request.onload = () => {
        botonEditar.disabled = false; 
        if (request.status >= 200 && request.status < 300) {
            mensaje.style.color = "green";
            mensaje.textContent = "Datos guardados correctamente.";
            desactivarCampos(); 
            botonEditar.textContent = "Editar";
            esEdicion = false;
        } else {
            mensaje.style.color = "red";
            mensaje.textContent = "Error al guardar los datos. Inténtalo de nuevo.";
        }
    };

    request.onerror = () => {
        botonEditar.disabled = false;
        mensaje.style.color = "red";
        mensaje.textContent = "Error de conexión al servidor.";
    };

    const url = "https://cors-anywhere.herokuapp.com/";

    request.open('POST', url, true);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    // Envio los datos en formato JSON
    request.send(JSON.stringify(datosActualizados));
}


//Cuando pulso en el boton de activar, dependiendo el estado de la variable esEdicion, hace una cosa o otra
botonEditar.addEventListener('click', () => {
    if (!esEdicion) {
        activarCampos();          
        botonEditar.textContent = "Guardar cambios";
        esEdicion = true;
        mensaje.textContent = "";
    } else {
        guardarCambios();          
    }
});

// Cargar datos al inicio
document.addEventListener('DOMContentLoaded', cargarDatos);
