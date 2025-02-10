import gql from 'graphql-tag';

export const usersTypeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    active: Boolean!
    image: String
    profile: String!
    registerUser: String!
    updateUser: String
    registerDate: String!
    updateDate: String
  }

  type Query {
    users: [User]
    user(id: ID!): User
    userByEmail(email: String!): User
  }

  type Mutation {
    createUser(
      name: String!,
      email: String!,
      password: String!,
      active: Boolean!,
      image: String,
      profile: String!,
      registerUser: String!,
      updateUser: String,
      registerDate: String!,
      updateDate: String
    ): User
    updateUser(
      id: ID!,
      name: String,
      email: String,
      password: String,
      active: Boolean,
      image: String,
      profile: String,
      updateUser: String,
      updateDate: String
    ): User
    deleteUser(id: ID!): Boolean
    activateUser(id: ID!): User
    deactivateUser(id: ID!): User
  }
`;
