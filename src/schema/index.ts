import 'graphql-import-node';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { loadFilesSync } from '@graphql-tools/load-files';
import path from 'path';
import { fileURLToPath } from 'url';
import { authTypeDefs } from '../modules/auth/typeDefs.js';
import { usersTypeDefs } from '../modules/users/typeDefs.js';
import resolvers from '../resolvers/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const typesArray = loadFilesSync(path.join(__dirname, './types'), {
  extensions: ['graphql']
});

const resolversArray = loadFilesSync(path.join(__dirname, './resolvers'));

const schema = makeExecutableSchema({
  typeDefs: [authTypeDefs, usersTypeDefs],
  resolvers
});

export default schema;