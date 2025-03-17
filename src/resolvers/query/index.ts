import GMR from 'graphql-merge-resolvers';
import resolversUsersQuery from './users.js';

const queryResolvers = GMR.merge([
  resolversUsersQuery,
]);

export default queryResolvers;