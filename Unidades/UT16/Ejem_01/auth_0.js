import passport from 'passport';
import expressSession from 'express-session';

// Exporta una función que recibe la app de Express
export default function (app) {

// Se ejecuta cuando el usuario hace login
// Decide qué dato del usuario se guarda en la sesión
  passport.serializeUser((user, done) => done(null, user.username));

// Se ejecuta en cada petición cuando hay una sesión activa
// Recibe el id (en este caso, el username)
// Reconstruye el objeto user completo
  passport.deserializeUser((id, done) => {
    const user = {
      username: 'Manuel',
      firstname: 'Ruiz',
      lastname: 'Cuesta',
    };
    done(null, user);
  });
// Una sesión es una forma de recordar a un usuario entre distintas peticiones HTTP
// Configura las sesiones de Express:
// secret: clave para firmar la cookie (debe ser segura en producción)
// resave: false: no guarda la sesión si no cambió
// saveUninitialized: false: no crea sesiones vacías
// Esto es lo que permite que el navegador recuerde al usuario.
  app.use(
    expressSession({
      secret: 'top secret',
      resave: false,
      saveUninitialized: false,
    }),
  );
  // Inicializa Passport
  app.use(passport.initialize());
  // Conecta Passport con las sesiones de Express
  app.use(passport.session());
}
// Saber si el usuario está logueado
// Añadir req.user automáticamente