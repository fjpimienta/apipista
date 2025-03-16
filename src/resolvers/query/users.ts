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
      return new UsersService(_, __, context).next();
    },
    async me(_, __, { token }) {
      return new UsersService(_, __, { token }).auth();
    }
  }
};

export default resolversUsersQuery;