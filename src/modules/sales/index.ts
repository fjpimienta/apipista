import gql from 'graphql-tag';

export const salesTypeDefs = gql`
  type Product {
    id: ID!
    name: String!
    price: Float!
  }

  type Sale {
    id: ID!
    date: String!
    totalAmount: Float!
    products: [Product]
  }

  type Query {
    products: [Product]
    product(id: ID!): Product
    sales: [Sale]
    sale(id: ID!): Sale
  }

  type Mutation {
    createProduct(name: String!, price: Float!): Product
    createSale(date: String!, totalAmount: Float!, products: [ID!]!): Sale
  }
`;

export const salesResolvers = {
  Query: {
    products: () => {
      // Implementar lógica para obtener todos los productos
      return [];
    },
    product: (_parent: any, _args: { id: string }) => {
      // Implementar lógica para obtener un producto por ID
      return null;
    },
    sales: () => {
      // Implementar lógica para obtener todas las ventas
      return [];
    },
    sale: (_parent: any, _args: { id: string }) => {
      // Implementar lógica para obtener una venta por ID
      return null;
    },
  },
  Mutation: {
    createProduct: (_parent: any, _args: { name: string, price: number }) => {
      // Implementar lógica para crear un nuevo producto
      return null;
    },
    createSale: (_parent: any, _args: { date: string, totalAmount: number, products: string[] }) => {
      // Implementar lógica para crear una nueva venta
      return null;
    },
  },
};
