//Funcin que muestra el portforlio
export function vistaPortfolio(user, proyectos, links, esPropietario) {

  return `
  <h1>${user.username}</h1>

  <img src="${user.photo || 'https://via.placeholder.com/150'}" width="120">

  <p>${user.bio}</p>
  <p>${user.email}</p>

  ${esPropietario ? `<a href="/dashboard">Gestionar</a>` : ''}

  <h2>Proyectos</h2>
  ${proyectos.map(p => `<p>${p.title}</p>`).join('')}

  <h2>Links</h2>
  ${links.map(l => `<p>${l.platform}</p>`).join('')}
  `;
}

// Funcion que muestra dashboard
export function vistaDashboard(user, proyectos, links, formPerfil, vistaProyectos, formProyecto, vistaLinks, formLink) {

  return `
  <h1>Dashboard</h1>

  ${formPerfil}

  <h2>Proyectos</h2>
  ${vistaProyectos}
  ${formProyecto}

  <h2>Links</h2>
  ${vistaLinks}
  ${formLink}
  `;
}