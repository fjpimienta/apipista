import { ACTIVE_VALUES_FILTER, COLLECTIONS } from '../config/constants.js';
import { IContextData } from '../interfaces/context-data.interface.js';
import { findOneElement, asignDocumentId } from '../lib/db-operations.js';
import ResolversOperationsService from './resolvers-operaciones.service.js';

class ClassesService extends ResolversOperationsService {
  collection = COLLECTIONS.CLASSES;
  catalogName = 'Clases';

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
      console.error('ClassesService.items - error:', error);
      return [];
    }
  }

  async register() {
    const classData = this.getVariables().class;
    if (!classData) {
      return {
        status: false,
        message: `Error al cargar la clase. Por favor contacte al administrador.`,
        class: null
      };
    }

    const classCheck = await findOneElement(this.getDB(), this.collection, { name: classData.name });
    if (classCheck) {
      return {
        status: false,
        message: `El nombre ${classData.name} ya está registrado.`,
        class: null
      };
    }

    classData.id = await asignDocumentId(this.getDB(), this.collection, { registerDate: -1 });
    classData.registerDate = new Date().toISOString();

    const result = await this.add(this.collection, classData, 'clase');
    return {
      status: result.status,
      message: result.message,
      class: result.item
    };
  }

  async modify() {
    const classData = this.getVariables().class;
    if (!classData) {
      return {
        status: false,
        message: `Error al cargar la clase. Por favor contacte al administrador.`,
        class: null
      };
    }

    const filter = { id: classData.id };
    const result = await this.updateForce(this.collection, filter, classData, 'clases');
    return {
      status: result.status,
      message: result.message,
      class: result.item
    };
  }

  async delete() {
    const id = this.getVariables().id;
    if (!id) {
      return {
        status: false,
        message: `Error al identificar la clase. Por favor contacte al administrador.`,
        class: null
      };
    }

    const result = await this.del(this.collection, { id }, 'clase');
    return {
      status: result.status,
      message: result.message
    };
  }

  async unblock(unblock: boolean) {
    const id = this.getVariables().id;
    if (!id) {
      return {
        status: false,
        message: `Error al identificar la clase. Por favor contacte al administrador.`,
        class: null
      };
    }

    const update = { active: unblock };
    const result = await this.update(this.collection, { id }, update, 'clase');
    const action = unblock ? 'Activada' : 'Desactivada';
    return {
      status: result.status,
      message: result.message ? `${action} correctamente` : `No se ha ${action.toLowerCase()}`
    };
  }

  async getClass(id: string) {
    try {
      const classData = await findOneElement(this.getDB(), this.collection, { id });
      return classData;
    } catch (error) {
      console.error('Error obteniendo clase por ID:', error);
      return null;
    }
  }
}

export default ClassesService;
