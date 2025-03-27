import { IResolvers } from '@graphql-tools/utils';
import ClassesService from '../../services/classes.service.js';

const resolversClassesMutation: IResolvers = {
  Mutation: {
    async registerClass(_, variables, context) {
      return new ClassesService(_, variables, context).register();
    },
    async updateClass(_, variables, context) {
      return new ClassesService(_, variables, context).modify();
    },
    async deleteClass(_, variables, context) {
      return new ClassesService(_, variables, context).delete();
    },
    async blockClass(_, { id, unblock }, context) {
      return new ClassesService(_, { id }, context).unblock(unblock);
    }
  }
};

export default resolversClassesMutation;
