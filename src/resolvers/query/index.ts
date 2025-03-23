import GMR from 'graphql-merge-resolvers';
import resolversUsersQuery from './users.js';
import resolversAuthsQuery from './auth.js';

const queryResolvers = GMR.merge([
  resolversUsersQuery,
  resolversAuthsQuery
]);

export default queryResolvers;