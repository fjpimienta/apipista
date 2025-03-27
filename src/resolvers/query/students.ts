import { IResolvers } from '@graphql-tools/utils';
import StudentsService from '../../services/students.service.js';

const resolversStudentsQuery: IResolvers = {
  Query: {
    async students(_, args, context) {
      try {
        const students = await new StudentsService(_, args, context).items();
        return {
          status: true,
          message: 'Lista de estudiantes cargada correctamente',
          students: students || [],
          info: {
            page: args.page || 1,
            pages: Math.ceil((students?.length || 0) / (args.itemsPage || 10)),
            total: students?.length || 0,
            itemsPage: args.itemsPage || 10
          }
        };
      } catch (error) {
        return {
          status: false,
          message: 'Error al cargar los estudiantes: ' + error,
          students: [],
          info: {
            page: 1,
            pages: 0,
            total: 0,
            itemsPage: 10
          }
        };
      }
    },
    async student(_, { id }, context) {
      try {
        const student = await new StudentsService(_, { id }, context).getStudent(id);
        return {
          status: true,
          message: 'Estudiante encontrado correctamente',
          student
        };
      } catch (error) {
        return {
          status: false,
          message: 'Error al obtener estudiante: ' + error,
          student: null
        };
      }
    }
  }
};

export default resolversStudentsQuery;
