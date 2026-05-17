import * as modelo from './model.js';
import { vistaInicial } from './view.js';
import { conexionBD } from '../db.js';

const urlApi='https://api.tvmaze.com/search/shows?q=comedy';

export async function importarDatos(req,res) {
    try{
        const resultados=await fetch(urlApi)
        .then((respuesta)=>{
            return respuesta.json();
        }).catch((error)=>{
            console.log(error);
        })

        //Saco los datos que me interesan

        const seriesApi= resultados.map(({score,show})=>({
            tvmaze_id:show.id,
            title:show.name,
            release_year:show.premiered,
            platform:show.network?.name || show.webChannel?.name,
            image_url:show.image?.medium ?? null,
            api_score:score

        }));

        //Obtengo los id que tenfo almacenados en la bs
        const idsExistentes=await modelo.obtenerIDS();

        const seriesNuevas = seriesApi.filter((serie)=>{
            if(!idsExistentes.includes(serie.tvmaze_id))
            return serie;
        })
        //Añado las nuevas  a la bd
        for (const serie of seriesNuevas) {
            await modelo.crearSeries(serie);
        } 

        res.redirect('/series');
    }catch(error){
        console.log(error);
        res.redirect('/series');
    }
}

// Otengo tos los libros y los muestro en la vista
export async function mostrarSeries(req, res) {
  const series = await modelo.obtenerTodasSeries();
  res.send(vistaInicial(series));
}