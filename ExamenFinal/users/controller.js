import * as modelo from './model.js';
import * as vista from './view.js';


export async function mostrarLogn(req, res) {
    res.send(vista.vistaLogin());
}

export async function mostrarRegistro(req, res) {
    res.send(vista.vistaRegistro());
}

export async  function login(req, res){
    const {email}=req.body;
    const usuario = await modelo.obtenerUsuarioEmail(email);

    if(!usuario){
        return res.send(vista.vistaLogin);
    }
    res.redirect('/series');
}

export async  function registro(req, res){
    const {username,email}=req.body;
    const existe = await modelo.obtenerUsuarioEmail(email);

    if(existe){
        return res.send(vista.vistaRegistro);
    }
    await modelo.crearUsuario({ username, email });
    res.redirect('/series');
}








