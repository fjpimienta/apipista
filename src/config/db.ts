import mongoose from 'mongoose';
import dotenv from 'dotenv';
import chalk from 'chalk';

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI!, {
      dbName: 'pistahielo'  // Cambiado a hosting3m
    });
    console.log('===================DATABASE===================');
    console.log(`STATUS: ${chalk.greenBright('ONLINE')}`);
    console.log(`DATABASE: ${chalk.greenBright('pistahielo')}`);

    if (conn.connection.db) {
      // Listar todas las colecciones
      const collections = await conn.connection.db.listCollections().toArray();
      console.log('\n===================COLLECTIONS===================');
      console.log(`Total Collections: ${chalk.greenBright(collections.length)}`);
      collections.forEach(collection => {
        console.log(`Collection: ${chalk.blueBright(collection.name)}`);
      });

      // Contar documentos en la colección users
      const usersCount = await conn.connection.db.collection('users').countDocuments();
      console.log('\n===================USERS===================');
      console.log(`Total Users: ${chalk.greenBright(usersCount)}`);

      if (collections.length <= 0) {
        console.error(chalk.redBright('No hay collections.'));
      }
    } else {
      console.error(chalk.redBright('La conexión a la base de datos no está definida.'));
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(chalk.redBright(`Error: ${error.message}`));
    } else {
      console.error(chalk.redBright('Unknown error connecting to MongoDB'));
    }
    process.exit(1);
  }
};

export default connectDB;
