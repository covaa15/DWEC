// js/main.js
let artistas = [];
let horarios = [];
let escenarios = []
const contenedorArtistas = document.querySelector("#artist-list");
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
    artistas.forEach(artista => {
        const card = document.createElement('div');
        card.classList.add(".artist-card")

        let escenario=obtenerEscenario(artista.id);
        let horario=obtenerHorario(artista.id);
        card.innerHTML = `
        <h2>${artista.nombre}</h2>
        <p>${artista.genero} - ${artista.pais}</p>
        <div>
            <p>${horario.dia} a las ${horario.horaInicio}</p>
             <p> ${escenario}</p>
        </div>
        
       `
        contenedorArtistas.appendChild(card);
    });


}

function obtenerEscenario(idArtista) {
    let nombreEscenario;
    const horario = obtenerHorario(idArtista);
    escenarios.forEach(escenario => {
        if (escenario.id === horario.escenarioId)
            nombreEscenario= escenario.nombre;
    });
    return nombreEscenario;
}

function obtenerHorario(idArtista) {
    let horarioArtista;
    horarios.forEach(horario => {
        
        if (horario.artistaId === idArtista)
            horarioArtista=horario;
        
    });
    return horarioArtista ;
}

