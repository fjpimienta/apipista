import { ACTIVE_VALUES_FILTER, COLLECTIONS } from '../config/constants.js';
import { IContextData } from '../interfaces/context-data.interface.js';
import { findOneElement, asignDocumentId } from '../lib/db-operations.js';
import ResolversOperationsService from './resolvers-operaciones.service.js';

class StudentsService extends ResolversOperationsService {
  collection = COLLECTIONS.STUDENTS;
  catalogName = 'Estudiantes';

  constructor(root: object, variables: object, context: IContextData) {
    super(root, variables, context);
  }

  async items() {
    try {
      const { active, filterName, order } = this.getVariables();
      let filter: object;
      const regExp = new RegExp('.*' + filterName + '.*', 'i');
      if (!filterName) {
        filter = { active: { $ne: false } };
        if (active === ACTIVE_VALUES_FILTER.ALL) {
          filter = {};
        } else if (active === ACTIVE_VALUES_FILTER.INACTIVE) {
          filter = { active: { $eq: false } };
        }
      } else {
        filter = { active: { $ne: false }, name: regExp };
        if (active === ACTIVE_VALUES_FILTER.ALL) {
          filter = { name: regExp };
        } else if (active === ACTIVE_VALUES_FILTER.INACTIVE) {
          filter = { active: { $eq: false }, name: regExp };
        }
      }
      if (order) {
        filter = { ...filter, order: { $eq: order } };
      }

      const page = this.getVariables().pagination?.page || 1;
      const itemsPage = this.getVariables().pagination?.itemsPage || 20;

      const result = await this.list(this.collection, this.catalogName, page, itemsPage, filter);
      return result.items || [];
    } catch (error) {
      console.error('StudentsService.items - error:', error);
      return [];
    }
  }

  async register() {
    const student = this.getVariables().student;
    if (!student) {
      return {
        status: false,
        message: `Error al cargar el estudiante. Por favor contacte al administrador.`,
        student: null
      };
    }

    const studentCheck = await findOneElement(this.getDB(), this.collection, { email: student.email });
    if (studentCheck) {
      return {
        status: false,
        message: `El email ${student.email} ya está registrado.`,
        student: null
      };
    }

    student.id = await asignDocumentId(this.getDB(), this.collection, { registerDate: -1 });
    student.registerDate = new Date().toISOString();

    const result = await this.add(this.collection, student, 'estudiante');
    return {
      status: result.status,
      message: result.message,
      student: result.item
    };
  }

  async modify() {
    const student = this.getVariables().student;
    if (!student) {
      return {
        status: false,
        message: `Error al cargar el estudiante. Por favor contacte al administrador.`,
        student: null
      };
    }

    const filter = { id: student.id };
    const result = await this.updateForce(this.collection, filter, student, 'estudiantes');
    return {
      status: result.status,
      message: result.message,
      student: result.item
    };
  }

  async delete() {
    const id = this.getVariables().id;
    if (!id) {
      return {
        status: false,
        message: `Error al identificar el estudiante. Por favor contacte al administrador.`,
        student: null
      };
    }

    const result = await this.del(this.collection, { id }, 'estudiante');
    return {
      status: result.status,
      message: result.message
    };
  }

  async unblock(unblock: boolean, admin: boolean) {
    const id = this.getVariables().id;
    if (!id) {
      return {
        status: false,
        message: `Error al identificar el estudiante. Por favor contacte al administrador.`,
        student: null
      };
    }

    const update = { active: unblock };
    const result = await this.update(this.collection, { id }, update, 'estudiante');
    const action = unblock ? 'Activado' : 'Desactivado';
    return {
      status: result.status,
      message: result.message ? `${action} correctamente` : `No se ha ${action.toLowerCase()}`
    };
  }

  async getStudent(id: string) {
    try {
      const student = await findOneElement(this.getDB(), this.collection, { id });
      return student;
    } catch (error) {
      console.error('Error obteniendo estudiante por ID:', error);
      return null;
    }
  }
}

export default StudentsService;
