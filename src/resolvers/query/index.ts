import GMR from 'graphql-merge-resolvers';
import resolversUsersQuery from './users.js';
import resolversAuthsQuery from './auth.js';
import resolversStudentsQuery from './students.js';

const queryResolvers = GMR.merge([
  resolversUsersQuery,
  resolversAuthsQuery,
  resolversStudentsQuery
]);

export default queryResolvers;