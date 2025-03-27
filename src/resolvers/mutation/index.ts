import GMR from 'graphql-merge-resolvers';
import resolversUsersMutation from './users.js';
import resolversStudentsMutation from './students.js';

const mutationResolvers = GMR.merge([
  resolversUsersMutation,
  resolversStudentsMutation
]);

export default mutationResolvers;