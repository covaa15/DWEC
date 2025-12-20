// js/main.js
let artistas = [];
let horarios = [];
let escenarios = []
const contenedorArtistas=document.querySelector("#artist-list");
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
            //mostrarProductos(productos);
        })
        .catch(error => console.log("Error al cargar productos:", error));

}
//Cargo los horarios
function cargarHorarios(ruta) {
    fetch(ruta)
        .then(res => res.json())
        .then(data => {
            horarios = data;
            //mostrarProductos(productos);
        })
        .catch(error => console.log("Error al cargar productos:", error));

}

function mostrarArtistas(artistas){
    contenedorArtistas.innerHTML="";
    artistas.forEach(artista => {
       const card=document.createElement('div');
       card.classList.add(".artist-card") 


       card.innerHTML=`
        <h2>${artista.nombre}</h2>
       `
       contenedorArtistas.appendChild(card);
    });
    
    
}

function obtenerEscenario(idEscenario){
    escenarios.forEach(escenario => {
        
    });
}

function obtenerHorario(idArtista){
    horarios.forEach(horario => {
        if(horario.artistaId===idArtista)
            return horario.escenarioId;
    });
}