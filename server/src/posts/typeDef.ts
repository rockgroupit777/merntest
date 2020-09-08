import { gql } from "apollo-server-express";
export default gql`
  type Query {
    post(postId: ID!): Post!
    posts: [Post!]!
  }
`;
