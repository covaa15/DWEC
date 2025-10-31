// La función init se llama cuando el DOM está completamente cargado.
function init() {
  // Obtiene el elemento donde se mostrará el contenido.
  const contentElement = document.getElementById('content');
  // Esta es una muestra del contenido que normalmente se cargará.
  const contents = {
    home: {
      content: 'Home'
    },
    services: {
      content: 'Services'
    },
    skills: {
      content: 'Skills'
    },
    aboutus: {
      content: 'About Us'
    },
    contact: {
      content: 'Contact'
    }
  };
  // Esta función se llama cuando se hace clic en un enlace.
  function handleClick(event) {
    // Obtiene el nombre de la página del atributo href del enlace.
    const pageName = event.target.getAttribute('href').split('/').pop();
    // Obtiene el contenido de la página.
    const content = contents[pageName];
    // Actualiza el contenido de la página.
    updateContent(content.content);
    // Agrega una nueva entrada al historial del navegador.
    history.pushState(
      content,                    // Objeto de estado
      event.target.textContent,   // Título
      event.target.href           // URL
    );
    // Evita que el navegador siga el enlace.
    return event.preventDefault();
  }
  // Obtiene todos los enlaces de la página y les agrega un detector de eventos.
  const linkElements = document.getElementsByTagName('a');
  for (let i = 0; i < linkElements.length; i++) {
    linkElements[i].addEventListener('click', handleClick, true);
  }

  // Esta función actualiza el contenido de la página.
  function updateContent(content) {
    contentElement.textContent = content;
  }

  // Reemplaza la entrada actual del historial por una nueva.
  history.replaceState(
    {
      content: contentElement.textContent
    },
    document.title,
    document.location.href
  );

  // Este evento se activa cuando cambia la entrada activa del historial.
  window.addEventListener('popstate', (event) => {
    updateContent(event.state.content);
  });

}

// Espera a que el DOM esté completamente cargado antes de ejecutar la función init.
document.addEventListener('DOMContentLoaded', init);