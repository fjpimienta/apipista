import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import typeDefs from './typeDefs/index.js';
import resolvers from './resolvers/index.js';
import { PORT } from './config/env.js';

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const { url } = await startStandaloneServer(server, {
    listen: { port: PORT },
});

console.log(`🚀  Server ready at: ${url}`);