import GMR from 'graphql-merge-resolvers';
import resolversUsersQuery from './users.js';
import resolversAuthsQuery from './auth.js';
import resolversStudentsQuery from './students.js';
import resolversTeachersQuery from './teachers.js';
import resolversArticlesQuery from './articles.js';
import resolversClassesQuery from './classes.js';

const queryResolvers = GMR.merge([
  resolversUsersQuery,
  resolversAuthsQuery,
  resolversStudentsQuery,
  resolversTeachersQuery,
  resolversArticlesQuery,
  resolversClassesQuery
]);

export default queryResolvers;