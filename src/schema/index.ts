import 'graphql-import-node';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { fileURLToPath } from 'url';
import path from 'path';
import resolvers from '../resolvers/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const typesArray = loadFilesSync(path.join(__dirname, './**/*.graphql'), {
  recursive: true,
  extensions: ['graphql']
});
const typeDefs = mergeTypeDefs(typesArray);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

export default schema;