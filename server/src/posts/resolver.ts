import { gql } from "apollo-server-express";
import { fields, objectId, objectIdValidate } from "../utils";
import { Post, PostDocument, createPostValidate } from "./";

const postQueries = {
  posts: (
    parent: any,
    args: any,
    context: any,
    info: any
  ): Promise<PostDocument[]> => {
    return Post.find({}).exec();
  },
  post: async (
    parent: any,
    args: { postId: string },
    context: any,
    info: any
  ): Promise<PostDocument> => {
    try {
      await objectIdValidate.validateAsync(args);
      return Post.findById(args);
    } catch (error) {
      throw error;
    }
  },
};
const postMutation = {
  createPost: async (
    parent: any,
    args: { createPostInput: any },
    context: any,
    info: any
  ) => {
    try {
      await createPostValidate.validateAsync(args, { abortEarly: false });
      return Post.create(args);
    } catch (error) {
      throw error;
    }
  },
};
