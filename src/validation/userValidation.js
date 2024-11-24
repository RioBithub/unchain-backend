import Joi from "joi";

const userCreateSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  age: Joi.number().optional(),
  weight: Joi.number().optional(),
  height: Joi.number().optional(),
  email: Joi.string().email().required(),
  photoUrl: Joi.string().required(),
  accessToken: Joi.string().optional()
});

const userGetDataSchema = Joi.object({
  accessToken: Joi.string().required()
});

const userUpdateTokenSchema = Joi.object({
  id: Joi.string().required(),
  accessToken: Joi.string().required()
});

const userUpdateSchema = Joi.object({
  name: Joi.string().optional(),
  age: Joi.number().optional(),
  weight: Joi.number().optional(),
  height: Joi.number().optional(),
  email: Joi.string().email().optional(),
  photoUrl: Joi.string().optional(),
  accessToken: Joi.string().required()
});

export {
  userCreateSchema,
  userGetDataSchema,
  userUpdateTokenSchema,
  userUpdateSchema
}