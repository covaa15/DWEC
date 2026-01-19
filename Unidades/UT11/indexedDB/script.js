 const DB_NAME = 'LibreriaDB';
        const DB_VERSION = 1;
        const STORE_NAME = 'Libros';
        let db; // Variable global para la base de datos

        // =========================================================
        // 1. INICIALIZACIÓN DE LA BASE DE DATOS
        // =========================================================

        /**
         * Habilita los botones de Guardar y Cargar.
         */
        function enableButtons() {
            document.getElementById('btnGuardar').disabled = false;
            document.getElementById('btnCargar').disabled = false;
            document.getElementById('btnGuardar').textContent = 'Guardar Objeto';
        }

        function initIndexedDB() {
            // Comprobar si IndexedDB es compatible con el navegador
            if (!window.indexedDB) {
                document.getElementById('resultadoDB').innerHTML = '<span class="warning">Tu navegador no soporta IndexedDB.</span>';
                return;
            }

            const request = window.indexedDB.open(DB_NAME, DB_VERSION);

            request.onerror = (event) => {
                console.error("Error al abrir IndexedDB:", event.target.error);
                document.getElementById('resultadoDB').innerHTML = '<span class="warning">Error de conexión con DB. Consulta la consola.</span>';
            };

            request.onsuccess = (event) => {
                // *** CORRECCIÓN CLAVE: La variable db se asigna aquí. ***
                db = event.target.result; 
                console.log(`IndexedDB: Base de datos '${DB_NAME}' abierta con éxito.`);
                document.getElementById('resultadoDB').innerHTML = 'Conexión a IndexedDB exitosa. **¡Botones habilitados!**';
                
                // *** HABILITAR BOTONES DESPUÉS DE LA CONEXIÓN ***
                enableButtons(); 
            };

            /**
             * Solo se llama si la DB no existe o la versión es superior.
             * ¡Este es el ÚNICO lugar para crear objectStores!
             */
            request.onupgradeneeded = (event) => {
                db = event.target.result;
                console.log(`IndexedDB: Actualización/Creación necesaria. Creando Object Store '${STORE_NAME}'.`);

                if (!db.objectStoreNames.contains(STORE_NAME)) {
                    db.createObjectStore(STORE_NAME, { keyPath: 'id' });
                }
            };
        }

        // =========================================================
        // 2. OPERACIÓN: GUARDAR DATOS (Transacción 'readwrite')
        // =========================================================

        function guardarDato() {
            // Ahora la verificación es simplemente un "seguro" extra
            if (!db) return alert("Error: IndexedDB aún no está disponible."); 

            const id = parseInt(document.getElementById('idInput').value);
            const nombre = document.getElementById('nombreInput').value;

            if (isNaN(id) || !nombre) return alert("Por favor, introduce un ID y un Nombre válidos.");

            const libro = { id: id, nombre: nombre, fecha: new Date().toLocaleDateString('es-ES') };

            // Iniciar una transacción de escritura
            const transaction = db.transaction([STORE_NAME], 'readwrite');
            const store = transaction.objectStore(STORE_NAME);
            
            const request = store.put(libro);

            request.onsuccess = () => {
                document.getElementById('resultadoDB').innerHTML = `**Guardado:** Objeto con ID ${id} y Nombre: ${nombre}.`;
                console.log('IndexedDB: Objeto guardado con éxito.', libro);
            };

            request.onerror = (event) => {
                document.getElementById('resultadoDB').innerHTML = '<span class="warning">Error al guardar. Consulta la consola.</span>';
                console.error("Error al guardar:", event.target.error);
            };

            transaction.oncomplete = () => {
                console.log("Transacción de escritura completada.");
            };
        }

        // =========================================================
        // 3. OPERACIÓN: CARGAR DATOS (Transacción 'readonly')
        // =========================================================

        function cargarDato() {
            if (!db) return alert("Error: IndexedDB aún no está disponible.");
            
            const id = parseInt(document.getElementById('idInput').value);
            if (isNaN(id)) return alert("Introduce un ID para cargar.");

            // Iniciar una transacción de lectura
            const transaction = db.transaction([STORE_NAME], 'readonly');
            const store = transaction.objectStore(STORE_NAME);
            
            const request = store.get(id); 

            request.onsuccess = (event) => {
                const result = event.target.result;
                if (result) {
                    document.getElementById('resultadoDB').innerHTML = 
                        `**Objeto Recuperado (ID: ${id}):**<br>Nombre: ${result.nombre}<br><span class="info">Guardado el: ${result.fecha}</span>`;
                    console.log('IndexedDB: Objeto recuperado:', result);
                } else {
                    document.getElementById('resultadoDB').innerHTML = `No se encontró un objeto con ID: ${id}.`;
                }
            };

            request.onerror = (event) => {
                document.getElementById('resultadoDB').innerHTML = '<span class="warning">Error al cargar. Consulta la consola.</span>';
                console.error("Error al cargar:", event.target.error);
            };
        }

        // =========================================================
        // 4. OPERACIÓN: ELIMINAR BASE DE DATOS
        // =========================================================

        function eliminarDB() {
            const request = window.indexedDB.deleteDatabase(DB_NAME);

            request.onsuccess = () => {
                document.getElementById('resultadoDB').innerHTML = '**Base de datos eliminada.** Por favor, recarga la página.';
                console.log("IndexedDB: Base de datos borrada con éxito.");
                db = null; // Reiniciar la variable global
                document.getElementById('btnGuardar').disabled = true;
                document.getElementById('btnCargar').disabled = true;
                document.getElementById('btnGuardar').textContent = 'Guardar Objeto (DB Eliminada)';
            };

            request.onerror = (event) => {
                document.getElementById('resultadoDB').innerHTML = '<span class="warning">Error al eliminar DB. Consulta la consola.</span>';
                console.error("Error al eliminar la DB:", event.target.error);
            };
        }

        // Iniciar la conexión a IndexedDB al cargar la página
        window.onload = initIndexedDB;