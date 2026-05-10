export function vistaFormularioProyecto(
  proyecto={}
) {

  return `
  <html>

  <head>
    <link rel="stylesheet" href="/style.css">
  </head>

  <body>

  <h1>
    ${
      proyecto.id
        ? 'Editar Proyecto'
        : 'Nuevo Proyecto'
    }
  </h1>

  <form method="POST" action="/projects/save">

    <input
      type="hidden"
      name="id"
      value="${proyecto.id || ''}"
    >

    <input
      name="title"
      placeholder="Título"
      value="${proyecto.title || ''}"
      required
    >

    <textarea
      name="description"
      placeholder="Descripción"
    >${proyecto.description || ''}</textarea>

    <input
      name="repo_url"
      placeholder="Repositorio"
      value="${proyecto.repo_url || ''}"
    >

    <input
      name="live_url"
      placeholder="Demo"
      value="${proyecto.live_url || ''}"
    >

    <button>Guardar</button>

  </form>

  <a href="/dashboard">Volver</a>

  </body>
  </html>
  `;
}