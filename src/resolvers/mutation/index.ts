import GMR from 'graphql-merge-resolvers';
import resolversUsersMutation from './users.js';
import resolversStudentsMutation from './students.js';
import resolversTeachersMutation from './teachers.js';

const mutationResolvers = GMR.merge([
  resolversUsersMutation,
  resolversStudentsMutation,
  resolversTeachersMutation
]);

export default mutationResolvers;