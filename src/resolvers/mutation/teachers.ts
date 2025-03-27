import { IResolvers } from '@graphql-tools/utils';
import TeachersService from '../../services/teachers.service.js';

const resolversTeachersMutation: IResolvers = {
  Mutation: {
    async registerTeacher(_, variables, context) {
      return new TeachersService(_, variables, context).register();
    },
    async updateTeacher(_, variables, context) {
      return new TeachersService(_, variables, context).modify();
    },
    async deleteTeacher(_, variables, context) {
      return new TeachersService(_, variables, context).delete();
    },
    async blockTeacher(_, { id, unblock, admin }, context) {
      return new TeachersService(_, { id }, context).unblock(unblock);
    }
  }
};

export default resolversTeachersMutation;
