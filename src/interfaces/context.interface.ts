import { Db } from 'mongodb';

export interface IContext {
  db: Db;  // db es requerido, no opcional
  token?: string;
}