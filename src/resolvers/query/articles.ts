import { IResolvers } from '@graphql-tools/utils';
import ArticlesService from '../../services/articles.service.js';

const resolversArticlesQuery: IResolvers = {
  Query: {
    async articles(_, args, context) {
      try {
        const articles = await new ArticlesService(_, args, context).items();
        return {
          status: true,
          message: 'Lista de artículos cargada correctamente',
          articles: articles || [],
          info: {
            page: args.page || 1,
            pages: Math.ceil((articles?.length || 0) / (args.itemsPage || 10)),
            total: articles?.length || 0,
            itemsPage: args.itemsPage || 10
          }
        };
      } catch (error) {
        return {
          status: false,
          message: 'Error al cargar los artículos: ' + error,
          articles: [],
          info: {
            page: 1,
            pages: 0,
            total: 0,
            itemsPage: 10
          }
        };
      }
    },
    async article(_, { id }, context) {
      try {
        const article = await new ArticlesService(_, { id }, context).getArticle(id);
        return {
          status: true,
          message: 'Artículo encontrado correctamente',
          article
        };
      } catch (error) {
        return {
          status: false,
          message: 'Error al obtener artículo: ' + error,
          article: null
        };
      }
    }
  }
};

export default resolversArticlesQuery;
