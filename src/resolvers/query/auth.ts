import { IResolvers } from '@graphql-tools/utils';
import AuthService from '../../services/auth.service.js';

const resolversAuthsQuery: IResolvers = {
  Query: {
    async login(_, { email, password, include }, context) {
      try {
        const result = await new AuthService(_, { user: { email, password } }, context).login();
        if (result.user) {
          // Aseguramos que el password no se envíe
          result.user.password = '';
        }
        return result;
      } catch (error) {
        return {
          status: false,
          message: 'Error en login: ' + error,
          token: null,
          user: null
        };
      }
    },
    async me(_, __, context) {
      if (!context || !context.token) {
        return {
          status: false,
          message: 'Token no proporcionado',
          user: null
        };
      }

      try {
        const authResponse = await new AuthService(_, __, context).auth();
        return authResponse;
      } catch (error) {
        console.log('Error en me resolver:', error);
        return {
          status: false,
          message: 'Error en la autenticación: ' + error,
          user: null
        };
      }
    }
  }
};

export default resolversAuthsQuery;