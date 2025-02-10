import gql from 'graphql-tag';

export const cutsTypeDefs = gql`
  type CutX {
    id: ID!
    date: String!
    amount: Float!
    active: Boolean!
    description: String!
    registerUser: String!
    updateUser: String!
    registerDate: String!
    updateDate: String!
  }

  type CutY {
    id: ID!
    date: String!
    totalAmount: Float!
    cutsX: [CutX]
    active: Boolean!
    description: String!
    registerUser: String!
    updateUser: String!
    registerDate: String!
    updateDate: String!
  }

  type Query {
    cutsX: [CutX]
    cutX(id: ID!): CutX
    cutsY: [CutY]
    cutY(id: ID!): CutY
  }

  type Mutation {
    createCutX(
      date: String!,
      amount: Float!,
      active: Boolean!,
      description: String!,
      registerUser: String!,
      updateUser: String!,
      registerDate: String!,
      updateDate: String!
    ): CutX
    updateCutX(
      id: ID!,
      date: String,
      amount: Float,
      active: Boolean,
      description: String,
      updateUser: String,
      updateDate: String
    ): CutX
    deleteCutX(id: ID!): Boolean
    activateCutX(id: ID!): CutX
    deactivateCutX(id: ID!): CutX

    createCutY(
      date: String!,
      totalAmount: Float!,
      cutsX: [ID!]!,
      active: Boolean!,
      description: String!,
      registerUser: String!,
      updateUser: String!,
      registerDate: String!,
      updateDate: String!
    ): CutY
    updateCutY(
      id: ID!,
      date: String,
      totalAmount: Float,
      cutsX: [ID!],
      active: Boolean,
      description: String,
      updateUser: String,
      updateDate: String
    ): CutY
    deleteCutY(id: ID!): Boolean
    activateCutY(id: ID!): CutY
    deactivateCutY(id: ID!): CutY
  }
`;
