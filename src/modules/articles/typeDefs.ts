import gql from 'graphql-tag';

export const articlesTypeDefs = gql`
  type Article {
    id: ID!
    title: String!
    content: String!
    author: String!
    publishedDate: String!
    tags: [String!]!
    active: Boolean!
    registerUser: String!
    updateUser: String!
    registerDate: String!
    updateDate: String!
  }

  type Query {
    articles: [Article]
    article(id: ID!): Article
    articlesByAuthor(author: String!): [Article]
  }

  type Mutation {
    createArticle(
      title: String!,
      content: String!,
      author: String!,
      publishedDate: String!,
      tags: [String!]!,
      active: Boolean!,
      registerUser: String!,
      updateUser: String!,
      registerDate: String!,
      updateDate: String!
    ): Article
    updateArticle(
      id: ID!,
      title: String,
      content: String,
      author: String,
      publishedDate: String,
      tags: [String!],
      active: Boolean,
      updateUser: String,
      updateDate: String
    ): Article
    deleteArticle(id: ID!): Boolean
    activateArticle(id: ID!): Article
    deactivateArticle(id: ID!): Article
  }
`;
