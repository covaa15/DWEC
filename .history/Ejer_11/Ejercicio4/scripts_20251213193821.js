document.addEventListener('DOMContentLoaded', init);

async function init() {
    mostrarSpinner(true);

    try {
        const user = await getDatosUser();
        mostrarSpinner(false);
        mostrarDatosUsuario(user);
    } catch (error) {
        mostrarSpinner(false);
        cambiarError("fetch");
        console.error(error.message);
    }
}

function mostrarSpinner(mostrar) {
    document.querySelector('#loading-spinner').hidden = !mostrar;
}

async function getDatosUser() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
    
    if (!response.ok) {
        throw new Error(`Error en la petición: ${response.status}`);
    }

    const datos = await response.json();
    return datos;
}

function mostrarDatosUsuario(user) {
    const contenedor = document.querySelector('#user-data');
    contenedor.innerHTML = `
        <p><strong>Nombre:</strong> ${user.name}</p>
        <p><strong>Usuario:</strong> ${user.username}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Teléfono:</strong> ${user.phone}</p>
        <p><strong>Website:</strong> ${user.website}</p>
        <p><strong>Compañía:</strong> ${user.company.name}</p>
    `;
}

function cambiarError(tipo) {
    switch (tipo) {
        case "fetch":
            document.querySelector(".error-fetch").hidden = false;
            break;
    }
}
