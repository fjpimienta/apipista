import express from 'express';
import cors from 'cors';
import compression from 'compression';
import { createServer } from 'http';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import environments from './config/environments.js';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { BaseContext } from '@apollo/server';
import schema from './schema/index.js';
import Database from './lib/database.js';
import { IContext } from './interfaces/context.interface.js';
import chalk from 'chalk';
import logger from './utils/logger.js';
import loggerMiddleware from './utils/loggerMiddleware.js';
import https from 'https';
import fs from 'fs';
import multer from 'multer';
import * as path from 'path';
import fileService from './services/fileService.js';
import { execSync } from 'child_process';
import { startStandaloneServer } from '@apollo/server/standalone';
import { Db } from 'mongodb';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuración de las variables de entorno (lectura)
if (process.env.NODE_ENV !== 'production') {
  const env = environments;
  console.log(env);
}

// Check if the certificate and key files exist
const keyPath = join(__dirname, 'private.key');
const certPath = join(__dirname, 'certificate.crt');

if (!fs.existsSync(keyPath) || !fs.existsSync(certPath)) {
  console.log('Certificados SSL no encontrados. Generando nuevos certificados...');
  try {
    execSync('npm run generate-ssl', { stdio: 'inherit' });
    console.log('Certificados SSL generados exitosamente.');
  } catch (error) {
    console.error('Error al generar certificados SSL:', error);
    console.log('Usando configuración HTTP en su lugar...');
    // Continuar sin SSL
  }
}

let httpsOptions = {};
try {
  httpsOptions = {
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath),
  };
} catch (error) {
  console.warn('No se pudieron cargar los certificados SSL. El servidor se ejecutará sin HTTPS.');
}

// Ruta donde se guardarán los archivos
const uploadFolder = path.join(__dirname, '../uploads/files');

// Verificar y crear la carpeta de destino si no existe
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder, { recursive: true });
}

const storage = multer.diskStorage({
  destination: uploadFolder,
  filename: function (_req, file, cb) {
    const extension = path.extname(file.originalname);
    cb(null, Date.now() + extension);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 1048576, files: 4 },
  fileFilter: function (_req, file, cb) {
    const type = file.mimetype.startsWith('image/');
    type ? cb(null, true) : cb(new Error('No es un archivo de tipo imagen'));
  }
}).array('files');

let apolloServer: ApolloServer;
let dbInstance: Db;

async function init(): Promise<void> {
  const app = express();
  const httpServer = createServer(app);

  app.use(cors());
  app.use(compression());
  app.use(express.json({ limit: '50mb' }));
  app.use(loggerMiddleware(logger));

  const database = new Database();
  dbInstance = await database.init();

  apolloServer = new ApolloServer({
    schema,
    formatError: (error) => {
      return error;
    },
  });

  await apolloServer.start();

  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(apolloServer, {
      context: async ({ req }) => {
        if (!dbInstance) {
          throw new Error('Database connection not initialized');
        }
        const token = req.headers.authorization || '';
        return {
          db: dbInstance,
          token
        } as IContext;
      },
    })
  );

  // Agrega el servicio de archivos y otras rutas
  app.use('/files', fileService);
  app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

  // Configuración del servidor final (HTTP o HTTPS)
  const finalServer = Object.keys(httpsOptions).length > 0 
    ? https.createServer(httpsOptions, app)
    : httpServer;

  const PORT = process.env.PORT || 3002;

  // Iniciar el servidor
  finalServer.listen(PORT, () => {
    if (process.env.PRODUCTION !== 'true') {
      logger.info('=================SERVER API GRAPHQL=====================');
      logger.info(`STATUS: ${chalk.greenBright('ONLINE')}`);
      logger.info(`MESSAGE: ${chalk.greenBright('API DARU - MarketPlace !!!')}`);
      logger.info(`GraphQL Server => @: ${Object.keys(httpsOptions).length > 0 ? 'https' : 'http'}://localhost:${PORT}/graphql`);
    }
  });
}

// Modificar la función getDatabaseInfo para usar dbInstance
async function getDatabaseInfo() {
  try {
    if (dbInstance) {
      console.log('\n===================DATABASE INFO===================');
      
      // Listar todas las colecciones
      const collections = await dbInstance.listCollections().toArray();
      console.log('\n===================COLLECTIONS===================');
      console.log(`Total Collections: ${collections.length}`);
      
      // Mostrar cada colección y su cantidad de documentos
      for (const collection of collections) {
        const count = await dbInstance.collection(collection.name).countDocuments();
        console.log(`Collection: ${collection.name} - Documents: ${count}`);
      }
      
      // Específicamente para usuarios
      const usersCount = await dbInstance.collection('users').countDocuments();
      console.log('\n===================USERS===================');
      console.log(`Total Users: ${usersCount}`);
    }
  } catch (error) {
    console.error('Error getting database info:', error);
  }
}

// Iniciar la aplicación
try {
  await init();
  // await getDatabaseInfo();                           // Descomentar para ver información de la base de datos
} catch (error) {
  console.error('Error iniciando el servidor:', error);
  process.exit(1);
}
