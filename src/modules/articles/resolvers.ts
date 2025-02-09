import Article, { IArticle } from '../../models/Article.js';

export const articlesResolvers = {
  Query: {
    articles: async () => {
      const articles = await Article.find();
      console.log(`Recuperados ${articles.length} artículos.`);
      console.log(articles);
      return articles;
    },
    article: async (_parent: any, args: { id: string }) => {
      return await Article.findById(args.id);
    },
    articlesByAuthor: async (_parent: any, args: { author: string }) => {
      return await Article.find({ author: new RegExp(args.author, 'i') });
    },
  },
  Mutation: {
    createArticle: async (_parent: any, args: IArticle) => {
      const article = new Article(args);
      return await article.save();
    },
    updateArticle: async (_parent: any, args: { id: string } & Partial<IArticle>) => {
      return await Article.findByIdAndUpdate(args.id, args, { new: true });
    },
    deleteArticle: async (_parent: any, args: { id: string }) => {
      await Article.findByIdAndDelete(args.id);
      return true;
    },
    activateArticle: async (_parent: any, args: { id: string }) => {
      return await Article.findByIdAndUpdate(args.id, { active: true }, { new: true });
    },
    deactivateArticle: async (_parent: any, args: { id: string }) => {
      return await Article.findByIdAndUpdate(args.id, { active: false }, { new: true });
    },
  },
};
