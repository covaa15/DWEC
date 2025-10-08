/*28. Necesitamos una lista limpia con los nombres de las
 categorías para nuestro sistema de analítica. Genera un array
  que contenga únicamente el texto de cada párrafo de categoría 
  y muéstralo en la consola. */

  let categorias=[];

  document.querySelectorAll('.card .categoria').forEach((curso) => {
        categorias.push(curso.textContent);
})

console.table(categorias);