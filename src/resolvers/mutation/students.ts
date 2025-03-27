import { IResolvers } from '@graphql-tools/utils';
import StudentsService from '../../services/students.service.js';

const resolversStudentsMutation: IResolvers = {
  Mutation: {
    async registerStudent(_, variables, context) {
      return new StudentsService(_, variables, context).register();
    },
    async updateStudent(_, variables, context) {
      return new StudentsService(_, variables, context).modify();
    },
    async deleteStudent(_, variables, context) {
      return new StudentsService(_, variables, context).delete();
    },
    async blockStudent(_, { id, unblock, admin }, context) {
      return new StudentsService(_, { id }, context).unblock(unblock, admin);
    }
  }
};

export default resolversStudentsMutation;
