import Joi from "@hapi/joi";
import { objectId } from "../utils";

const title = Joi.string().required().label("Title");
const alias = Joi.string().required().label("Alias");
const summary = Joi.string().required().label("Summary");
const content = Joi.string().required().label("Content");
const cover = Joi.string().required().label("Cover");
const photos = Joi.string().label("Photos");
const userId = Joi.objectId().label("User Id");
const status = Joi.boolean().label("Status");
const likes = (userId: string) =>
  Joi.array().items(Joi.objectId().label("Like")).label("Likes");
const commentStatus = Joi.boolean().label("commentStatus");
