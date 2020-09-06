import { gql, PubSub } from "apollo-server-express";
import jwt from "jsonwebtoken";
import config from "../config";
import { fields, objectIdValidate } from "../utils";
import { signInValidate, signUpValidate, updateUserValidate } from "./validate";
import { User, UserDocument } from "./";
import { attemptSignIn } from "./middleware";

const pubsub = new PubSub();
const USER_ADDED = "USER_ADDED";

const userQueries = {
  users: (
    parent: any,
    args: any,
    context: any,
    info: any
  ): Promise<UserDocument[]> => {
    /**
     * TODO: pagination
     */
    return User.find({}, fields(info)).exec();
  },
  user: async (
    parent: any,
    args: { userId: string },
    context: any,
    info: any
  ): Promise<UserDocument | null> => {
    try {
      await objectIdValidate.validateAsync(args);
      return User.findById(args.userId, fields(info));
    } catch (error) {
      throw error;
    }
  },
};

/**
 * @ User Mutation
 */
const userMutation = {
  signUp: async (parent: any, args: { createUserInput: any }) => {
    try {
      await signUpValidate.validateAsync(args.createUserInput, {
        abortEarly: false,
      });
      const user = await User.create(args.createUserInput);
      pubsub.publish(USER_ADDED, { userAdded: user });
      const token = jwt.sign({ userId: user._id }, config.jwtSecret, {
        expiresIn: 3600,
      });
      return {
        userId: user._id,
        token,
        tokenExpiration: 1,
      };
    } catch (error) {
      throw error;
    }
  },
  updateUser: async (
    parent: any,
    args: { userId: string; updateUserInput: any },
    context: any
  ) => {
    if (!context.isAuth) {
      throw new Error("Non Authenticated");
    }
    try {
      await updateUserValidate.validateAsync(args.updateUserInput, {
        abortEarly: false,
      });
      const user = await User.findByIdAndUpdate(
        args.userId,
        args.updateUserInput,
        { new: true }
      );
      return user;
    } catch (error) {
      throw error;
    }
  },
  signIn: async (
    parent: any,
    args: { email: string; password: string },
    req: { req: Request },
    info: any
  ) => {
    try {
      await signInValidate.validateAsync(args, { abortEarly: false });
      const user = await attemptSignIn(args);
      if (!user) {
        throw new Error("User does not exist");
      }
      const token = jwt.sign({ userId: user._id }, config.jwtSecret, {
        expiresIn: 3600,
      });
      return {
        userId: user._id,
        token,
        tokenExpiration: 1,
      };
    } catch (error) {
      throw error;
    }
  },
};
const userSubscription = {
  userAdded: {
    subscribe: () => pubsub.asyncIterator([USER_ADDED]),
  },
};

export { userQueries, userMutation, userSubscription };
