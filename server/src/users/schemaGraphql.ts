import { gql } from "apollo-server-express";

export default gql`
  type Query {
    user: User!
    users: [User!]!
  }
  type Mutation {
    signUp(createUserInput: CreateUserInput): User!
    signIn(email: String!, password: String!): AuthData!
    updateUser(userId: ID!, updateUserInput: UpdateUserInput): User!
  }
  type Subscription {
    userAdded: User
  }
  type User {
    _id: ID!
    email: String!
    username: String!
    firstName: String!
    lastName: String!
    avatar: String
    role: Role
    createdAt: String
    updatedAt: String
  }
  type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
  }
  enum Role {
    SUPERADMIN
    ADMIN
    MEMBER
  }
  input CreateUserInput {
    email: String!
    username: String!
    firstName: String!
    lastName: String!
    password: String!
    repeatPassword: String!
    avatar: String
  }
  input UpdateUserInput {
    firstName: String
    lastName: String
    password: String
    repeatPassword: String
    avatar: String
  }
`;
