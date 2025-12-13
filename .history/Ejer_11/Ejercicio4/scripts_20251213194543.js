document.addEventListener('DOMContentLoaded', init);

async function init() {
    mostrarSpinner(true);

    const userUrl = 'https://jsonplaceholder.typicode.com/users/1';
    const postsUrl = 'https://jsonplaceholder.typicode.com/posts?userId=1';

    let userData = null;
    let postsData = null;

    try {
        // Carga concurrente
        const resultados = await Promise.allSettled([
            fetchJSON(userUrl),
            fetchJSON(postsUrl)
        ]);

        const [userResult, postsResult] = resultados;

        // Usuario
        if (userResult.status === 'fulfilled') {
            userData = userResult.value;
            renderUser(userData);
        } else {
            renderError('user-widget', 'No se pudieron cargar los datos del usuario.');
            console.error(userResult.reason);
        }

        // Posts
        if (postsResult.status === 'fulfilled') {
            postsData = postsResult.value;
            renderPosts(postsData.slice(-3).reverse()); // últimos 3 posts
        } else {
            renderError('posts-widget', 'No se pudieron cargar los posts del usuario.');
            console.error(postsResult.reason);
        }

        mostrarSpinner(false);

        // Si ambos fallan
        if (!userData && !postsData) {
            document.querySelector('.error-fetch').hidden = false;
        }

    } catch (error) {
        mostrarSpinner(false);
        console.error("Error inesperado:", error);
        document.querySelector('.error-fetch').hidden = false;
    }
}

// Función fetch segura
async function fetchJSON(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return res.json();
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
