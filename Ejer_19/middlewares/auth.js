// Funcion que comprueba si el usuario está logueado
export function soloAutenticados(req, res, next) {

    // Si no hay usuario en la sesion lo mando al login
    if (!req.session?.user) {
      return res.redirect('/login');
    }
  
    // Si esta logueado continuo
    next();
  }