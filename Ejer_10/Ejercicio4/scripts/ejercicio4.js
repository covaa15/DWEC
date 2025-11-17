const btnEmpezar = document.querySelector('#btnEmpezar');
const textoFragmento = document.querySelector('#textoFragmento');
const pistaFragmento = document.querySelector('#pistaFragmento');
const alfabetoDiv = document.querySelector('#alfabeto');
const contadorIntentosSpan = document.querySelector('#contadorIntentos');

let fragmentoActual = "";
let selectorSolucion = "";
let letraClave = "";
let letraSeleccionada = "";
let intentos = 0;

document.addEventListener('DOMContentLoaded', function () {
    crearAlfabeto();
});

btnEmpezar.addEventListener('click', function () {
    cargarFragmento("fragmento1.xml");
});

//Creo el alfabeto
function crearAlfabeto() {
    const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');

    letras.forEach(l => {
        const div = document.createElement('div');

        div.className = "border p-2 m-1 text-center"; 
        div.style.width = "40px";
        div.textContent = l;

        alfabetoDiv.appendChild(div);
    });
}

document.addEventListener('click', function (event) {

    if (event.target.parentElement === alfabetoDiv) {
        seleccionarLetra(event.target);
        return;
    }

    if (selectorSolucion !== "") {
        validarIntento(event.target);
    }
});

//Seleccionar letra
function seleccionarLetra(divLetra) {
    letraSeleccionada = divLetra.textContent;

    document.querySelectorAll('#alfabeto div').forEach(l => {
        l.classList.remove('bg-primary', 'text-white');
    });

    divLetra.classList.add('bg-primary', 'text-white');
}

//Comprobar los intentos
function validarIntento(elemento) {

    intentos++;
    contadorIntentosSpan.textContent = intentos;

    const coincideCSS = elemento.matches(selectorSolucion);
    const coincideLetra = letraSeleccionada === letraClave;

    if (coincideCSS && coincideLetra) {
        cargarFragmento(fragmentoActual);
    } else {
        marcarError(elemento);
    }
}

//Marcar los errores
function marcarError(el) {
    const originalBg = el.className;

    el.classList.add("bg-danger", "text-white");

    setTimeout(() => {
        el.className = originalBg;
    }, 300);
}

//Cargar fragmento
function cargarFragmento(nombreArchivo) {

    const request = new XMLHttpRequest();
    request.open('GET', "./datos/" + nombreArchivo);
    request.responseType = 'document';
    request.send();

    request.onload = () => {
        if (request.status === 200) {

            const xml = request.response;

            textoFragmento.textContent = xml.querySelector('texto').textContent;
            pistaFragmento.textContent = xml.querySelector('pista').textContent;

            selectorSolucion = xml.querySelector('selector_solucion').textContent;
            letraClave = xml.querySelector('letra_clave').textContent;
            fragmentoActual = xml.querySelector('siguiente_fragmento').textContent;

            letraSeleccionada = "";
            document.querySelectorAll('#alfabeto div')
                .forEach(l => l.classList.remove('bg-primary', 'text-white'));

        } else {
            textoFragmento.textContent = "Error cargando fragmento...";
        }
    }
}
