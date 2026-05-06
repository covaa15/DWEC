// Formulario para crear o editar un proyecto
export function formProyecto() {
  return `
  <form method="post" action="/project">
    <input name="title" placeholder="titulo">
    <textarea name="description" placeholder="descripcion">
    <input name="repo_url">
    <input name="live_url">
    <button>Crear</button>
  </form>
  `;
}