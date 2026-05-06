// Vista para listar proyectos
export function vistaProyectos(proyectos) {
  return proyectos.map(p => `
    <p>${p.title}
    <a href="/project/delete/${p.id}">Borrar</a>
    </p>
  `).join('');
}