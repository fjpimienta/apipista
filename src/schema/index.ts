import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';
import path from 'path';
import { fileURLToPath } from 'url';
import resolvers from '../resolvers/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargar los archivos en orden específico
const baseTypes = loadFilesSync(path.join(__dirname, 'type-roots/base.graphql'));
const typeDefinitions = loadFilesSync(path.join(__dirname, 'type-roots/types/*.graphql'));
const queries = loadFilesSync(path.join(__dirname, 'type-roots/query/*.graphql'));

const typeDefs = mergeTypeDefs([...baseTypes, ...typeDefinitions, ...queries]);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  resolverValidationOptions: {
    requireResolversToMatchSchema: 'ignore',
    requireResolversForResolveType: 'ignore'
  }
});

export default schema;