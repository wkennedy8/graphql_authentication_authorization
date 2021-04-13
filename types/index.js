const { gql } = require('apollo-server');

const typeDefs = gql`
  # Types
  type User {
    id: String!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    username: String!
    role: String
  }

  type AuthUser {
    id: String!
    user: User!
    token: String!
  }

  # Inputs
  input SignUpInput {
    email: String!
    password: String!
    username: String!
    firstName: String!
    lastName: String!
    role: String
  }

  input SignInInput {
    username: String!
    password: String!
  }

  # Queries
  type Query {
    users: [User]
    currentUser: User!
  }

  # Mutations
  type Mutation {
    signUp(input: SignUpInput!): AuthUser!
    signIn(input: SignInInput): AuthUser!
  }
`;

module.exports = typeDefs;
