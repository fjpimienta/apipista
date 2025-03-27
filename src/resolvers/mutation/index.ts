import GMR from 'graphql-merge-resolvers';
import resolversUsersMutation from './users.js';
import resolversStudentsMutation from './students.js';
import resolversTeachersMutation from './teachers.js';
import resolversArticlesMutation from './articles.js';

const mutationResolvers = GMR.merge([
  resolversUsersMutation,
  resolversStudentsMutation,
  resolversTeachersMutation,
  resolversArticlesMutation
]);

export default mutationResolvers;