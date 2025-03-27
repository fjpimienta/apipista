import { ACTIVE_VALUES_FILTER, COLLECTIONS } from '../config/constants.js';
import { IContextData } from '../interfaces/context-data.interface.js';
import { findOneElement, asignDocumentId } from '../lib/db-operations.js';
import ResolversOperationsService from './resolvers-operaciones.service.js';

class ArticlesService extends ResolversOperationsService {
  collection = COLLECTIONS.ARTICLES;
  catalogName = 'Artículos';

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
        filter = { active: { $ne: false }, title: regExp };
        if (active === ACTIVE_VALUES_FILTER.ALL) {
          filter = { title: regExp };
        } else if (active === ACTIVE_VALUES_FILTER.INACTIVE) {
          filter = { active: { $eq: false }, title: regExp };
        }
      }

      const page = this.getVariables().pagination?.page || 1;
      const itemsPage = this.getVariables().pagination?.itemsPage || 20;

      const result = await this.list(this.collection, this.catalogName, page, itemsPage, filter);
      return result.items || [];
    } catch (error) {
      console.error('ArticlesService.items - error:', error);
      return [];
    }
  }

  async register() {
    const article = this.getVariables().article;
    if (!article) {
      return {
        status: false,
        message: `Error al cargar el artículo. Por favor contacte al administrador.`,
        article: null
      };
    }

    const articleCheck = await findOneElement(this.getDB(), this.collection, { title: article.title });
    if (articleCheck) {
      return {
        status: false,
        message: `El título ${article.title} ya está registrado.`,
        article: null
      };
    }

    article.id = await asignDocumentId(this.getDB(), this.collection, { registerDate: -1 });
    article.registerDate = new Date().toISOString();

    const result = await this.add(this.collection, article, 'artículo');
    return {
      status: result.status,
      message: result.message,
      article: result.item
    };
  }

  async modify() {
    const article = this.getVariables().article;
    if (!article) {
      return {
        status: false,
        message: `Error al cargar el artículo. Por favor contacte al administrador.`,
        article: null
      };
    }

    const filter = { id: article.id };
    const result = await this.updateForce(this.collection, filter, article, 'artículos');
    return {
      status: result.status,
      message: result.message,
      article: result.item
    };
  }

  async delete() {
    const id = this.getVariables().id;
    if (!id) {
      return {
        status: false,
        message: `Error al identificar el artículo. Por favor contacte al administrador.`,
        article: null
      };
    }

    const result = await this.del(this.collection, { id }, 'artículo');
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
        message: `Error al identificar el artículo. Por favor contacte al administrador.`,
        article: null
      };
    }

    const update = { active: unblock };
    const result = await this.update(this.collection, { id }, update, 'artículo');
    const action = unblock ? 'Activado' : 'Desactivado';
    return {
      status: result.status,
      message: result.message ? `${action} correctamente` : `No se ha ${action.toLowerCase()}`
    };
  }

  async getArticle(id: string) {
    try {
      const article = await findOneElement(this.getDB(), this.collection, { id });
      return article;
    } catch (error) {
      console.error('Error obteniendo artículo por ID:', error);
      return null;
    }
  }
}

export default ArticlesService;
