// js/main.js
let artistas = [];
let horarios = [];
let escenarios = [];
const dias = [];
let botonesPlan=null;;
const contenedorArtistas = document.querySelector("#artist-list");
const selectorGenero = document.querySelector('#filter-genre');
const buscador = document.querySelector('#search-name');
const filtrosDia = document.querySelector('#filter-day');
const listaPlanes=document.querySelector('#plan-list');
//Cargo los artistas
cargarEscenarios("./data/escenarios.json");
cargarHorarios("./data/horarios.json");
cargarArtistas("./data/artistas.json");



function cargarArtistas(ruta) {
    fetch(ruta)
        .then(res => res.json())
        .then(data => {
            artistas = data;
            mostrarArtistas(artistas);
        })
        .catch(error => console.log("Error al cargar productos:", error));

}
//Cargo los escenarios
function cargarEscenarios(ruta) {
    fetch(ruta)
        .then(res => res.json())
        .then(data => {
            escenarios = data;
            mostrarArtistas(artistas);
        })
        .catch(error => console.log("Error al cargar productos:", error));

}
//Cargo los horarios
function cargarHorarios(ruta) {
    fetch(ruta)
        .then(res => res.json())
        .then(data => {
            horarios = data;
            mostrarArtistas(artistas);
        })
        .catch(error => console.log("Error al cargar productos:", error));

}


function mostrarArtistas(artistas) {
    contenedorArtistas.innerHTML = "";
    cargarGeneros();
    cargarDias();
    artistas.forEach(artista => {
        const card = document.createElement('div');
        card.classList.add(".artist-card")

        let escenario = obtenerEscenario(artista.id);
        let horario = obtenerHorario(artista.id);
        card.innerHTML = `
        <h2>${artista.nombre}</h2>
        <p>${artista.genero} - ${artista.pais}</p>
        <div>
            <p>${horario.dia} a las ${horario.horaInicio}</p>
             <p> ${escenario}</p>
             <button id=${artista.id}>Añadir a mi plan</button>
        </div> 
       `

        contenedorArtistas.appendChild(card);
        activarBotones();
    });


}
//Obtener el escenario
function obtenerEscenario(idArtista) {
    let nombreEscenario;
    const horario = obtenerHorario(idArtista);
    escenarios.forEach(escenario => {
        if (escenario.id === horario.escenarioId)
            nombreEscenario = escenario.nombre;
    });
    return nombreEscenario;
}

//Obtener Horarios
function obtenerHorario(idArtista) {
    let horarioArtista;
    horarios.forEach(horario => {

        if (horario.artistaId === idArtista)
            horarioArtista = horario;

    });
    return horarioArtista;
}

function cargarGeneros() {
    artistas.forEach(artista => {
        let opcion = document.createElement('option');
        opcion.textContent = artista.genero;

        selectorGenero.appendChild(opcion);
    });
}

function cargarDias() {
    
    horarios.forEach(horario => {


        if (dias.includes(horario.dia)===false) {
            dias.push(horario.dia);
            let label=document.createElement('label');
            label.textContent=horario.dia;
            let opcion = document.createElement('input');
            opcion.type = 'radio';
            opcion.name = 'day';
            opcion.value = horario.dia;
            filtrosDia.appendChild(opcion);
            filtrosDia.appendChild(label);
           
        }
    });
}


//Aplico los filtros
function aplicarFiltros() {
    const artistaBuscado = buscador.value.toLowerCase();
    let artistasFiltrados = artistas;
    const generoSeleccionado = selectorGenero.value.toLocaleLowerCase();

    if (artistaBuscado !== "") {
        artistasFiltrados = artistasFiltrados.filter(artista =>
            artista.nombre.toLowerCase().includes(artistaBuscado)
        );
    }

    if (generoSeleccionado !== '') {
        artistasFiltrados = artistasFiltrados.filter((artista) => {
            if (artista.genero.toLocaleLowerCase() === generoSeleccionado)
                return artista;
        }
        );
    }


    
    if (artistasFiltrados.length === 0) {
        contenedorArtistas.innerHTML = `<p>No se encontraron artistas.</p>`;
        contenedorArtistas.style.display = "block";
        return;
    }

    mostrarArtistas(artistasFiltrados);
}
buscador.addEventListener("input", aplicarFiltros);
selectorGenero.addEventListener("change", aplicarFiltros);

function activarBotones(){
    document.querySelectorAll("button").forEach(btn => {
        btn.addEventListener("click", () => {
            let artista=obtenerArtista(btn.id);
            let escenario=obtenerEscenario(artista.id);
            let horario=obtenerHorario(artista.id);

            let div=document.createElement('div');
            div.id=artista.id;
            
            let h1=document.createElement('h1');
            h1.textContent=artista.nombre;

            let p =document.createElement('p');
            p.textContent=escenario+''+ horario.dia+'@'+horario.horaInicio;


            // listaPlanes.innerHTML=`
            // <h1>${artista.nombre}</h1>
            // <p>${escenario} ${horario.dia} @ ${horario.horaInicio}</p>
            // `
            
        });
    });
    
}

function obtenerArtista(botonID){
let artistaBoton;
    artistas.forEach(artista=>{
        if(artista.id===botonID)
            artistaBoton=artista;
    });
    return artistaBoton;
}