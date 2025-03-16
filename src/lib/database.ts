import { MongoClient } from 'mongodb';
import chalk from 'chalk';

class Database {
   async init() {
      const MONGO_DB = process.env.DATABASE || 'mongodb://admin:09Fj197327Mr1976@209.46.127.83:27017/hosting3m?authSource=admin';
      const client = await MongoClient.connect(MONGO_DB);

      const db = client.db('pistahielo'); // Forzar el uso de la base de datos hosting3m

      console.log('===================DATABASE===================');
      console.log(`STATUS: ${chalk.greenBright('ONLINE')}`);
      console.log(`DATABASE: ${chalk.greenBright(db.databaseName)}`);

      return db;
   }
}

export default Database;
