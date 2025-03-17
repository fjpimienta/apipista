import 'graphql-import-node';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { loadFilesSync } from '@graphql-tools/load-files';
import path from 'path';
import { fileURLToPath } from 'url';
import resolvers from '../resolvers/index.js';
import typeDefs from '../typeDefs/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const typesArray = loadFilesSync(path.join(__dirname, './types'), {
  extensions: ['graphql']
});

const resolversArray = loadFilesSync(path.join(__dirname, './resolvers'));

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

export default schema;