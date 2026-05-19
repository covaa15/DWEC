// Cuando elijo un archivo muestro su nombre en el label
document.getElementById('imagenInput').addEventListener('change', function () {
  const nombre = this.files[0]?.name || 'Elegir archivo…';
  document.getElementById('fileName').textContent = nombre;
});

// Cargo todos los alumnos y los muestro por pantalla
async function cargarAlumnos() {
  const grid = document.getElementById('gridAlumnos');
  const loading = document.getElementById('loading');

  loading.style.display = 'block';
  grid.innerHTML = '';

  try {
    const res = await fetch('/alumnos');
    const alumnos = await res.json();
    loading.style.display = 'none';

    if (!alumnos.length) {
      grid.innerHTML = '<p class="empty">No hay alumnos registrados todavía.</p>';
      return;
    }

    alumnos.forEach(a => grid.appendChild(crearFicha(a)));
  } catch (e) {
    loading.style.display = 'none';
    grid.innerHTML = '<p class="empty">Error al cargar los alumnos.</p>';
  }
}

// Creo la tarjeta HTML de cada alumno
function crearFicha(alumno) {
  const div = document.createElement('div');
  div.className = 'ficha';

  const imgSrc = alumno.imagen
    ? `/imagen/${alumno.imagen}`
    : 'https://placehold.co/300x300/e8e4de/7a7268?text=Sin+imagen';

  div.innerHTML = `
    <img src="${imgSrc}" alt="Foto de ${alumno.nombre}"
         onerror="this.src='https://placehold.co/300x300/e8e4de/7a7268?text=Sin+imagen'">
    <div class="ficha-info">
      <div class="ficha-nombre">${alumno.nombre} ${alumno.apellidos}</div>
      <div class="ficha-meta">
        <span>Localidad: ${alumno.localidad || '—'}</span>
      </div>
    </div>
    <button class="btn-delete" data-id="${alumno.id}">Eliminar Alumno</button>
  `;

  div.querySelector('.btn-delete').addEventListener('click', () => eliminarAlumno(alumno.id));
  return div;
}

// Obtengo los datos del formulario y los mando al servidor
document.getElementById('btnAgregar').addEventListener('click', async () => {
  const nombre    = document.getElementById('nombre').value.trim();
  const apellidos = document.getElementById('apellidos').value.trim();
  const localidad = document.getElementById('localidad').value.trim();
  const imagen    = document.getElementById('imagenInput').files[0];
  const btn       = document.getElementById('btnAgregar');
  const mensaje   = document.getElementById('mensaje');

  mensaje.className = 'msg';

  if (!nombre || !apellidos) {
    mensaje.textContent = 'Nombre y apellidos son obligatorios.';
    mensaje.className = 'msg err';
    return;
  }

  // Meto los datos en un FormData para enviar texto e imagen juntos
  const fd = new FormData();
  fd.append('nombre', nombre);
  fd.append('apellidos', apellidos);
  fd.append('localidad', localidad);
  if (imagen) fd.append('imagen', imagen);

  btn.disabled = true;
  btn.textContent = 'Guardando…';

  try {
    const res = await fetch('/alumnos', { method: 'POST', body: fd });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);

    mensaje.textContent = `Alumno "${data.nombre} ${data.apellidos}" registrado correctamente.`;
    mensaje.className = 'msg ok';

    // Limpio el formulario
    ['nombre', 'apellidos', 'localidad'].forEach(id => document.getElementById(id).value = '');
    document.getElementById('imagenInput').value = '';
    document.getElementById('fileName').textContent = 'Elegir archivo…';

    cargarAlumnos();
  } catch (e) {
    mensaje.textContent = `Error: ${e.message}`;
    mensaje.className = 'msg err';
  } finally {
    btn.disabled = false;
    btn.textContent = 'Agregar Alumno';
  }
});

// Elimino un alumno por su id, borra de la BD y del bucket
async function eliminarAlumno(id) {
  if (!confirm('¿Seguro que quieres eliminar este alumno?')) return;
  try {
    const res = await fetch(`/alumnos/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    cargarAlumnos();
  } catch (e) {
    alert(`Error al eliminar: ${e.message}`);
  }
}

// Cargo los alumnos al abrir la pagina
cargarAlumnos();