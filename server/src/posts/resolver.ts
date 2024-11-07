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
   // Update a post
  updatePost: async (
    parent: unknown,
    args: UpdatePostArgs,
    context: unknown,
    info: GraphQLResolveInfo
  ): Promise<PostDocument | null> => {
    try {
      await objectIdValidate.validateAsync(args.postId);
      await updatePostValidate.validateAsync(args.updatePostInput, { abortEarly: false });
      
      const updatedPost = await Post.findByIdAndUpdate(
        args.postId,
        args.updatePostInput,
        { new: true } // Returns the updated document
      ).exec();
      
      if (!updatedPost) throw new Error("Post not found");

      // Publish the updated post event
      pubsub.publish('POST_UPDATED', { postUpdated: updatedPost });

      return updatedPost;
    } catch (error) {
      throw new Error(`Failed to update post: ${(error as Error).message}`);
    }
  },

  // Delete a post
  deletePost: async (
    parent: unknown,
    args: DeletePostArgs,
    context: unknown,
    info: GraphQLResolveInfo
  ): Promise<PostDocument | null> => {
    try {
      await objectIdValidate.validateAsync(args.postId);

      const deletedPost = await Post.findByIdAndDelete(args.postId).exec();
      if (!deletedPost) throw new Error("Post not found");

      // Publish the deleted post event
      pubsub.publish('POST_DELETED', { postDeleted: deletedPost });

      return deletedPost;
    } catch (error) {
      throw new Error(`Failed to delete post: ${(error as Error).message}`);
    }
  },
};
export const postSubscription = {};
