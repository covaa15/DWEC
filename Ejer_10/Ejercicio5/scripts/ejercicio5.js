const selectMaterialBase = document.querySelector('#selectBase');
const selectMaterialMezcla = document.querySelector('#selectMezcla');
const botonSintetizar = document.querySelector('#btnSintetizar');
const contenedorResultado = document.querySelector('#resultado');
const listaHistorialSintesis = document.querySelector('#historial');

let xmlRecetasAleaciones = null;

document.addEventListener('DOMContentLoaded', cargarRecetasXML);

//Cargo el XML
function cargarRecetasXML() {
    const requestXML = new XMLHttpRequest();
    requestXML.open('GET', './datos/recetas.xml');
    requestXML.responseType = 'document';
    requestXML.send();

    requestXML.onload = () => {
        if (requestXML.status === 200) {
            xmlRecetasAleaciones = requestXML.response;
            cargarOpcionesMateriales();
        } else {
            contenedorResultado.textContent = "Error cargando recetas.xml";
        }
    };
}

// Función para cargar las opciones en los selects
function cargarOpcionesMateriales() {
    const materialesBase = new Set();
    const materialesMezcla = new Set();

    xmlRecetasAleaciones.querySelectorAll('aleacion').forEach(aleacion => {
        materialesBase.add(aleacion.querySelector('base').textContent);
        materialesMezcla.add(aleacion.querySelector('mezcla').textContent);
    });

    materialesBase.forEach(material => {
        const opcion = document.createElement('option');
        opcion.textContent = material;
        selectMaterialBase.appendChild(opcion);
    });

    materialesMezcla.forEach(material => {
        const opcion = document.createElement('option');
        opcion.textContent = material;
        selectMaterialMezcla.appendChild(opcion);
    });
}

// Sintetizo la aleacion
botonSintetizar.addEventListener('click', () => {
    const materialBaseSeleccionado = selectMaterialBase.value;
    const materialMezclaSeleccionado = selectMaterialMezcla.value;

    const aleacionEncontrada = Array.from(xmlRecetasAleaciones.querySelectorAll('aleacion'))
        .find(aleacion =>
            aleacion.querySelector('base').textContent === materialBaseSeleccionado &&
            aleacion.querySelector('mezcla').textContent === materialMezclaSeleccionado
        );

    if (aleacionEncontrada) {
        const resultadoAleacion = aleacionEncontrada.querySelector('resultado').textContent;
        const descripcionAleacion = aleacionEncontrada.querySelector('descripcion').textContent;

        contenedorResultado.innerHTML = `
            <h5>${resultadoAleacion}</h5>
            <p>${descripcionAleacion}</p>
        `;

        agregarHistorialSintesis(materialBaseSeleccionado, materialMezclaSeleccionado, resultadoAleacion);

    } else {
        contenedorResultado.innerHTML = `
            <p class="text-danger">Combinación no válida. No se ha producido ninguna aleación.</p>
        `;
    }
});

// Agrego al historial la combinacion
function agregarHistorialSintesis(materialBase, materialMezcla, resultado) {
    const itemHistorial = document.createElement('li');
    itemHistorial.className = "list-group-item list-group-item-action";
    itemHistorial.textContent = `${materialBase} + ${materialMezcla} = ${resultado}`;

    // Muestro de nuevo la aleacion, si la pulso en el historial
    itemHistorial.addEventListener('click', () => {
        selectMaterialBase.value = materialBase;
        selectMaterialMezcla.value = materialMezcla;

        const aleacion = Array.from(xmlRecetasAleaciones.querySelectorAll('aleacion'))
            .find(a =>
                a.querySelector('base').textContent === materialBase &&
                a.querySelector('mezcla').textContent === materialMezcla
            );

        contenedorResultado.innerHTML = `
            <h5>${aleacion.querySelector('resultado').textContent}</h5>
            <p>${aleacion.querySelector('descripcion').textContent}</p>
        `;
    });

    listaHistorialSintesis.appendChild(itemHistorial);
}
