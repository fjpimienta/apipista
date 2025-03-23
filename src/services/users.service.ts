import { ACTIVE_VALUES_FILTER, COLLECTIONS } from '../config/constants.js';
import { IContextData } from '../interfaces/context-data.interface.js';
import { findOneElement } from '../lib/db-operations.js';
import { asignDocumentId } from '../lib/db-operations.js';
import ResolversOperationsService from './resolvers-operaciones.service.js';
import bcrypt from 'bcrypt';
import { IVariables } from '../interfaces/variable.interface.js';
import dotenv from 'dotenv';

dotenv.config();
   
class UsersService extends ResolversOperationsService {
  collection = COLLECTIONS.USERS;
  catalogName = 'Usuarios';
  email_admin = process.env.EMAIL_ADMIN!;
  
  constructor(root: object, variables: object, context: IContextData) {
    super(root, variables, context);
  }

  // Listar informacion
  async items(variables: IVariables = {}) {
    try {
      const { active, filterName, role } = variables;
      let filter: object;
      const regExp = new RegExp('.*' + filterName + '.*', 'i');
      if (filterName === '' || filterName === undefined) {
        filter = { active: { $ne: false } };
        if (active === ACTIVE_VALUES_FILTER.ALL) {
          filter = {};
        } else if (active === ACTIVE_VALUES_FILTER.INACTIVE) {
          filter = { active: { $eq: false } };
        }
      } else {
        filter = { active: { $ne: false }, 'name': regExp };
        if (active === ACTIVE_VALUES_FILTER.ALL) {
          filter = { 'name': regExp };
        } else if (active === ACTIVE_VALUES_FILTER.INACTIVE) {
          filter = { active: { $eq: false }, 'name': regExp };
        }
      }
      if (role) {
        filter = { ...filter, ...{ role: { $eq: role } } };
      }
      
      const page = this.getVariables().pagination?.page || 1;
      const itemsPage = this.getVariables().pagination?.itemsPage || 20;
      
      const result = await this.list(this.collection, this.catalogName, page, itemsPage, filter);

      // Retornar directamente el array de usuarios
      return result.items || [];
    } catch (error) {
      console.error('UsersService.items - error:', error);
      return []; // Siempre devolver un array vacío en caso de error
    }
  }

  // Anadir Item
  async register() {
    const user = this.getVariables().user;
    // Comprobar que el usuario no sea nulo.
    if (user === null) {
      return {
        status: false,
        mesage: `Lo sentimos hay un errror al cargar el usuario. Por favor contáctanos a ${this.email_admin} para brindarte apoyo`,
        user: null
      };
    }
    // Verificar que el usuario no existe.
    const userCheck = await findOneElement(this.getDB(), this.collection, { email: user?.email });
    if (userCheck !== null) {
      return {
        status: false,
        message: `Lo sentimos el email ${user?.email} ya es parte de #DARUTEAM. Intentar con otro email.`,
        user: null
      };
    }

    // Verificar el último usuario registrado para asignar ID
    user!.id = await asignDocumentId(this.getDB(), this.collection, { registerdate: -1 });
    // Asignar la fecha en formato ISO en  registerdate
    user!.registerdate = new Date().toISOString();

    // Guardar el docuento (registro) en la colección
    const result = await this.add(this.collection, user || {}, 'usuario');
    return {
      status: result.status,
      message: result.message,
      user: result.item
    };
  }

  // Obtener el siguiente elemento
  async next() {
    const result = await this.nextId(this.collection);
    // No cambiar la estructura del objeto retornado
    return {
      status: result.status,
      message: result.message,
      userId: result.catId?.toString() // Aseguramos que userId sea string
    };
  }

  // Modificar Item
  async modify() {
    const user = this.getVariables().user;
    // Comprobar que el usuario no sea nulo.
    if (user === null) {
      return {
        status: false,
        mesage: `Lo sentimos hay un errror al cargar el usuario. Por favor contáctanos a ${this.email_admin} para brindarte apoyo`,
        user: null
      };
    }

    // Conocer el id del usuario
    const filter = { id: user?.id };

    const result = await this.updateForce(this.collection, filter, user || {}, 'usuarios');
    return {
      status: result.status,
      message: result.message,
      user: result.item
    };
  }

  // Eliminar item
  async delete() {
    const id = this.getVariables().id;
    if (!this.checkData(String(id) || '')) {
      return {
        status: false,
        message: `Lo sentimos hay un errror el identificador del usuario. Por favor contáctanos a ${this.email_admin} para brindarte apoyo`,
        user: null
      };
    }
    const result = await this.del(this.collection, { id }, 'usuario');
    return {
      status: result.status,
      message: result.message
    };
  }

  // Bloquear item
  async unblock(unblock: boolean, admin: boolean) {
    const id = this.getVariables().id;
    const user = this.getVariables().user;
    if (!this.checkData(String(id) || '')) {
      return {
        status: false,
        message: `Lo sentimos hay un errror al cargar el correo del usuario. Por favor contáctanos a ${this.email_admin} para brindarte apoyo`,
        user: null
      };
    }
    let update = { active: unblock };
    if (unblock && !admin) {
      update = Object.assign({}, { active: true }, {
        password: user?.password ? bcrypt.hashSync(user.password, 10) : ''
      });
    }
    const result = await this.update(this.collection, { id }, update, 'usuario');
    const action = (unblock) ? 'Activado' : 'Desactivado';
    return {
      status: result.status,
      message: (result.message) ? `${action} correctamente` : `No se ha ${action.toLowerCase()} comprobarlo por favor`
    };
  }

  // Obtener usuario por ID
  async getUser(id: string) {
    try {
      const user = await findOneElement(this.getDB(), this.collection, { id });
      return user;
    } catch (error) {
      console.error('Error getting user by ID:', error);
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

export default UsersService;