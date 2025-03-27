import { IResolvers } from '@graphql-tools/utils';
import ClassesService from '../../services/classes.service.js';

const resolversClassesQuery: IResolvers = {
  Query: {
    async classes(_, args, context) {
      try {
        const classes = await new ClassesService(_, args, context).items();
        return {
          status: true,
          message: 'Lista de clases cargada correctamente',
          classes: classes || [],
          info: {
            page: args.page || 1,
            pages: Math.ceil((classes?.length || 0) / (args.itemsPage || 10)),
            total: classes?.length || 0,
            itemsPage: args.itemsPage || 10
          }
        };
      } catch (error) {
        return {
          status: false,
          message: 'Error al cargar las clases: ' + error,
          classes: [],
          info: {
            page: 1,
            pages: 0,
            total: 0,
            itemsPage: 10
          }
        };
      }
    },
    async class(_, { id }, context) {
      try {
        const classData = await new ClassesService(_, { id }, context).getClass(id);
        return {
          status: true,
          message: 'Clase encontrada correctamente',
          class: classData
        };
      } catch (error) {
        return {
          status: false,
          message: 'Error al obtener clase: ' + error,
          class: null
        };
      }
    }
  }
};

export default resolversClassesQuery;
