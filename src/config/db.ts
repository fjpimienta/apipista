import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI!, {
      dbName: 'pistahielo'
    });
    if (conn.connection.db) {
      const collections = await conn.connection.db.listCollections().toArray();
      if (collections.length <= 0) {
        console.error('No hay collections.');
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
