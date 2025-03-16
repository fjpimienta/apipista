import GMR from 'graphql-merge-resolvers';
import resolversUsersMutation from './users.js';

const mutationResolvers = GMR.merge([
  resolversUsersMutation
]);

export default mutationResolvers;