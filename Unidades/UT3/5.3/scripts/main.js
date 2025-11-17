function init() {

  (function() {
    const element = document.querySelector('#news li:nth-child(1)');
    // esto no funciona
    element.textContent = '<strong>Record news:</strong> New album by <em>Tool</em> not yet released.';
  })();

}

document.addEventListener('DOMContentLoaded', init);