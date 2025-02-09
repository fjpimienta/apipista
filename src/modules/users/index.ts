import gql from 'graphql-tag';

export const usersTypeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    users: [User]
    user(id: ID!): User
  }

  type Mutation {
    createUser(name: String!, email: String!): User
  }
`;

export const usersResolvers = {
  Query: {
    users: () => {
      // Implementar lógica para obtener todos los usuarios
      return [];
    },
    user: (_parent: any, _args: { id: string }) => {
      // Implementar lógica para obtener un usuario por ID
      return null;
    },
  },
  Mutation: {
    createUser: (_parent: any, _args: { name: string, email: string }) => {
      // Implementar lógica para crear un nuevo usuario
      return null;
    },
  },
};
