import { AuthenticationError } from "apollo-server-express";
import { Request, Response } from "express";
import { User, UserDocument } from "./";
import { fields } from "../utils";

export const attemptSignIn = async (
  { email, password }: { email: string; password: string },
  fields: string
): Promise<UserDocument> => {
  const user = await User.findOne({ email }).select(`${fields}password`);
  if (!user || !user.matchesPassword(password)) {
    throw new AuthenticationError(
      "Incorrect email or password, please try again"
    );
  }
  return user;
};
