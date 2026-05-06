// Vista para listar los links
export function vistaLinks(links) {

    return `
    <h2>Redes sociales</h2>
  
    ${links.map(l => `
      <div>
        <p>${l.platform}</p>
        <a href="${l.url}">${l.url}</a>
  
        <br>
  
        <a href="/link/delete/${l.id}">Borrar</a>
      </div>
    `).join('')}
    `;
  }