import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI!, {
      dbName: 'pistahielo'
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Connected to database: ${conn.connection.db?.databaseName}`);

    if (conn.connection.db) {
      // Verificar la existencia de la colección 'students'
      const collections = await conn.connection.db.listCollections().toArray();
      const studentsCollection = collections.find((collection: { name: string }) => collection.name === 'students');
      if (studentsCollection) {
        console.log("La colección 'students' existe.");
        const count = await conn.connection.db.collection('students').countDocuments();
        console.log(`La colección 'students' tiene ${count} registros.`);
      } else {
        console.log("La colección 'students' no existe.");
      }
    } else {
      console.error('La conexión a la base de datos no está definida.');
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
    } else {
      console.error('Unknown error connecting to MongoDB');
    }
    process.exit(1);
  }
};

export default connectDB;
