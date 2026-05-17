export function vistaInicial(series){
    const haySeriesBD=series.length>0;

let catalogo;
if(haySeriesBD===true){
catalogo=`
<div class="tarjetas">

    ${series.map((serie)=>`
        <div class="tarjeta">
            <img src="${serie.image_url}" alt="${serie.title}" />
            <h3>${serie.title}</h3>
            <p>${serie.release_year ?? 'Desconocido'}</p>
            <p>${serie.platform}</p>
            <p>⭐ Puntuación API: ${Number(serie.api_score).toFixed(1)}</p>

        </div>`
    ).join('')}

    </div>
`

}else{
catalogo =`<div class="tarjetas">
<p>La base de datos esta vacia. Por favor, pulse el boton de "Probar Catalogo" para comenzar.</p>
</div>`
}

return`
<html>
 <link rel="stylesheet" href="/style.css" />
    <body>

    <div>
    <button><a href='/users'></a>Iniciar Sesion</button>
    <button><a href='/users/registro'></a>Registrarse</button>
    </div>
    <h1>Mis Series</h1>

    <div>
        <h2>Configuracion Inicial</h2>
        <button id = "btnInicial">Probar Catalogo de Comedia</button>
    </div>
        ${catalogo}
    <script>

    document.getElementById('btnInicial').addEventListener('click',async()=>{
        try{
            const res = await fetch ('/series/importarComedia');

            if(res.ok)
                location.reload();
            
            
            
        }catch(error){}
        })

    </script>
   </body> 
</html>
`

}