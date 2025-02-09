import gql from 'graphql-tag';

export const studentsTypeDefs = gql`
  type Student {
    id: ID!
    name: String!
    lastName: String!
    tutor: String!
    phone: String!
    email: String!
    order: Int!
    active: Boolean!
    registerUser: String!
    updateUser: String!
    registerDate: String!
    updateDate: String!
  }

  type Query {
    students: [Student]
    student(id: ID!): Student
    studentByName(name: String!): [Student]
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
    updateStudent(
      id: ID!,
      name: String,
      lastName: String,
      tutor: String,
      phone: String,
      email: String,
      order: Int,
      active: Boolean,
      updateUser: String,
      updateDate: String
    ): Student
    deleteStudent(id: ID!): Boolean
    activateStudent(id: ID!): Student
    deactivateStudent(id: ID!): Student
  }
`;
