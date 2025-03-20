import express from 'express';
import cors from 'cors';
import compression from 'compression';
import { createServer } from 'http'; // Usamos http.createServer
import https from 'https'; // Usamos https.createServer
import { Server as HttpServer } from 'http'; // Importamos el tipo de servidor HTTP
import { Server as HttpsServer } from 'https'; // Importamos el tipo de servidor HTTPS
import { RequestListener } from 'http'; // Importamos RequestListener si lo necesitas
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import environments from './config/environments.js';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import schema from './schema/index.js';
import Database from './lib/database.js';
import chalk from 'chalk';
import logger from './utils/logger.js';
import loggerMiddleware from './utils/loggerMiddleware.js';
import fs from 'fs';
import multer from 'multer';
import * as path from 'path';
import fileService from './services/fileService.js';
import { execSync } from 'child_process';
import { Db } from 'mongodb';
import { IContextData } from './interfaces/context-data.interface.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define el tipo para httpsOptions
interface HttpsOptions {
  key: Buffer;
  cert: Buffer;
}

// Configuración de las variables de entorno (lectura)
if (process.env.NODE_ENV !== 'production') {
  const env = environments;
  console.log(env);
}

// Configurar rutas de certificados en la carpeta build
const certDir = join(process.cwd(), 'build/ssl');
const keyPath = join(certDir, 'private.key');
const certPath = join(certDir, 'certificate.crt');

// Asegurar que existe el directorio de certificados
if (!fs.existsSync(certDir)) {
  fs.mkdirSync(certDir, { recursive: true });
  console.log('Directorio de certificados creado');
}

// Función para verificar validez del certificado
function isCertificateValid(certPath: string): boolean {
  try {
    const cert = fs.readFileSync(certPath);
    const certObj = new (require('crypto').X509Certificate)(cert);
    const validTo = new Date(certObj.validTo);
    return validTo > new Date();
  } catch {
    return false;
  }
}

// Función para generar nuevos certificados
function generateNewCertificates(): void {
  console.log('Generando nuevos certificados SSL en build/ssl...');
  try {
    // Comando openssl modificado para especificar la ubicación de salida
    const opensslCommand = `openssl req -x509 -newkey rsa:2048 -keyout "${keyPath}" -out "${certPath}" -days 365 -nodes -subj "/C=ES/ST=State/L=City/O=Organization/CN=localhost"`;
    execSync(opensslCommand, { stdio: 'inherit' });
    console.log('Certificados SSL generados exitosamente en build/ssl.');

    // Eliminar certificados antiguos de src si existen
    const srcKeyPath = join(__dirname, 'private.key');
    const srcCertPath = join(__dirname, 'certificate.crt');
    if (fs.existsSync(srcKeyPath)) {
      fs.unlinkSync(srcKeyPath);
      console.log('Certificado antiguo private.key eliminado de src.');
    }
    if (fs.existsSync(srcCertPath)) {
      fs.unlinkSync(srcCertPath);
      console.log('Certificado antiguo certificate.crt eliminado de src.');
    }
  } catch (error) {
    console.error('Error al generar certificados SSL:', error);
  }
}

// Verificar existencia y validez de certificados
if (!fs.existsSync(keyPath) ||
  !fs.existsSync(certPath) ||
  !isCertificateValid(certPath)) {
  generateNewCertificates();
}

let httpsOptions: HttpsOptions | {} = {};

try {
  if (fs.existsSync(keyPath) && fs.existsSync(certPath)) {
    httpsOptions = {
      key: fs.readFileSync(keyPath),
      cert: fs.readFileSync(certPath),
    };
  }
} catch (error) {
  console.warn('No se pudieron cargar los certificados SSL. El servidor se ejecutará sin HTTPS.');
  httpsOptions = {}; // Asegúrate de que httpsOptions esté vacío
}

// Ruta donde se guardarán los archivos
const uploadFolder = path.join(__dirname, '../uploads/files');
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder, { recursive: true });
  console.log('Carpeta de uploads creada');
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

  app.use(
    cors({
      origin: '*',
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type', 'x-apollo-operation-name', 'Authorization'],
    })
  );
  app.use(compression());
  app.use(express.json({ limit: '50mb' }));
  app.use(loggerMiddleware(logger));

  const database = new Database();
  dbInstance = await database.init();

  apolloServer = new ApolloServer({
    schema,
    formatError: (error) => {
      if (process.env.NODE_ENV === 'production') {
        return new Error('Internal server error');
      }
      return error;
    },
  });

  await apolloServer.start();

  app.use(
    '/graphql',
    expressMiddleware(apolloServer, {
      context: async ({ req }) => {
        if (!dbInstance) {
          throw new Error('Database connection not initialized');
        }
        const token = req.headers.authorization || '';
        return {
          db: dbInstance,
          token
        } as IContextData;
      },
    })
  );

  app.use('/files', fileService);
  app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

  const finalServer: HttpServer | HttpsServer = (Object.keys(httpsOptions).length > 0)
    ? https.createServer(httpsOptions as HttpsOptions, app)
    : httpServer;

  const PORT = process.env.PORT || 3003;

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
