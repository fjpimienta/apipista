import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';
import path from 'path';
import { fileURLToPath } from 'url';
import resolvers from '../resolvers/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargar todos los archivos GraphQL
const typesArray = loadFilesSync(
  [
    path.join(__dirname, './**/*.graphql'),     // Carga todos los archivos .graphql
  ],
  {
    recursive: true
  }
);

// Merge de todos los tipos
const typeDefs = mergeTypeDefs(typesArray);

// Crear y exportar el schema
export default makeExecutableSchema({
  typeDefs,
  resolvers,
  resolverValidationOptions: {
    requireResolversToMatchSchema: 'ignore',
    requireResolversForResolveType: 'ignore'
  }
});