import gql from 'graphql-tag';

export const teachersTypeDefs = gql`
  type Teacher {
    id: ID!
    name: String!
    lastName: String!
    phone: String!
    email: String!
    active: Boolean!
    registerUser: String!
    updateUser: String!
    registerDate: String!
    updateDate: String!
  }

  type Query {
    teachers: [Teacher]
    teacher(id: ID!): Teacher
    teacherByName(name: String!): [Teacher]
  }

  type Mutation {
    createTeacher(
      name: String!,
      lastName: String!,
      phone: String!,
      email: String!,
      active: Boolean!,
      registerUser: String!,
      updateUser: String!,
      registerDate: String!,
      updateDate: String!
    ): Teacher
    updateTeacher(
      id: ID!,
      name: String,
      lastName: String,
      phone: String,
      email: String,
      active: Boolean,
      updateUser: String,
      updateDate: String
    ): Teacher
    deleteTeacher(id: ID!): Boolean
    activateTeacher(id: ID!): Teacher
    deactivateTeacher(id: ID!): Teacher
  }
`;
