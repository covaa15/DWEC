document.addEventListener('DOMContentLoaded', init);

async function init() {
    mostrarSpinner(true);

    const userUrl = 'https://jsonplaceholder.typicode.com/users/1';
    const postsUrl = 'https://jsonplaceholder.typicode.com/posts?userId=1';

    try {
        // Ejecutamos ambas peticiones concurrentemente
        const resultados = await Promise.allSettled([
            fetch(userUrl).then(checkStatus),
            fetch(postsUrl).then(checkStatus)
        ]);

        mostrarSpinner(false);

        const [userResult, postsResult] = resultados;

        // Manejo de usuario
        if (userResult.status === "fulfilled") {
            const userData = await userResult.value.json();
            renderUser(userData);
        } else {
            renderError('user-widget', 'No se pudieron cargar los datos del usuario.');
            console.error(userResult.reason);
        }

        // Manejo de posts
        if (postsResult.status === "fulfilled") {
            const postsData = await postsResult.value.json();
            renderPosts(postsData.slice(-3).reverse());
        } else {
            renderError('posts-widget', 'No se pudieron cargar los posts del usuario.');
            console.error(postsResult.reason);
        }

        // Si ambos fallan
        if (userResult.status === "rejected" && postsResult.status === "rejected") {
            alert('Error: No se pudieron cargar los datos del usuario ni sus posts.');
        }

    } catch (error) {
        mostrarSpinner(false);
        console.error("Error inesperado:", error);
        alert('Ocurrió un error inesperado al cargar los datos.');
    }
}

// Función para comprobar HTTP status
function checkStatus(response) {
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response;
}

function mostrarSpinner(mostrar) {
    document.querySelector('#loading-spinner').hidden = !mostrar;
}

function renderUser(user) {
    const contenedor = document.querySelector('#user-widget');
    contenedor.innerHTML = `
        <h2>Usuario</h2>
        <p><strong>Nombre:</strong> ${user.name}</p>
        <p><strong>Usuario:</strong> ${user.username}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Teléfono:</strong> ${user.phone}</p>
        <p><strong>Website:</strong> ${user.website}</p>
        <p><strong>Compañía:</strong> ${user.company.name}</p>
    `;
}

function renderPosts(posts) {
    const contenedor = document.querySelector('#posts-widget');
    contenedor.innerHTML = `<h2>Últimos 3 posts</h2>`;
    posts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.body}</p>
        `;
        postDiv.style.marginBottom = "1rem";
        contenedor.appendChild(postDiv);
    });
}

function renderError(widgetId, mensaje) {
    const contenedor = document.querySelector(`#${widgetId}`);
    contenedor.innerHTML = `<p class="error">${mensaje}</p>`;
}
