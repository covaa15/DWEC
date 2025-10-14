const contenedor = document.querySelector('.contenedor');

contenedor.addEventListener('click', function (event) {
    if (event.target !== contenedor) {
        document.body.className = '';

        switch (event.target.id) {
            case 'div1':
                document.body.classList.add('red');
                break;
            case 'div2':
                document.body.classList.add('blue');
                break;
            case 'div3':
                document.body.classList.add('green');
                break;
            case 'div4':
                document.body.classList.add('yellow');
                break;
            case 'div5':
                document.body.classList.add('purple');
                break;
        }
    }
});
