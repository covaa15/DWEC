// Esta función es requerida por la API de Google Maps y se llama
// cuando el script de Google Maps ha terminado de cargarse.
// La definimos en el ámbito global para que Google pueda encontrarla.
function initMap() {
    console.log("Google Maps API cargada y lista.");
    // No hacemos nada aquí todavía, el mapa se inicializará cuando tengamos la ubicación.
}

document.addEventListener('DOMContentLoaded', () => {

    // --- OBTENER REFERENCIAS A ELEMENTOS DEL DOM ---
    const botonObtenerUbicacion = document.getElementById('obtener-ubicacion');
    const estado = document.getElementById('estado');
    const latitudEl = document.getElementById('latitud');
    const longitudEl = document.getElementById('longitud');
    const precisionEl = document.getElementById('precision');
    const altitudEl = document.getElementById('altitud');
    const velocidadEl = document.getElementById('velocidad');
    const mapaEl = document.getElementById('mapa');

    // Variable para guardar la instancia del mapa de Google.
    let mapa;

    // --- EVENT LISTENER ---
    botonObtenerUbicacion.addEventListener('click', () => {
        // --- USO DE LA API DE GEOLOCALIZACIÓN ---

        // 1. Comprobar si el navegador soporta la API.
        // La API está disponible a través del objeto `navigator.geolocation`.
        if ('geolocation' in navigator) {
            estado.textContent = 'Pidiendo permiso de ubicación...';

            // 2. Pedir la ubicación.
            // `getCurrentPosition()` es el método principal. Es asíncrono.
            // Recibe tres argumentos (callbacks):
            //   - Éxito: una función que se ejecuta si se obtiene la ubicación.
            //   - Error: una función que se ejecuta si algo sale mal.
            //   - Opciones: un objeto para configurar la petición (opcional).
            navigator.geolocation.getCurrentPosition(
                geolocalizacionExitosa, 
                geolocalizacionErronea, 
                {
                    enableHighAccuracy: true, // Pide la máxima precisión posible.
                    timeout: 10000,           // Tiempo máximo de espera en milisegundos.
                    maximumAge: 0             // No usar una ubicación cacheada.
                }
            );

        } else {
            estado.textContent = 'Error: La geolocalización no está soportada por este navegador.';
        }
    });


    // --- CALLBACKS DE GEOLOCALIZACIÓN ---

    /**
     * Callback que se ejecuta cuando se obtiene la ubicación correctamente.
     * @param {GeolocationPosition} posicion - Objeto con los datos de la ubicación.
     */
    function geolocalizacionExitosa(posicion) {
        estado.textContent = '¡Ubicación obtenida con éxito!';
        console.log('Datos de posición recibidos:', posicion);

        // El objeto `posicion` contiene un objeto `coords` con toda la información.
        const { latitude, longitude, accuracy, altitude, speed } = posicion.coords;

        // Actualizamos la interfaz con los datos recibidos.
        latitudEl.textContent = latitude.toFixed(6);
        longitudEl.textContent = longitude.toFixed(6);
        precisionEl.textContent = accuracy.toFixed(2);
        altitudEl.textContent = altitude ? altitude.toFixed(2) : 'No disponible';
        velocidadEl.textContent = speed ? speed.toFixed(2) : 'No disponible';

        // Mostramos la ubicación en el mapa.
        mostrarMapa(latitude, longitude);
    }

    /**
     * Callback que se ejecuta si ocurre un error al obtener la ubicación.
     * @param {GeolocationPositionError} error - Objeto con la información del error.
     */
    function geolocalizacionErronea(error) {
        console.error('Error de geolocalización:', error);
        
        // El objeto `error` tiene una propiedad `code` que identifica el tipo de error.
        switch(error.code) {
            case error.PERMISSION_DENIED:
                estado.textContent = 'Error: El usuario denegó el permiso de ubicación.';
                break;
            case error.POSITION_UNAVAILABLE:
                estado.textContent = 'Error: La información de ubicación no está disponible.';
                break;
            case error.TIMEOUT:
                estado.textContent = 'Error: Se agotó el tiempo de espera para obtener la ubicación.';
                break;
            default:
                estado.textContent = 'Error: Ocurrió un error desconocido.';
                break;
        }
    }


    // --- FUNCIONALIDAD DEL MAPA ---

    /**
     * Inicializa y muestra un mapa de Google centrado en la ubicación del usuario.
     * @param {number} lat - Latitud.
     * @param {number} lng - Longitud.
     */
    function mostrarMapa(lat, lng) {
        // Coordenadas en el formato que espera la API de Google Maps.
        const misCoordenadas = { lat: lat, lng: lng };

        // Opciones de inicialización del mapa.
        const opcionesMapa = {
            zoom: 15, // Nivel de zoom (más alto = más cerca).
            center: misCoordenadas // Dónde centrar el mapa.
        };

        // Crea una nueva instancia del mapa y la asocia al div 'mapa'.
        mapa = new google.maps.Map(mapaEl, opcionesMapa);

        // Crea un marcador para señalar la ubicación exacta.
        const marcador = new google.maps.Marker({
            position: misCoordenadas,
            map: mapa,
            title: '¡Estás aquí!'
        });
    }
});
