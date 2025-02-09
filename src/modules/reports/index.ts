import gql from 'graphql-tag';

export const reportsTypeDefs = gql`
  type Report {
    id: ID!
    title: String!
    content: String!
    date: String!
  }

  type Query {
    reports: [Report]
    report(id: ID!): Report
  }

  type Mutation {
    createReport(title: String!, content: String!, date: String!): Report
  }
`;

export const reportsResolvers = {
  Query: {
    reports: () => {
      // Implementar lógica para obtener todos los reportes
      return [];
    },
    report: (_parent: any, _args: { id: string }) => {
      // Implementar lógica para obtener un reporte por ID
      return null;
    },
  },
  Mutation: {
    createReport: (_parent: any, _args: { title: string, content: string, date: string }) => {
      // Implementar lógica para crear un nuevo reporte
      return null;
    },
  },
};
