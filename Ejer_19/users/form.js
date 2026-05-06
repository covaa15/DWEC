// Formulario login
export function formLogin(error = '') {
  return `
  <h1>Login</h1>
  ${error ? `<p style="color:red">${error}</p>` : ''}

  <form method="post" action="/login">
    <input name="username">
    <input type="password" name="password">
    <button>Entrar</button>
  </form>
  `;
}

// Formulario register
export function formRegister(error = '') {
  return `
  <h1>Registro</h1>

  <form method="post" action="/register">
    <input name="username">
    <input name="email">
    <input type="password" name="password">
    <input name="photo" placeholder="URL foto">
    <button>Crear</button>
  </form>
  `;
}

// Formulario editar perfil
export function formEditarPerfil(user) {
  return `
  <form method="post" action="/users/update">

    <textarea name="bio">${user.bio || ''}</textarea>

    <input name="email" value="${user.email}">

    <input name="photo" value="${user.photo || ''}">

    <img src="${user.photo || 'https://via.placeholder.com/150'}" width="100">

    <button>Guardar</button>

  </form>
  `;
}