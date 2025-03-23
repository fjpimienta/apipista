import { COLLECTIONS, EXPIRETIME, MESSAGES } from '../config/constants.js';
import { IContextData } from '../interfaces/context-data.interface.js';
import { findOneElement } from '../lib/db-operations.js';
import ResolversOperationsService from './resolvers-operaciones.service.js';
import bcrypt from 'bcrypt';
import JWT from '../lib/jwt.js';
import MailService from './mail.service.js';
import { IUser } from '../interfaces/user.interface.js';
import dotenv from 'dotenv';

dotenv.config();
   
class AuthService extends ResolversOperationsService {
  collection = COLLECTIONS.USERS;
  catalogName = 'Usuarios';
  email_admin = process.env.EMAIL_ADMIN!;
  
  constructor(root: object, variables: object, context: IContextData) {
    super(root, variables, context);
  }

  // Obtener detalles del item (login)
  async login() {
    try {
      const variables = this.getVariables().user;
      const userDocument = await findOneElement(this.getDB(), this.collection, { email: variables?.email });

      if (!userDocument) {
        return {
          status: false,
          message: 'El correo electrónico no está registrado. Por favor, verifique su correo o registrese.',
          token: null
        };
      }

      // Convertir el documento de MongoDB en IUser
      const user: IUser = Object.assign({}, userDocument, { email: userDocument.email ?? '' });

      const passwordCheck =
        variables?.password && user.password
          ? bcrypt.compareSync(variables.password, user.password)
          : false;

      if (passwordCheck) {
        delete user.password;
        delete user.registerdate;
      }

      if (!user.active) {
        return {
          status: false,
          message: `Lo sentimos, este usuario no está activo. Verificar su cuenta de correo o contacte a ${this.email_admin}`,
          token: null
        };
      }

      return {
        status: passwordCheck,
        message: !passwordCheck
          ? 'Lo sentimos el Usuario o Password son incorrectos, sesión no iniciada.'
          : 'El Usuario ha sido verificado, puedes continuar.',
        token: !passwordCheck ? null : new JWT().sign({ user }, EXPIRETIME.H24),
        user: !passwordCheck ? null : user
      };
    } catch (error) {
      console.log('error: ', error);
      return {
        status: false,
        message: `Lo sentimos hay un error al cargar el usuario. Por favor contáctanos a ${this.email_admin} para brindarte apoyo`,
        token: null
      };
    }
  }

  // Autenticar
  async auth() {
    try {
      // Verificar si hay token
      if (!this.getContext().token) {
        return {
          status: false,
          message: 'No hay token proporcionado',
          user: null
        };
      }

      // Verificar y decodificar el token
      const info = new JWT().verify(this.getContext().token!);
      
      if (info === MESSAGES.TOKEN_VERICATION_FAILED) {
        return {
          status: false,
          message: 'Token inválido o expirado',
          user: null
        };
      }

      // Verificar si el usuario existe en la base de datos
      const userData = Object.values(info)[0] as IUser;
      const userCheck = await findOneElement(this.getDB(), this.collection, { 
        email: userData.email 
      });

      if (!userCheck) {
        return {
          status: false,
          message: 'Usuario no encontrado en el sistema',
          user: null
        };
      }

      if (!userCheck.active) {
        return {
          status: false,
          message: 'Usuario inactivo',
          user: null
        };
      }

      // Eliminar datos sensibles
      delete userCheck.password;
      
      return {
        status: true,
        message: 'Usuario autenticado correctamente',
        user: userCheck
      };
    } catch (error) {
      console.log('Error en auth:', error);
      return {
        status: false,
        message: `Error de autenticación: ${error}`,
        user: null
      };
    }
  }

  // Activar Usuario
  async active() {
    const id = this.getVariables().user?.id;
    const email = this.getVariables().user?.email || '';
    const admin = this.getVariables().admin || '';
    if (email === undefined || email === '') {
      return {
        status: false,
        message: `Lo sentimos hay un errror al cargar el email. Por favor contáctanos a ${this.email_admin} para brindarte apoyo`
      };
    }
    const token = new JWT().sign({ user: { id, email } }, EXPIRETIME.H1);
    let html = '';
    if (admin) {
      html = `
      <header>
          <h1>Bienvenido a #DARUTEAM</h1>
      </header>
      <main>
          <h2>¡Bienvenido a nuestro TEAM!</h2>
          <p>Estamos emocionados de tenerte como parte de nuestra comunidad, para poder continuar es necesario que actives tu cuenta.</p>
          <div style="text-align: center;">
            <a href="${process.env.CLIENT_URL_ADMIN}auth/active/${token}" style="text-decoration: none; cursor: pointer;">
              <button style="background-color: #007bff; color: #fff; border: none; padding: 10px 20px; border-radius: 4px; font-size: 16px;">Activar cuenta</button>
            </a>
          </div>
          <p>&nbsp;</p>
          <p>&nbsp;</p>
      </main>
      <footer>
          <p>&nbsp;</p>
      </footer>
      `
    } else {
      html = `
      <header>
          <h1>Bienvenido a #DARUTEAM</h1>
      </header>
      <main>
          <h2>¡Bienvenido a nuestro TEAM!</h2>
          <p>Estamos emocionados de tenerte como parte de nuestra comunidad, para poder continuar es necesario que actives tu cuenta.</p>
          <div style="text-align: center;">
            <a href="${process.env.CLIENT_URL}active/${token}" style="text-decoration: none; cursor: pointer;">
              <button style="background-color: #007bff; color: #fff; border: none; padding: 10px 20px; border-radius: 4px; font-size: 16px;">Activar cuenta</button>
            </a>
          </div>
          <p>&nbsp;</p>
          <p>Consulta nuestros terminos y condiciones. <a href="${process.env.CLIENT_URL}terminos" style="text-decoration: none; color: #007bff; padding: 5px 10px; background-color: #f0f0f0; border-radius: 4px;">Click aqui</a></p>
      </main>
      <footer>
          <p>Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos. <a href="${process.env.CLIENT_URL}contact" style="text-decoration: none; color: #007bff; padding: 5px 10px; background-color: #f0f0f0; border-radius: 4px;">Click Aqui</a></p>
      </footer>
      `
    }
    const mail = {
      to: email,
      subject: 'Activar Usuario',
      html
    };
    return new MailService().send(mail);
  }

}

export default AuthService;