// Formulario para crear un enlace
export function formLink(link = {}, error = '') {

    return `
    <h2>Formulario enlace</h2>
  
    ${error ? `<p style="color:red">${error}</p>` : ''}
  
    <form method="post" action="/link">
  
      <input type="hidden" name="id" value="${link.id || ''}">
  
      <div>
        <label>Plataforma:</label>
        <input type="text" name="platform" value="${link.platform || ''}">
      </div>
  
      <div>
        <label>URL:</label>
        <input type="text" name="url" value="${link.url || ''}">
      </div>
  
      <button type="submit">Guardar</button>
  
    </form>
    `;
  }