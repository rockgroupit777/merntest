import { gql } from "apollo-server-express";
import { userTypeDef } from "../users";
import { postTypeDef } from "../posts";
const rootTypeDefs = gql`
  type Query {
    _: String
  }
  type Mutation {
    _: String
  }
  type Subscription {
    _: String
  }
`;
export default [rootTypeDefs, userTypeDef, postTypeDef];
