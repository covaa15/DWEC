// Espera a que el DOM esté completamente cargado para asegurar que todos los elementos HTML existen.
document.addEventListener('DOMContentLoaded', () => {

    // --- OBTENER REFERENCIAS A ELEMENTOS DEL DOM ---
    // Se obtienen los elementos del HTML con los que vamos a interactuar.
    const selectorArchivos = document.getElementById('selector-archivos');
    const zonaSoltar = document.getElementById('zona-soltar');
    const listaArchivos = document.getElementById('lista-archivos');
    const contenedorProgreso = document.getElementById('contenedor-progreso');
    const barraProgreso = document.getElementById('barra-progreso');

    
    // --- EVENT LISTENERS ---
    // Se asignan funciones a los eventos que nos interesan.

    // 1. Evento 'change' para el input de tipo 'file'.
    // Se dispara cuando el usuario selecciona uno o más archivos usando el diálogo del sistema.
    selectorArchivos.addEventListener('change', manejarSeleccionDeArchivos);

    // 2. Eventos para la zona de "arrastrar y soltar".
    // 'dragover' se dispara continuamente mientras un elemento se arrastra sobre la zona.
    zonaSoltar.addEventListener('dragover', manejarDragOver);
    // 'dragleave' se dispara cuando el elemento arrastrado sale de la zona.
    zonaSoltar.addEventListener('dragleave', manejarDragLeave);
    // 'drop' se dispara cuando el usuario suelta el elemento sobre la zona.
    zonaSoltar.addEventListener('drop', manejarDrop);


    // --- MANEJADORES DE EVENTOS (EVENT HANDLERS) ---

    /**
     * Se activa con el evento 'change' del input.
     * @param {Event} evt - El objeto del evento.
     */
    function manejarSeleccionDeArchivos(evt) {
        // 'evt.target.files' es un objeto FileList que contiene los archivos seleccionados.
        const archivos = evt.target.files;
        // Llama a la función principal que procesa los archivos.
        procesarArchivos(archivos);
    }

    /**
     * Previene el comportamiento por defecto del navegador para el evento 'dragover'.
     * Esto es CRUCIAL, ya que sin ello, el navegador simplemente abriría el archivo.
     * También añade una clase para dar feedback visual al usuario.
     * @param {DragEvent} evt - El objeto del evento de arrastre.
     */
    function manejarDragOver(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        // Añade una clase CSS para resaltar la zona y mostrar que es un destino válido.
        zonaSoltar.classList.add('dragover');
    }

    /**
     * Elimina la clase de feedback visual cuando el arrastre sale de la zona.
     * @param {DragEvent} evt - El objeto del evento de arrastre.
     */
    function manejarDragLeave(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        zonaSoltar.classList.remove('dragover');
    }

    /**
     * Se activa cuando los archivos son soltados en la zona.
     * @param {DragEvent} evt - El objeto del evento de arrastre.
     */
    function manejarDrop(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        zonaSoltar.classList.remove('dragover');
        
        // 'evt.dataTransfer.files' contiene los archivos arrastrados.
        const archivos = evt.dataTransfer.files;
        // Llama a la función principal que procesa los archivos.
        procesarArchivos(archivos);
    }


    // --- LÓGICA PRINCIPAL DE PROCESAMIENTO ---

    /**
     * Procesa la lista de archivos (FileList) seleccionados.
     * @param {FileList} archivos - La lista de archivos a procesar.
     */
    function procesarArchivos(archivos) {
        // Si no se seleccionó ningún archivo, no hace nada.
        if (archivos.length === 0) {
            return;
        }

        // Limpia el contenido anterior de la lista.
        listaArchivos.innerHTML = '<ul></ul>';
        const ul = listaArchivos.querySelector('ul');

        // Itera sobre cada archivo en el FileList.
        for (const archivo of archivos) {
            const li = document.createElement('li');

            // Muestra información básica del archivo.
            // La API File nos da acceso a propiedades como 'name', 'size', 'type' y 'lastModifiedDate'.
            li.innerHTML = `
                <strong>${archivo.name}</strong>
                <div class="info-archivo">
                    Tamaño: ${(archivo.size / 1024).toFixed(2)} KB | 
                    Tipo: ${archivo.type || 'No especificado'} | 
                    Última modificación: ${new Date(archivo.lastModified).toLocaleDateString()}
                </div>
            `;
            
            // Llama a la función para leer y mostrar el contenido del archivo.
            leerContenidoArchivo(archivo, li);

            ul.appendChild(li);
        }
    }

    /**
     * Lee el contenido de un archivo usando un FileReader y lo muestra.
     * @param {File} archivo - El archivo a leer.
     * @param {HTMLElement} elementoLista - El elemento <li> donde se mostrará el contenido.
     */
    function leerContenidoArchivo(archivo, elementoLista) {
        // FileReader es el objeto que nos permite leer el contenido de los archivos.
        const reader = new FileReader();

        // --- Event Listeners del FileReader ---
        
        // 'loadstart': Se dispara cuando la lectura comienza.
        reader.addEventListener('loadstart', () => {
            contenedorProgreso.style.display = 'block';
            actualizarProgreso(0);
        });

        // 'progress': Se dispara periódicamente mientras el archivo se está leyendo.
        reader.addEventListener('progress', (evt) => {
            if (evt.lengthComputable) {
                const porcentaje = Math.round((evt.loaded / evt.total) * 100);
                actualizarProgreso(porcentaje);
            }
        });

        // 'load': Se dispara cuando la lectura ha terminado exitosamente.
        reader.addEventListener('load', (evt) => {
            // 'evt.target.result' contiene el contenido del archivo.
            const contenido = evt.target.result;
            
            // Comprueba si el archivo es una imagen para mostrar una miniatura.
            // La propiedad 'type' del objeto File nos ayuda a identificarlo.
            if (archivo.type.startsWith('image/')) {
                const img = document.createElement('img');
                img.src = contenido;
                img.classList.add('previsualizacion-imagen');
                elementoLista.appendChild(img);
            } 
            // Si es un archivo de texto, muestra su contenido.
            else if (archivo.type.startsWith('text/')) {
                const pre = document.createElement('pre');
                pre.textContent = contenido;
                elementoLista.appendChild(pre);
            }

            actualizarProgreso(100);
            // Oculta la barra de progreso después de un momento.
            setTimeout(() => {
                contenedorProgreso.style.display = 'none';
            }, 1000);
        });

        // 'error': Se dispara si ocurre un error durante la lectura.
        reader.addEventListener('error', () => {
            elementoLista.append('<p style="color: red;">Error al leer el archivo.</p>');
            contenedorProgreso.style.display = 'none';
        });

        // --- Iniciar la Lectura ---
        
        // Se decide cómo leer el archivo según su tipo.
        if (archivo.type.startsWith('image/')) {
            // readAsDataURL lee el archivo y lo codifica en Base64.
            // Es útil para mostrar imágenes o incrustar datos en el HTML.
            reader.readAsDataURL(archivo);
        } else if (archivo.type.startsWith('text/')) {
            // readAsText lee el archivo como una cadena de texto.
            reader.readAsText(archivo, 'UTF-8');
        } else {
            // Para otros tipos de archivo, no intentamos mostrar el contenido,
            // pero sí la barra de progreso.
            contenedorProgreso.style.display = 'block';
            actualizarProgreso(100);
            setTimeout(() => {
                contenedorProgreso.style.display = 'none';
            }, 500);
        }
    }

    /**
     * Actualiza la barra de progreso visual.
     * @param {number} porcentaje - El porcentaje de carga (0-100).
     */
    function actualizarProgreso(porcentaje) {
        barraProgreso.style.width = porcentaje + '%';
        barraProgreso.textContent = porcentaje + '%';
    }
});
