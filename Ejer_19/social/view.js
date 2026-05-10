export function vistaFormularioSocial(
  link={}
) {

  return `
  <html>

  <head>
    <link rel="stylesheet" href="/style.css">
  </head>

  <body>

  <h1>
    ${
      link.id
        ? 'Editar Red Social'
        : 'Nueva Red Social'
    }
  </h1>

  <form method="POST" action="/social/save">

    <input
      type="hidden"
      name="id"
      value="${link.id || ''}"
    >

    <input
      name="platform"
      placeholder="Plataforma"
      value="${link.platform || ''}"
      required
    >

    <input
      name="url"
      placeholder="URL"
      value="${link.url || ''}"
      required
    >

    <button>Guardar</button>

  </form>

  <a href="/dashboard">Volver</a>

  </body>
  </html>
  `;
}