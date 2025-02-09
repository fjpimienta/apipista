import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs, resolvers } from './modules/index.js';
import connectDB from './config/db.js';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  try {
    await connectDB();

    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });

    const port = parseInt(process.env.PORT || '4000', 10);

    const { url } = await startStandaloneServer(server, {
      listen: { port },
    });

    console.log(`🚀 Server ready at ${url}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error starting server: ${error.message}`);
    } else {
      console.error('Unknown error starting server');
    }
    process.exit(1);
  }
}

startServer();