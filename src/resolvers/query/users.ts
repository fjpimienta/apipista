import { IResolvers } from '@graphql-tools/utils';
import UsersService from '../../services/users.service.js';

const resolversUsersQuery: IResolvers = {
  Query: {
    async users(_, _args, context) {
      try {
        const users = await new UsersService(_, {}, context).items();
        if (!users) return [];
        return users;
      } catch (error) {
        console.error('Error en users query:', error);
        return [];
      }
    },
    async userId(_, __, context) {
      const result = await new UsersService(_, __, context).next();
      return result.userId;  // Retornamos solo el userId
    },
    async me(_, __, { token }) {
      return new UsersService(_, __, { token }).auth();
    },
    async user(_, { id }, context) {
      try {
        const user = await new UsersService(_, { id }, context).getUser(id);
        return user;
      } catch (error) {
        console.error('Error en user query:', error);
        return null;
      }
    }
  }
};

export default resolversUsersQuery;