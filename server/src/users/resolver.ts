import { gql, PubSub } from "apollo-server-express";
import jwt from "jsonwebtoken";
import config from "../config";
import { fields, objectIdValidate } from "../utils";
import { signInValidate, signUpValidate } from "./validate";
import { User, UserDocument } from "./";

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
};
const userSubscription = {};

export { userQueries, userMutation, userSubscription };
