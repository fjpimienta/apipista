import gql from 'graphql-tag';

export const classesTypeDefs = gql`
  type Class {
    id: ID!
    name: String!
    cost: Float!
    startTime: String!
    endTime: String!
    teacher: Teacher!
    active: Boolean!
    registerUser: String!
    updateUser: String!
    registerDate: String!
    updateDate: String!
  }

  type Query {
    classes: [Class]
    class(id: ID!): Class
  }

  type Mutation {
    createClass(
      name: String!,
      cost: Float!,
      startTime: String!,
      endTime: String!,
      teacher: ID!,
      active: Boolean!,
      registerUser: String!,
      updateUser: String!,
      registerDate: String!,
      updateDate: String!
    ): Class
    updateClass(
      id: ID!,
      name: String,
      cost: Float,
      startTime: String,
      endTime: String,
      teacher: ID,
      active: Boolean,
      updateUser: String,
      updateDate: String
    ): Class
    deleteClass(id: ID!): Boolean
    activateClass(id: ID!): Class
    deactivateClass(id: ID!): Class
  }
`;
