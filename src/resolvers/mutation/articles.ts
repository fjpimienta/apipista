import { IResolvers } from '@graphql-tools/utils';
import ArticlesService from '../../services/articles.service.js';

const resolversArticlesMutation: IResolvers = {
  Mutation: {
    async registerArticle(_, variables, context) {
      return new ArticlesService(_, variables, context).register();
    },
    async updateArticle(_, variables, context) {
      return new ArticlesService(_, variables, context).modify();
    },
    async deleteArticle(_, variables, context) {
      return new ArticlesService(_, variables, context).delete();
    },
    async blockArticle(_, { id, unblock }, context) {
      return new ArticlesService(_, { id }, context).unblock(unblock);
    }
  }
};

export default resolversArticlesMutation;
