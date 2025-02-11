import { mergeTypeDefs } from '@graphql-tools/merge';
import { articlesTypeDefs, articlesResolvers } from './articles/index.js';
import { authTypeDefs, authResolvers } from './auth/index.js';
import { classesTypeDefs, classesResolvers } from './classes/index.js';
import { cutsTypeDefs, cutsResolvers } from './cuts/index.js';
import { inventoryTypeDefs, inventoryResolvers } from './inventory/index.js';
import { paymentsTypeDefs, paymentsResolvers } from './payments/index.js';
import { reportsTypeDefs, reportsResolvers } from './reports/index.js';
import { reservationsTypeDefs, reservationsResolvers } from './reservations/index.js';
import { salesTypeDefs, salesResolvers } from './sales/index.js';
import { studentsTypeDefs, studentsResolvers } from './students/index.js';
import { teachersTypeDefs, teachersResolvers } from './teachers/index.js';
import { usersTypeDefs, usersResolvers } from './users/index.js';

export const typeDefs = mergeTypeDefs([
  articlesTypeDefs,
  authTypeDefs,
  classesTypeDefs,
  cutsTypeDefs,
  inventoryTypeDefs,
  paymentsTypeDefs,
  reportsTypeDefs,
  reservationsTypeDefs,
  salesTypeDefs,
  studentsTypeDefs,
  teachersTypeDefs,
  usersTypeDefs,
]);

export const resolvers = [
  articlesResolvers,
  authResolvers,
  classesResolvers,
  cutsResolvers,
  inventoryResolvers,
  paymentsResolvers,
  reportsResolvers,
  reservationsResolvers,
  salesResolvers,
  studentsResolvers,
  teachersResolvers,
  usersResolvers,
];
