// Espera a que el DOM esté completamente cargado.
document.addEventListener('DOMContentLoaded', () => {

    // --- OBTENER REFERENCIAS A ELEMENTOS DEL DOM ---
    const tareas = document.querySelectorAll('.tarea');
    const columnas = document.querySelectorAll('.columna');

    // --- EVENT LISTENERS PARA LAS TAREAS (ELEMENTOS ARRASTRABLES) ---

    // Itera sobre cada tarea para añadirle los listeners.
    tareas.forEach(tarea => {
        // Evento 'dragstart': Se dispara en el elemento que se empieza a arrastrar.
        tarea.addEventListener('dragstart', (evt) => {
            // Añade una clase para dar feedback visual (ej. cambiar opacidad).
            tarea.classList.add('arrastrando');
            
            // dataTransfer es un objeto que contiene los datos del arrastre.
            // setData(formato, dato) guarda datos que se pueden leer en el evento 'drop'.
            // Aquí guardamos el ID del elemento que estamos arrastrando.
            evt.dataTransfer.setData('text/plain', tarea.id);

            // 'effectAllowed' define el tipo de operación permitida (ej. 'move', 'copy').
            evt.dataTransfer.effectAllowed = 'move';
        });

        // Evento 'dragend': Se dispara en el elemento que se arrastra cuando la operación finaliza (se suelte o se cancele).
        tarea.addEventListener('dragend', () => {
            // Quita la clase de feedback visual.
            tarea.classList.remove('arrastrando');
        });
    });

    // --- EVENT LISTENERS PARA LAS COLUMNAS (ZONAS DE SOLTADO) ---

    // Itera sobre cada columna para añadirle los listeners.
    columnas.forEach(columna => {
        // Evento 'dragenter': Se dispara cuando un elemento arrastrado entra en los límites de la zona de soltado.
        columna.addEventListener('dragenter', (evt) => {
            // Se previene el comportamiento por defecto para permitir el 'drop'.
            evt.preventDefault();
            // Añade una clase para dar feedback visual (ej. resaltar el borde).
            columna.classList.add('dragover');
        });

        // Evento 'dragover': Se dispara continuamente mientras un elemento se arrastra sobre la zona de soltado.
        columna.addEventListener('dragover', (evt) => {
            // Prevenir el comportamiento por defecto es CRUCIAL. Si no se hace,
            // el evento 'drop' nunca se disparará.
            evt.preventDefault();

            // 'dropEffect' debe coincidir con el 'effectAllowed' del 'dragstart'.
            // Indica el tipo de operación que se realizará (ej. un cursor de 'mover').
            evt.dataTransfer.dropEffect = 'move';
        });

        // Evento 'dragleave': Se dispara cuando un elemento arrastrado sale de los límites de la zona de soltado.
        columna.addEventListener('dragleave', () => {
            // Quita la clase de feedback visual.
            columna.classList.remove('dragover');
        });

        // Evento 'drop': Se dispara cuando el elemento se suelta sobre la zona de soltado.
        columna.addEventListener('drop', (evt) => {
            // Previene el comportamiento por defecto (que podría ser abrir un enlace, por ejemplo).
            evt.preventDefault();
            
            // Quita la clase de feedback visual.
            columna.classList.remove('dragover');

            // --- LÓGICA PARA MOVER EL ELEMENTO ---
            
            // 1. Obtener el dato guardado en 'dragstart'. En este caso, el ID de la tarea.
            const idTarea = evt.dataTransfer.getData('text/plain');
            
            // 2. Encontrar el elemento arrastrado en el DOM usando su ID.
            const tareaArrastrada = document.getElementById(idTarea);

            // 3. Comprobar que la tarea existe.
            if (tareaArrastrada) {
                // 4. Añadir el elemento arrastrado a la nueva columna.
                // 'appendChild' mueve el elemento de su ubicación original a la nueva.
                columna.appendChild(tareaArrastrada);
                console.log(`Tarea '${idTarea}' movida a la columna '${columna.id}'.`);
            }
        });
    });
});
