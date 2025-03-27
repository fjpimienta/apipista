import { IResolvers } from '@graphql-tools/utils';
import TeachersService from '../../services/teachers.service.js';

const resolversTeachersQuery: IResolvers = {
  Query: {
    async teachers(_, args, context) {
      try {
        const teachers = await new TeachersService(_, args, context).items();
        return {
          status: true,
          message: 'Lista de profesores cargada correctamente',
          teachers: teachers || [],
          info: {
            page: args.page || 1,
            pages: Math.ceil((teachers?.length || 0) / (args.itemsPage || 10)),
            total: teachers?.length || 0,
            itemsPage: args.itemsPage || 10
          }
        };
      } catch (error) {
        return {
          status: false,
          message: 'Error al cargar los profesores: ' + error,
          teachers: [],
          info: {
            page: 1,
            pages: 0,
            total: 0,
            itemsPage: 10
          }
        };
      }
    },
    async teacher(_, { id }, context) {
      try {
        const teacher = await new TeachersService(_, { id }, context).getTeacher(id);
        return {
          status: true,
          message: 'Profesor encontrado correctamente',
          teacher
        };
      } catch (error) {
        return {
          status: false,
          message: 'Error al obtener profesor: ' + error,
          teacher: null
        };
      }
    }
  }
};

export default resolversTeachersQuery;
