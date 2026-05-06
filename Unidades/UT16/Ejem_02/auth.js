import passport from 'passport';
import expressSession from 'express-session';
import LocalStrategy from 'passport-local';
import { createHash } from 'crypto';
import { get } from './user/model.js';

export default function (app) {
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
  const users = await get({ id });
  const user = users[0];
  if (!user) {
    done('User not found');
  } else {
    done(null, user);
  }
  });
 
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const hash = createHash('md5').update(password).digest('hex');
      const users = await get({ username, password: hash });
      const user = users[0]; //  MUY IMPORTANTE es un array

      if (!user) {
        return done(null, false);
      }

      done(null, user); 
    } catch (err) {
      done(err);
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