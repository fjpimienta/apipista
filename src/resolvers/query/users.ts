import { IResolvers } from '@graphql-tools/utils';
import UsersService from '../../services/users.service.js';

const resolversUsersQuery: IResolvers = {
  Query: {
    async users(_, args, context) {
      try {
        const users = await new UsersService(_, args, context).items();
        return {
          status: true,
          message: 'Lista de usuarios cargada correctamente',
          users: users || [],
          info: {
            page: args.page || 1,
            pages: Math.ceil((users?.length || 0) / (args.itemsPage || 10)),
            total: users?.length || 0,
            itemsPage: args.itemsPage || 10
          }
        };
      } catch (error) {
        return {
          status: false,
          message: 'Error al cargar los usuarios: ' + error,
          users: [],
          info: {
            page: 1,
            pages: 0,
            total: 0,
            itemsPage: 10
          }
        };
      }
    },
    async userId(_, __, context) {
      try {
        const result = await new UsersService(_, __, context).next();
        return {
          status: true,
          message: 'ID de usuario obtenido correctamente',
          user: { id: result.userId }
        };
      } catch (error) {
        return {
          status: false,
          message: 'Error al obtener ID de usuario: ' + error,
          user: null
        };
      }
    },
    async user(_, { id }, context) {
      try {
        const user = await new UsersService(_, { id }, context).getUser(id);
        return {
          status: true,
          message: 'Usuario encontrado correctamente',
          user
        };
      } catch (error) {
        return {
          status: false,
          message: 'Error al obtener usuario: ' + error,
          user: null
        };
      }
    }
  }
};

export default resolversUsersQuery;