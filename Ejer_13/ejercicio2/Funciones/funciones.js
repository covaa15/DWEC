let primeraVez = false;

// Función para subir los datos al crud
export async function uploadingInitialUsers(usuarios, url, displayUsers, divMensajes) {
    for (const usuario of usuarios) {
        try {
            const resp = await fetch(url, {
                method: "POST",
                body: JSON.stringify(usuario),
                headers: { "Content-Type": "application/json" }
            });

            await resp.json();
            displayUsers();

            if (!primeraVez) {
                divMensajes.style.display = "block";
                divMensajes.innerHTML = `<p class="mensajeBien">Usuarios cargados correctamente</p>`;
                primeraVez = true;
                setTimeout(() => divMensajes.style.display = "none", 2500);
            }

        } catch (e) {
            divMensajes.style.display = "block";
            divMensajes.innerHTML = `<p class="mensajeError">Error al subir usuarios</p>`;
            setTimeout(() => divMensajes.style.display = "none", 2500);
        }
    }
}

//Funcion para crear la tabla
export function crearTabla() {
    return document.createElement('table');
}

//Funcion para crear las filas
export function crearFila(tabla) {
    const f = document.createElement('tr');
    tabla.appendChild(f);
    return f;
}

//Funcion para crear las celdas
export function crearCeldas() {
    return document.createElement('td');
}

//Funcion para crear botones
export function crearBotones(id, clase, fila, celda) {
    const b = document.createElement('button');
    b.type = "button";
    b.id = id;
    b.textContent = clase;
    b.classList.add(clase);
    celda.appendChild(b);
    fila.appendChild(celda);
}

//Funcion para crear los parrafos
export function crearParrafos(texto, fila, celda, clase) {
    const p = document.createElement('p');
    p.textContent = texto;
    p.classList.add(clase);
    celda.appendChild(p);
    fila.appendChild(celda);
}

//Funcion para crear imagenes
export function crearImagen(src, celda, fila) {
    const img = document.createElement('img');
    img.src = src;
    img.width = 50;
    celda.appendChild(img);
    fila.appendChild(celda);
}
