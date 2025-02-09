import gql from 'graphql-tag';

export const studentsTypeDefs = gql`
  type Student {
    id: String
    name: String
    lastName: String
    tutor: String
    phone: String
    email: String
    order: Int
    active: Boolean
    registerUser: String
    updateUser: String
    registerDate: String
    updateDate: String
  }

  type Query {
    students: [Student]
    student(id: String): Student
  }

  type Mutation {
    createStudent(
      name: String!,
      lastName: String!,
      tutor: String!,
      phone: String!,
      email: String!,
      order: Int!,
      active: Boolean!,
      registerUser: String!,
      updateUser: String!,
      registerDate: String!,
      updateDate: String!
    ): Student
  }
`;

export const studentsResolvers = {
  Query: {
    students: () => {
      // Implementar lógica para obtener todos los estudiantes
      return [];
    },
    student: (_parent: any, _args: { id: string }) => {
      // Implementar lógica para obtener un estudiante por ID
      return null;
    },
  },
  Mutation: {
    createStudent: (_parent: any, _args: { name: string, lastName: string, tutor: string, phone: string, email: string, order: number, active: boolean, registerUser: string, updateUser: string, registerDate: string, updateDate: string }) => {
      // Implementar lógica para crear un nuevo estudiante
      return null;
    },
  },
};
