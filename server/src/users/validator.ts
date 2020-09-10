import Joi from "@hapi/joi";

const email = Joi.string()
  .email()
  .min(7)
  .max(254)
  .trim()
  .required()
  .label("Email");
const username = Joi.string()
  .alphanum()
  .min(2)
  .max(50)
  .trim()
  .required()
  .label("UserName");
const password = Joi.string()
  .min(8)
  .max(100)
  .regex(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d).*$/)
  .message(
    "password must have at least one uppercase letter, one lowercase letter and one digit"
  )
  .required()
  .label("Password");
const repeatPassword = Joi.ref("password");
const firstName = Joi.string().max(50).trim().label("FirstName");
const lastName = Joi.string().max(50).trim().label("LastName");
const avatar = Joi.string().label("Avatar");

export const signUpValidate = Joi.object().keys({
  email,
  username,
  password,
  repeatPassword,
  firstName,
  lastName,
  avatar,
});
export const signInValidate = Joi.object().keys({
  email,
  password,
});
export const updateUserValidate = Joi.object().keys({
  password,
  repeatPassword,
  firstName,
  lastName,
  avatar,
});
