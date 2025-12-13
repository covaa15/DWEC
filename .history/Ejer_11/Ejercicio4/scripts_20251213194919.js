// Función principal que se ejecuta al cargar la página
async function iniciarApp() {
    // Mostramos el spinner de carga
    document.getElementById('loading-spinner').style.display = 'block';

    try {
        const usuario = await obtenerDatosUsuario(1); // Obtenemos datos del usuario 1
        console.log(usuario);
    } catch (error) {
        mostrarError("fetch");
        console.error("Error al obtener datos:", error.message);
    } finally {
        // Ocultamos el spinner
        document.getElementById('loading-spinner').style.display = 'none';
    }
}

// Función para obtener datos de usuario
async function obtenerDatosUsuario(id) {
    const respuesta = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    if (!respuesta.ok) throw new Error("Error en la respuesta del servidor");
    return respuesta.json();
}

// Función para mostrar mensajes de error
function mostrarError(tipo) {
    if (tipo === "fetch") {
        const errorElement = document.querySelector(".error-fetch");
        errorElement.style.display = errorElement.style.display === 'none' ? 'block' : 'none';
    }
}

// Evento DOMContentLoaded
document.addEventListener('DOMContentLoaded', iniciarApp);
