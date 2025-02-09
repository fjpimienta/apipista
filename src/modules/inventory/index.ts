import gql from 'graphql-tag';

export const inventoryTypeDefs = gql`
  type Skate {
    id: ID!
    brand: String!
    size: Int!
    available: Boolean!
  }

  type Query {
    skates: [Skate]
    skate(id: ID!): Skate
  }

  type Mutation {
    createSkate(brand: String!, size: Int!, available: Boolean!): Skate
  }
`;

export const inventoryResolvers = {
  Query: {
    skates: () => {
      // Implementar lógica para obtener todos los patines
      return [];
    },
    skate: (_parent: any, _args: { id: string }) => {
      // Implementar lógica para obtener un patín por ID
      return null;
    },
  },
  Mutation: {
    createSkate: (_parent: any, _args: { brand: string, size: number, available: boolean }) => {
      // Implementar lógica para crear un nuevo patín
      return null;
    },
  },
};
