import { mergeTypeDefs } from '@graphql-tools/merge';
import { usersTypeDefs, usersResolvers } from './users/index.js';
import { inventoryTypeDefs, inventoryResolvers } from './inventory/index.js';
import { reservationsTypeDefs, reservationsResolvers } from './reservations/index.js';
import { paymentsTypeDefs, paymentsResolvers } from './payments/index.js';
import { reportsTypeDefs, reportsResolvers } from './reports/index.js';
import { studentsTypeDefs, studentsResolvers } from './students/index.js';
import { cutsTypeDefs, cutsResolvers } from './cuts/index.js';
import { salesTypeDefs, salesResolvers } from './sales/index.js';

export const typeDefs = mergeTypeDefs([
  usersTypeDefs,
  inventoryTypeDefs,
  reservationsTypeDefs,
  paymentsTypeDefs,
  reportsTypeDefs,
  studentsTypeDefs,
  cutsTypeDefs,
  salesTypeDefs,
]);

export const resolvers = [
  usersResolvers,
  inventoryResolvers,
  reservationsResolvers,
  paymentsResolvers,
  reportsResolvers,
  studentsResolvers,
  cutsResolvers,
  salesResolvers,
];
