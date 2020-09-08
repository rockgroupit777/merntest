import Joi, { ExtensionFactory } from "@hapi/joi";
import { Types } from "mongoose";
export const objectId: ExtensionFactory = (Joi) => ({
  type: "objectId",
  base: Joi.string(),
  messages: {
    objectId: '"{{#label}}" must be a valid Object ID',
  },
  validate(value, helpers) {
    if (!Types.ObjectId.isValid(value)) {
      return { value, errors: helpers.error("objectId") };
    }
  },
});
export const objectIdValidate = Joi.object().keys({
  id: Joi.extend(objectId).objectId().label("ObjectId"),
});
