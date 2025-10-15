const arrastrable = document.querySelector('.arrastrable');
const contenedor = document.querySelector('.contenedor');

let arrastrando = false;
let posX, posY;

//Haxemos el click
arrastrable.addEventListener("mousedown", function (e) {
    // arrastramos
    arrastrando = true;
    arrastrable.classList.add("arrastrando");
    // guardamos la posición del click
    posX = e.offsetX;
    posY = e.offsetY;
});

// Soltamos el click
document.addEventListener("mouseup", function () {

    // dejamos de arrastrar
    arrastrando = false;
    arrastrable.classList.remove("arrastrando");
});

// Movemos el ratón
document.addEventListener("mousemove", function (e) {
    if (!arrastrando) return;

    // Medimos el área del contenedor
    const rect = contenedor.getBoundingClientRect();

    // Calculo la nueva posicion del div arrastrableF
    let x = e.clientX - rect.left - posX;
    let y = e.clientY - rect.top - posY;

    // No dejo que salga del contenedor
    x = Math.max(0, Math.min(rect.width - arrastrable.offsetWidth, x));
    y = Math.max(0, Math.min(rect.height - arrastrable.offsetHeight, y));

    // Muevo el div
    arrastrable.style.left = x + "px";
    arrastrable.style.top = y + "px";
});