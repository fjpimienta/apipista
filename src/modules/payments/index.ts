import gql from 'graphql-tag';

export const paymentsTypeDefs = gql`
  type Payment {
    id: ID!
    reservationId: ID!
    amount: Float!
    date: String!
  }

  type Query {
    payments: [Payment]
    payment(id: ID!): Payment
  }

  type Mutation {
    createPayment(reservationId: ID!, amount: Float!, date: String!): Payment
  }
`;

export const paymentsResolvers = {
  Query: {
    payments: () => {
      // Implementar lógica para obtener todos los pagos
      return [];
    },
    payment: (_parent: any, _args: { id: string }) => {
      // Implementar lógica para obtener un pago por ID
      return null;
    },
  },
  Mutation: {
    createPayment: (_parent: any, _args: { reservationId: string, amount: number, date: string }) => {
      // Implementar lógica para crear un nuevo pago
      return null;
    },
  },
};
