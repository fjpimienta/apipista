import { IResolvers } from '@graphql-tools/utils';
import query from './query/index.js';
import mutation from './mutation/index.js';

const resolvers: IResolvers = {
  ...query,
  ...mutation
};

export default resolvers;