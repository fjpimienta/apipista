import passport from 'passport';
import { Strategy as OAuth2Strategy, VerifyCallback } from 'passport-oauth2';
import dotenv from 'dotenv';

dotenv.config();

passport.use(new OAuth2Strategy({
  authorizationURL: process.env.OAUTH_AUTHORIZATION_URL!,
  tokenURL: process.env.OAUTH_TOKEN_URL!,
  clientID: process.env.OAUTH_CLIENT_ID!,
  clientSecret: process.env.OAUTH_CLIENT_SECRET!,
  callbackURL: process.env.OAUTH_CALLBACK_URL!,
}, (accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) => {
  // Aquí puedes buscar o crear el usuario en tu base de datos
  // y devolver el usuario a través de la función done
  done(null, profile);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user as Express.User);
});

export default passport;