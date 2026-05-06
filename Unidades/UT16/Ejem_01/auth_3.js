import passport from 'passport';
import expressSession from 'express-session';
import LocalStrategy from 'passport-local';

export default function (app) {
  passport.serializeUser((user, done) => done(null, user.username));
  passport.deserializeUser((id, done) => {
   const user = {
      username: 'Manuel',
      firstname: 'Ruiz',
      lastname: 'Cuesta',
    };
    done(null, user);
  });
 
  passport.use(
    new LocalStrategy((username, password, done) => {
    if (username === 'manuel' && password === 'test') {
        // Login correcto
        done(null, {
            username: 'Manuel',
            firstname: 'Ruiz',
            lastname: 'Cuesta',
            }
        );
        } else {
            // Credenciales incorrectas
        done(null, false);
        // si done(err) Error interno
    }
    }),
  );

  app.use(
    expressSession({
      secret: 'top secret',
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  
// Maneja el login usando la estrategia local.
// Si el login falla, vuelve al formulario.
// Si tiene éxito, redirige a /.
  app.post(
    '/login',
    passport.authenticate('local', { failureRedirect: '/login.html' }),
    (request, response) => {
    response.redirect('/');
    },
  );

  app.get('/logout', (request, response, next) => {
    request.logout((err) => {
      if (err) {
        return next(err);
      }
      response.redirect('/login.html');
    });
  });
}