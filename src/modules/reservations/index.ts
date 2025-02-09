import gql from 'graphql-tag';

export const reservationsTypeDefs = gql`
  type Reservation {
    id: ID!
    userId: ID!
    skateId: ID!
    startDate: String!
    endDate: String!
  }

  type Query {
    reservations: [Reservation]
    reservation(id: ID!): Reservation
  }

  type Mutation {
    createReservation(userId: ID!, skateId: ID!, startDate: String!, endDate: String!): Reservation
  }
`;

export const reservationsResolvers = {
  Query: {
    reservations: () => {
      // Implementar lógica para obtener todas las reservas
      return [];
    },
    reservation: (_parent: any, _args: { id: string }) => {
      // Implementar lógica para obtener una reserva por ID
      return null;
    },
  },
  Mutation: {
    createReservation: (_parent: any, _args: { userId: string, skateId: string, startDate: string, endDate: string }) => {
      // Implementar lógica para crear una nueva reserva
      return null;
    },
  },
};
