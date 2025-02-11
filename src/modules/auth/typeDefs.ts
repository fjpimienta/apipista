import gql from 'graphql-tag';

export const authTypeDefs = gql`
  type AuthPayload {
    token: String!
    user: User!
  }

  type Mutation {
    login(email: String!, password: String!): AuthPayload
    oauthLogin(accessToken: String!): AuthPayload
  }
`;
