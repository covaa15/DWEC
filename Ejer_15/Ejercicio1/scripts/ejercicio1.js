let imagenesCargadas = [];

const inputArchivo = document.querySelector('#archivo');
const zonaArrastre = document.querySelector('#zona-arrastre');
const formulario = document.querySelector('#opciones-edicion');
const contenedorPrevisualizacion = document.querySelector('#previsualizacion');
const contenedorDescargas = document.querySelector('#descargas');

//Cuando hago clic se abre el selector de archivos
zonaArrastre.addEventListener('click', () => inputArchivo.click());

//Cuando arrastro archivos sobre la zona de arrastre
zonaArrastre.addEventListener('dragover', (e) => {
    e.preventDefault();
    zonaArrastre.classList.add('arrastrando');
});

//Cuando dejo de arrastrar fuera de la zona
zonaArrastre.addEventListener('dragleave', () => zonaArrastre.classList.remove('arrastrando'));

//Cuando suelto archivos en la zona
zonaArrastre.addEventListener('drop', (event) => {
    event.preventDefault();
    zonaArrastre.classList.remove('arrastrando');
    cargarImagenes(event.dataTransfer.files);
});

//Cuando selecciono archivos desde el input
inputArchivo.addEventListener('change', (event) => cargarImagenes(event.target.files));

//Cuando hago clic en procesar imagenes
formulario.addEventListener('submit', (event) => {
    event.preventDefault();
    procesarImagenes();
});

//Funcion para mostrar previsualización de imagenes
function cargarImagenes(files) {
    contenedorPrevisualizacion.innerHTML = '';
    imagenesCargadas = [];

    Array.from(files).forEach(file => {

        //Verifico que sea imagen
        if (!file.type.match('image.*')) {
            //Alerta si no lo es
            alert(`${file.name} no es una imagen`);
            return;
        }

        const lector = new FileReader();
        lector.onload = (e) => {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.classList.add('imagenMiniatura');
            contenedorPrevisualizacion.appendChild(img);
            imagenesCargadas.push(file);
        };
        lector.readAsDataURL(file);
    });
}

//Funcion para procesar y modificar imágenes
function procesarImagenes() {
    const marcaAgua = document.querySelector('#marca-agua').value;
    const anchoMaximo = parseInt(document.querySelector('#ancho-maximo').value);
    const formato = document.querySelector('#formato-salida').value;

    contenedorDescargas.innerHTML = '';

    imagenesCargadas.forEach(file => {
        const lector = new FileReader();
        lector.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const contexto = canvas.getContext('2d');

                const ratio = anchoMaximo > 0 ? Math.min(1, anchoMaximo / img.width) : 1;
                canvas.width = img.width * ratio;
                canvas.height = img.height * ratio;

                //Dibujo imagen en canvas
                contexto.drawImage(img, 0, 0, canvas.width, canvas.height);

                if (marcaAgua) {
                    const fontSize = canvas.width * 0.05;
                    contexto.font = `${fontSize}px Arial`;
                    contexto.fillStyle = 'rgba(255, 255, 255, 0.7)';
                    contexto.textAlign = 'center';
                    contexto.fillText(marcaAgua, canvas.width / 2, canvas.height - 20);
                }

                canvas.toBlob((blob) => {
                    const url = URL.createObjectURL(blob);
                    const enlace = document.createElement('a');
                    enlace.href = url;
                    enlace.download = `editada-${file.name}`;
                    enlace.textContent = `Descargar ${file.name}`;
                    contenedorDescargas.appendChild(enlace);
                }, `image/${formato}`);
            };
        };
        lector.readAsDataURL(file);
    });
}
