
const TodosInputs = document.querySelectorAll('input');
const ElSelect = document.querySelector('select');
const Total = document.querySelector('#total');
const BotonEnviar = document.querySelector('#boton');
let opcion;
let ingredientes;

actualizarPedido();

//Actualiza el precio final dependiendo los inputs que esten seleccionados
TodosInputs.forEach(unInput => {
    unInput.addEventListener('change', () => {
        unInput.checked;
        actualizarPedido();
    });
});


//Actualiza el precio final dependiendo el select que este seleccionado
ElSelect.addEventListener('change', () => {
    actualizarPedido();
});


//Esta funcion actualiza el pedido dependiendo lo que hay seleccionado en los inputs y el select
function actualizarPedido() {
    let total = 0.00;
    ingredientes = [];
    //Recorro los inputs y obtengo los que estan seleccionados y de ellos obtengo el atributo que contiene el precio
    TodosInputs.forEach(unInput => {

        if (unInput.checked) {
            ingredientes.push(unInput.parentElement.textContent);
            total += parseFloat(unInput.getAttribute('data-price'));
        }

    });


    //Obtengo la opcion seleccionada
    opcion = ElSelect.options[ElSelect.selectedIndex];

    //Si es la opcion 0 no hago nada porque es la que contiene el texto
    if (ElSelect.selectedIndex != 0) {
        //Obtengo el atributo que contiene el precio de la opcion seleccionada
        total += parseFloat(opcion.getAttribute('data-price'));
    }

    //Añado el precio al total
    Total.textContent = total.toFixed(2);
}

function mostrarDatos() {
    let mensaje;

    if (ElSelect.selectedIndex == 0) {

        mensaje = "Te falta seleccionar el tipo de masa";

    } else {
        mensaje = "Ingredientes:\n"
        ingredientes.map((ingrediente) => {
            mensaje += "\n- " + ingrediente;
        });

        mensaje += "\n\nTipo Masa:\n"
        mensaje += "\n- " + opcion.value;
    }

    window.alert(mensaje);
}

//Muestro los mensajes en una alerta cuando pulso enviar
BotonEnviar.addEventListener('click', function (event) {
    if (ElSelect.selectedIndex == 0) {

        event.preventDefault();
    }
    mostrarDatos();
});

