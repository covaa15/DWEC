const Medicion = document.querySelector('#seccionMedicion');
const Inventario = document.querySelector('#seccionInventario');
const ElSelect = document.querySelector('select');
const InputCantidad = document.querySelector('#inputCantidad');
const parrafoDisponible = document.querySelector('#disponible');
const boton = document.querySelector('#boton');
const cuerpo = document.querySelector('body');

function init() {
    InputCantidad.value = "";
    cargarMediciones();
    cargarItinerario();
}

document.addEventListener('DOMContentLoaded', init);




// FUNCIONES

//Cargar Mediciones
function cargarMediciones() {

    //Hago la peticion
    const requestmediciones = crearPeticion("./datos/soporte_vital.xml");

    requestmediciones.onload = () => {

        //Peticion correcta
        if (requestmediciones.status === 200) {

            //Obtengo la respuesta de la peticion
            const respuesta = requestmediciones.response;
            //Obtengo todas las mediciones
            const mediciones = respuesta.querySelectorAll('medicion');

            //Recorro todas las medicopnes para obtener la mas reciente
            let ultimaMedicion;
            mediciones.forEach(medicion => {
                if (!ultimaMedicion || new Date(ultimaMedicion.getAttribute('timestamp')) < new Date(medicion.getAttribute('timestamp')))
                    ultimaMedicion = medicion;
            });

            //Creo un contenedor para almacenar los datos
            crearParrafo("Fecha Medición:", ultimaMedicion.getAttribute('timestamp'));
            crearParrafo("Oxígeno:", ultimaMedicion.querySelector('oxigeno').textContent);
            crearParrafo("Temperatura:", ultimaMedicion.querySelector('temperatura').textContent);
            crearParrafo("Presión:", ultimaMedicion.querySelector('presion').textContent);

        } else if (requestmediciones.status === 404) {
            //  Error 404 
            Medicion.innerHTML += `
                <div class="alert alert-danger mt-3" role="alert">
                    Error: No se pudo cargar <strong>soporte_vital.xml</strong>. 
                    Comprueba que el archivo está en la carpeta <code>/datos</code>.
                </div>`;
        }
    }
}



function cargarItinerario() {

    //Hago la peticion
    const requestItinerario = crearPeticion("./datos/inventario.xml");

    requestItinerario.onload = () => {

        //Petición Correcta
        if (requestItinerario.status === 200) {
            //Obtengo la respuesta de la peticion
            const respuesta = requestItinerario.response;
            //Obtengo todos los items del inventario
            const inventario = respuesta.querySelectorAll('item');

            //Creo la opciones del select con las diferentes opcines del inventario
            inventario.forEach(item => {
                crearOpciones(item.querySelector('nombre').textContent)
            });

            //Cuando cambia el select añado la cantidad al input y muestro los que hay disponibles
            ElSelect.addEventListener('change', function () {
                const opcion = ElSelect.options[ElSelect.selectedIndex];
                if (ElSelect.selectedIndex !== 0) {
                    inventario.forEach(item => {
                        if (item.querySelector('nombre').textContent === opcion.textContent) {
                            InputCantidad.value = item.querySelector('cantidad').textContent;
                            parrafoDisponible.textContent = item.querySelector('cantidad').textContent + " " + item.getAttribute('unidad');
                        }
                    });
                }
            });

            //Cuando pulso el boton 
            boton.addEventListener('click', function () {
                //Borro el contenido de la seccion
                const resultados = document.querySelector('#resultados');
                resultados.innerHTML = "";

                //Recorro todos los inventarios claculando la autonomia 
                inventario.forEach(item => {
                    const autonomia = (parseInt(item.querySelector('cantidad').textContent) / (4 * parseFloat(item.querySelector('consumo').textContent))).toFixed(2);
                    const card = document.createElement('div');
                    card.className = "card mt-3 shadow-sm";
                    card.innerHTML = `
                        <div class="card-body">
                            <h5 class="card-title text-success">${item.querySelector('nombre').textContent}</h5>
                            <p class="card-text">Autonomía estimada: <strong>${autonomia} días</strong></p>
                        </div>`;
                    resultados.appendChild(card);
                });
            });

        } else if (requestItinerario.status === 404) {
            //  Error 404 
            Inventario.innerHTML += `
                <div class="alert alert-danger mt-3" role="alert">
                    Error: No se pudo cargar <strong>inventario.xml</strong>. 
                    Comprueba que el archivo está en la carpeta <code>/datos</code>.
                </div>`;
        }
    }
}

//Funcion que crea las peticiones
function crearPeticion(ruta) {
    const request = new XMLHttpRequest();
    request.open('GET', ruta);
    request.responseType = 'document';
    request.setRequestHeader('Accept', 'text/html');
    request.send();
    return request;
}

//Funcion para crear las opciones
function crearOpciones(opcion) {
    const Opcion = document.createElement('option');
    Opcion.textContent = opcion;
    ElSelect.appendChild(Opcion);
}

//Funcion para crear los parrafos
function crearParrafo(label, texto) {
    const Parrafo = document.createElement('p');
    Parrafo.classList.add('mb-2');

    const Label = document.createElement('span');
    Label.classList.add('fw-bold');
    Label.textContent = label + " ";

    const Span = document.createElement('span');
    Span.textContent = texto;

    Parrafo.appendChild(Label);
    Parrafo.appendChild(Span);

    Medicion.appendChild(Parrafo);
}
