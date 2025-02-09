import { mergeTypeDefs } from '@graphql-tools/merge';
import { usersTypeDefs, usersResolvers } from './users/index.js';
import { inventoryTypeDefs, inventoryResolvers } from './inventory/index.js';
import { reservationsTypeDefs, reservationsResolvers } from './reservations/index.js';
import { paymentsTypeDefs, paymentsResolvers } from './payments/index.js';
import { reportsTypeDefs, reportsResolvers } from './reports/index.js';
import { studentsTypeDefs, studentsResolvers } from './students/index.js';

export const typeDefs = mergeTypeDefs([
  usersTypeDefs,
  inventoryTypeDefs,
  reservationsTypeDefs,
  paymentsTypeDefs,
  reportsTypeDefs,
  studentsTypeDefs,
]);

export const resolvers = [
  usersResolvers,
  inventoryResolvers,
  reservationsResolvers,
  paymentsResolvers,
  reportsResolvers,
  studentsResolvers,
];
