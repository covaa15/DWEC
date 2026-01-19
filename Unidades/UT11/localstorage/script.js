  // Clave única utilizada para almacenar el objeto JSON en localStorage
        const STORAGE_KEY = 'DatosUsuario';

        // =========================================================
        // LÓGICA DE ALMACENAMIENTO LOCAL (localStorage con JSON)
        // =========================================================

        /**
         * Recoge los datos de múltiples campos, crea un objeto JavaScript,
         * lo convierte en una cadena JSON y lo guarda en localStorage.
         */
        function guardarLocal() {
            const nombre = document.getElementById('nombreInput').value;
            const email = document.getElementById('emailInput').value;
            
            if (nombre && email) {
                // 1. Crear el objeto con los múltiples campos
                const datosUsuario = {
                    nombre: nombre,
                    email: email,
                    // Campo adicional para contexto
                    fecha_guardado: new Date().toLocaleString('es-ES') 
                };

                // 2. Convertir el objeto en una cadena JSON
                const datosUsuarioString = JSON.stringify(datosUsuario);
                
                // 3. Almacenar la cadena JSON en localStorage bajo una única clave
                localStorage.setItem(STORAGE_KEY, datosUsuarioString);
                
                document.getElementById('resultadoLocal').innerHTML = 
                    `**Datos Guardados (JSON):**<br>Nombre: ${nombre}<br>Correo: ${email}`;
                
            } else {
                document.getElementById('resultadoLocal').innerHTML = 'Por favor, rellena los dos campos para guardar.';
            }
        }

        /**
         * Carga la cadena JSON del localStorage, la convierte de nuevo en un objeto
         * JavaScript y rellena los múltiples campos.
         */
        function cargarLocal() {
            // 1. Obtener la cadena JSON
            const datosUsuarioString = localStorage.getItem(STORAGE_KEY);
            
            if (datosUsuarioString) {
                try {
                    // 2. Convertir la cadena JSON de nuevo a objeto JavaScript
                    const datosUsuario = JSON.parse(datosUsuarioString);
                    
                    // 3. Rellenar los campos individuales
                    document.getElementById('nombreInput').value = datosUsuario.nombre || '';
                    document.getElementById('emailInput').value = datosUsuario.email || '';

                    document.getElementById('resultadoLocal').innerHTML = 
                        `**Datos Recuperados (Objeto):**<br>Nombre: ${datosUsuario.nombre}<br>Correo: ${datosUsuario.email}<br><span class="info">Guardado en: ${datosUsuario.fecha_guardado}</span>`;
                } catch (e) {
                    // Manejar error si el JSON está mal formateado
                    document.getElementById('resultadoLocal').innerHTML = 'ERROR: El dato de Local Storage no tiene formato JSON válido.';
                    console.error("Error al analizar JSON:", e);
                }
            } else {
                document.getElementById('resultadoLocal').innerHTML = 'No se encontraron datos almacenados bajo la clave ' + STORAGE_KEY + '.';
            }
        }

        /**
         * Elimina el objeto entero (la cadena JSON) del localStorage.
         */
        function eliminarLocal() {
            localStorage.removeItem(STORAGE_KEY);
            
            document.getElementById('resultadoLocal').innerHTML = 
                '**Datos eliminados.** El Local Storage está limpio para esta clave.';
            document.getElementById('nombreInput').value = '';
            document.getElementById('emailInput').value = '';
        }

        // Carga los datos al iniciar la página (si existen)
        window.onload = cargarLocal;