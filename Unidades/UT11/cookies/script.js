 const COOKIE_NAME = 'MiDatoCookie';

        // =========================================================
        // 1. FUNCIONES AUXILIARES DE COOKIES
        // (Necesarias por la forma en que document.cookie funciona)
        // =========================================================

        /**
         * Establece una cookie con nombre, valor y fecha de expiración (7 días).
         * @param {string} name - El nombre de la cookie.
         * @param {string} value - El valor a almacenar.
         */
        function setCookie(name, value) {
            // Establecer la caducidad a 7 días
            const d = new Date();
            d.setTime(d.getTime() + (7 * 24 * 60 * 60 * 1000));
            const expires = "expires=" + d.toUTCString();
            
            // Asignar al document.cookie (Esto añade o actualiza)
            document.cookie = name + "=" + encodeURIComponent(value) + ";" + expires + ";path=/;SameSite=Lax";
        }

        /**
         * Obtiene el valor de una cookie por nombre.
         * @param {string} name - El nombre de la cookie a buscar.
         * @returns {string} El valor de la cookie o "No encontrada".
         */
        function getCookie(name) {
            const cname = name + "=";
            const decodedCookie = decodeURIComponent(document.cookie);
            const ca = decodedCookie.split(';');

            for(let i = 0; i < ca.length; i++) {
                let c = ca[i];
                // Eliminar espacios en blanco
                while (c.charAt(0) === ' ') {
                    c = c.substring(1);
                }
                // Si la cookie comienza con el nombre buscado, devolver el valor
                if (c.indexOf(cname) === 0) {
                    return c.substring(cname.length, c.length);
                }
            }
            return "No encontrada";
        }

        // =========================================================
        // 2. LÓGICA DE INTERFAZ
        // =========================================================

        function guardarCookie() {
            const data = document.getElementById('cookieData').value;
            if (data) {
                setCookie(COOKIE_NAME, data);
                document.getElementById('resultadoCookie').innerHTML = 
                    `**Guardado:** ${data}. <br> *Revisa la pestaña "Application" -> "Cookies".*`;
            } else {
                document.getElementById('resultadoCookie').innerHTML = 'Por favor, introduce un dato.';
            }
        }

        function cargarCookie() {
            const data = getCookie(COOKIE_NAME);
            document.getElementById('resultadoCookie').innerHTML = 
                `**Recuperado:** ${data}`;
        }
        
        function eliminarCookie() {
            // Eliminar una cookie es establecer su fecha de caducidad en el pasado.
            document.cookie = COOKIE_NAME + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.getElementById('resultadoCookie').innerHTML = `**Cookie eliminada.**`;}