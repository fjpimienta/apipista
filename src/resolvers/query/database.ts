import { IResolvers } from '@graphql-tools/utils';
import { Db } from 'mongodb';
import { ICollection } from '../../interfaces/collection.interface.js';

const resolversQueryDatabase: IResolvers = {
  Query: {
    async databaseInfo(_: void, __: unknown, { db }: { db: Db }) {
      try {
        const collections = await db.listCollections().toArray();
        const collectionsInfo = await Promise.all(
          collections.map(async (collection: ICollection) => ({
            name: collection.name,
            count: await db.collection(collection.name).countDocuments()
          }))
        );

        return {
          totalCollections: collections.length,
          collections: collectionsInfo
        };
      } catch (error) {
        console.error('Error getting database info:', error);
        return {
          totalCollections: 0,
          collections: []
        };
      }
    }
  }
};

export default resolversQueryDatabase;
