// js/main.js
let artistas = [];
let horarios = [];
let escenarios = []
const contenedorArtistas = document.querySelector("#artist-list");
//Cargo los artistas
cargarArtistas("./data/artistas.json");
cargarEscenarios("./data/escenarios.json");
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

        const escenario=obtenerEscenario(artista.id);

        card.innerHTML = `
        <h2>${artista.nombre}</h2>
        <p>Escenario: ${escenario}</p>
       `
        contenedorArtistas.appendChild(card);
    });


}

function obtenerEscenario(idArtista) {
    const idEscenario = obtenerHorario(idArtista);
    
    escenarios.forEach(escenario => {
        if (escenario.id === idEscenario)
            return escenario.nombre;
    });
}

function obtenerHorario(idArtista) {
    console.log(horarios);
    horarios.forEach(horario => {
        console.log(horario.artistaId);
        if (horario.artistaId == idArtista){
            
            return horario.escenarioId;
        }

            
    });
}