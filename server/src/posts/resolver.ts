import { gql } from "apollo-server-express";
import { fields, objectId, objectIdValidate } from "../utils";
import { Post, PostDocument, createPostValidate } from "./";

export const postQueries = {
  posts: async (
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
export const postMutation = {
  createPost: async (
    parent: any,
    args: { createPostInput: any },
    context: any,
    info: any
  ) => {
    try {
      await createPostValidate.validateAsync(args.createPostInput, {
        abortEarly: false,
      });
      return Post.create(args.createPostInput);
    } catch (error) {
      throw error;
    }
  },
};
export const postSubscription = {};
