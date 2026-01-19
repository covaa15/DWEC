# Guía para la API de la Línea de Comandos (Consola)
## Preparación

1.  Abre el archivo `index.html` en tu navegador (Chrome, Firefox, Edge, etc.).
2.  Abre las **Herramientas de Desarrollador** pulsando la tecla `F12`.
3.  Ve a la pestaña **"Consola"** (`Console`).

Todos los comandos que aparecen a continuación deben escribirse en la consola y ejecutarse pulsando `Enter`.

---

## 1. Selección de Elementos del DOM

La consola proporciona atajos muy convenientes para seleccionar elementos de la página, similares a `document.querySelector` y `document.querySelectorAll`.

### `$()` - Seleccionar el primer elemento que coincida

Es un alias de `document.querySelector()`. Devuelve el **primer** elemento que encuentra.

```javascript
// Selecciona el primer elemento <li> de la página
$('li')

// Selecciona el elemento con el id 'principal'
$('#principal')

// Selecciona el primer elemento que tenga la clase 'importante'
$('.importante')
```

### `$$()` - Seleccionar todos los elementos que coincidan

Es un alias de `document.querySelectorAll()`. Devuelve un **array** con todos los elementos que coinciden.

```javascript
// Selecciona TODOS los elementos <li> de la página
$$('li')

// Selecciona TODOS los divs que están dentro de la sección con id 'seccion-datos'
$$('#seccion-datos div')
```
*Puedes expandir el array que devuelve para inspeccionar cada elemento.*

### `$x()` - Seleccionar elementos usando XPath

Si estás familiarizado con XPath, puedes usar `$x()` para hacer selecciones más complejas.

```javascript
// Selecciona todos los enlaces <a> que están dentro de un <li>
$x('//li/a')
```

### `$0`, `$1`, etc. - Historial de inspección

Las herramientas de desarrollador guardan un historial de los últimos elementos que has seleccionado en la pestaña **"Elementos"** (`Elements`).

1.  Ve a la pestaña "Elementos".
2.  Haz clic para seleccionar cualquier elemento de la página (ej. el botón).
3.  Vuelve a la pestaña "Consola" y escribe:

```javascript
// Muestra el último elemento que seleccionaste en la pestaña "Elementos"
$0 

// Muestra el penúltimo que seleccionaste
$1
```
---

## 2. Inspección y Análisis

Una vez que tienes un elemento, puedes hacer mucho más que simplemente verlo.

### `inspect()` - Ir a un elemento en el panel "Elementos"

Esta función te lleva directamente a la representación de un elemento en el árbol DOM de la pestaña "Elementos".

```javascript
// Selecciona el botón
const miBoton = $('#mi-boton');

// Ahora, inspecciónalo
inspect(miBoton);
```
*Verás cómo tu vista salta a la pestaña "Elementos" y resalta la etiqueta `<button>`.*

### `dir()` - Listar propiedades de un objeto

Mientras que `console.log()` muestra una representación optimizada de un elemento DOM, `dir()` te muestra todas sus propiedades como un objeto JavaScript.

```javascript
// Compara la salida de estos dos comandos para el mismo elemento
console.log($('#principal'));
dir($('#principal'));
```

### `getEventListeners()` - Ver los eventos asignados a un elemento

Esta función súper útil te muestra todos los "event listeners" que están registrados en un elemento.

```javascript
// Obtén el botón
const miBoton = $('#mi-boton');

// Muestra un objeto con todos los eventos que está "escuchando" este botón
getEventListeners(miBoton);
```
*Expande la salida y verás los eventos `click` y `mouseover` que registramos en `script.js`.*

---

## 3. Depuración y Monitorización

Puedes controlar la ejecución de tu código y monitorizar eventos directamente desde la consola.

### `monitorEvents()` - Escuchar eventos en tiempo real

Este comando imprimirá en la consola cada vez que un evento específico ocurra en un objeto.

```javascript
// Empieza a monitorizar los eventos de ratón en el botón
monitorEvents($('#mi-boton'), 'mouse');
```
*Ahora, mueve el ratón sobre el botón, haz clic, etc. Verás un torrente de información en la consola. Para detenerlo, usa `unmonitorEvents()`.*

```javascript
// Detiene la monitorización de eventos en el botón
unmonitorEvents($('#mi-boton'));

// También puedes monitorizar eventos específicos
monitorEvents($('#mi-boton'), ['click', 'mouseover']);
```

### `debug()` y `undebug()` - Depurar una función

`debug()` establece un punto de interrupción al inicio de una función. La ejecución del código se pausará cada vez que esa función sea llamada.

```javascript
// En nuestro script, hemos definido una función global llamada 'saludar'
// Vamos a establecer un punto de interrupción en ella.
debug(saludar);

// Ahora, llama a la función.
saludar('Estudiante');
```
*La ejecución se pausará y las herramientas de desarrollador te llevarán a la pestaña "Sources" para que puedas depurar el código línea por línea. Para quitar el punto de interrupción, usa `undebug()`.*

```javascript
// Quita el punto de interrupción
undebug(saludar);
```

