import gql from 'graphql-tag';

export const cutsTypeDefs = gql`
  type CutX {
    id: ID!
    date: String!
    amount: Float!
  }

  type CutY {
    id: ID!
    date: String!
    totalAmount: Float!
    cutsX: [CutX]
  }

  type Query {
    cutsX: [CutX]
    cutX(id: ID!): CutX
    cutsY: [CutY]
    cutY(id: ID!): CutY
  }

  type Mutation {
    createCutX(date: String!, amount: Float!): CutX
    createCutY(date: String!, totalAmount: Float!, cutsX: [ID!]!): CutY
  }
`;

export const cutsResolvers = {
  Query: {
    cutsX: () => {
      // Implementar lógica para obtener todos los cortes X
      return [];
    },
    cutX: (_parent: any, _args: { id: string }) => {
      // Implementar lógica para obtener un corte X por ID
      return null;
    },
    cutsY: () => {
      // Implementar lógica para obtener todos los cortes Y
      return [];
    },
    cutY: (_parent: any, _args: { id: string }) => {
      // Implementar lógica para obtener un corte Y por ID
      return null;
    },
  },
  Mutation: {
    createCutX: (_parent: any, _args: { date: string, amount: number }) => {
      // Implementar lógica para crear un nuevo corte X
      return null;
    },
    createCutY: (_parent: any, _args: { date: string, totalAmount: number, cutsX: string[] }) => {
      // Implementar lógica para crear un nuevo corte Y
      return null;
    },
  },
};
