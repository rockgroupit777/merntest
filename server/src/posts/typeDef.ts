import { gql } from "apollo-server-express";
export default gql`
  type Query {
    post(postId: ID!): Post!
    posts: [Post!]!
  }
  type Mutation{
      createPost(createPostInput:CreatePostInput): Post!
      updatePost(postId:ID!,updatePostInput:UpdatePostInput): Post!
  }
  type Subcription{

  }
  type Post{
    _id:ID!
    title: String!
    alias: String!
    summary: String!
    content: String!
    cover: String
    photos: [String]
    user: [User!]
    status: Boolean
    likes: [User]
    commentStatus: Boolean
  }
  input CreatePostInput{
    title: String!
    alias: String!
    summary: String!
    content: String!
    cover: String
    photos: [String]
    user: [User!]
    status: Boolean
    likes: [User]
    commentStatus: Boolean
  }
  input UpdatePostInput{
    title: String!
    alias: String!
    summary: String!
    content: String!
    cover: String
    photos: [String]
    user: [User!]
    status: Boolean
    likes: [User]
    commentStatus: Boolean
  }
`;
