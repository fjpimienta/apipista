import { ACTIVE_VALUES_FILTER, COLLECTIONS } from '../config/constants.js';
import { IContextData } from '../interfaces/context-data.interface.js';
import { findOneElement, asignDocumentId } from '../lib/db-operations.js';
import ResolversOperationsService from './resolvers-operaciones.service.js';

class TeachersService extends ResolversOperationsService {
  collection = COLLECTIONS.TEACHERS;
  catalogName = 'Profesores';

  constructor(root: object, variables: object, context: IContextData) {
    super(root, variables, context);
  }

  async items() {
    try {
      const { active, filterName } = this.getVariables();
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

      const page = this.getVariables().pagination?.page || 1;
      const itemsPage = this.getVariables().pagination?.itemsPage || 20;

      const result = await this.list(this.collection, this.catalogName, page, itemsPage, filter);
      return result.items || [];
    } catch (error) {
      console.error('TeachersService.items - error:', error);
      return [];
    }
  }

  async register() {
    const teacher = this.getVariables().teacher;
    if (!teacher) {
      return {
        status: false,
        message: `Error al cargar el profesor. Por favor contacte al administrador.`,
        teacher: null
      };
    }

    const teacherCheck = await findOneElement(this.getDB(), this.collection, { email: teacher.email });
    if (teacherCheck) {
      return {
        status: false,
        message: `El email ${teacher.email} ya está registrado.`,
        teacher: null
      };
    }

    teacher.id = await asignDocumentId(this.getDB(), this.collection, { registerDate: -1 });
    teacher.registerDate = new Date().toISOString();

    const result = await this.add(this.collection, teacher, 'profesor');
    return {
      status: result.status,
      message: result.message,
      teacher: result.item
    };
  }

  async modify() {
    const teacher = this.getVariables().teacher;
    if (!teacher) {
      return {
        status: false,
        message: `Error al cargar el profesor. Por favor contacte al administrador.`,
        teacher: null
      };
    }

    const filter = { id: teacher.id };
    const result = await this.updateForce(this.collection, filter, teacher, 'profesores');
    return {
      status: result.status,
      message: result.message,
      teacher: result.item
    };
  }

  async delete() {
    const id = this.getVariables().id;
    if (!id) {
      return {
        status: false,
        message: `Error al identificar el profesor. Por favor contacte al administrador.`,
        teacher: null
      };
    }

    const result = await this.del(this.collection, { id }, 'profesor');
    return {
      status: result.status,
      message: result.message
    };
  }

  async unblock(unblock: boolean) {
    const id = this.getVariables().id;
    const teacher = this.getVariables().teacher;
    if (!this.checkData(String(id) || '')) {
      return {
        status: false,
        message: `Error al identificar el profesor. Por favor contacte al administrador.`,
        teacher: null
      };
    }

    const update = { active: unblock };
    const result = await this.update(this.collection, { id }, update, 'profesor');
    const action = unblock ? 'Activado' : 'Desactivado';
    return {
      status: result.status,
      message: result.message ? `${action} correctamente` : `No se ha ${action.toLowerCase()}`
    };
  }

  async getTeacher(id: string) {
    try {
      const teacher = await findOneElement(this.getDB(), this.collection, { id });
      return teacher;
    } catch (error) {
      console.error('Error obteniendo profesor por ID:', error);
      return null;
    }
  }

  // Comprobar que no esta en blanco ni es indefinido
  private checkData(value: string) {
    return (value === '' || value === undefined) ? false : true;
  }

  // Verificar existencia en Base de Datos
  private async checkInDatabase(value: string) {
    return await findOneElement(this.getDB(), this.collection, {
      name: value
    });
  }  
}

export default TeachersService;
