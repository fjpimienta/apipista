import { IResolvers } from '@graphql-tools/utils';
import UsersService from '../../services/users.service.js';

const resolversUsersMutation: IResolvers = {
  Mutation: {
    async register(_, { name, email, password, profile }, context) {
      return new UsersService(_, { user: { name, email, password, profile } }, context).register();
    }
    // ... otros resolvers de mutación
  }
};

export default resolversUsersMutation;
