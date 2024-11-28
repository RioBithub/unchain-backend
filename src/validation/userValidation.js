import Joi from "joi";

const userCreateSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  isMale: Joi.boolean().optional(),
  dateOfBirth: Joi.string().optional(),
  weight: Joi.number().optional(),
  height: Joi.number().optional(),
  email: Joi.string().email().required(),
  photoUrl: Joi.string().required()
});

const userUpdateSchema = Joi.object({
  id: Joi.string().required(),
  isMale: Joi.boolean().optional(),
  dateOfBirth: Joi.string().optional(),
  weight: Joi.number().optional(),
  height: Joi.number().optional(),
});

export {
  userCreateSchema,
  userUpdateSchema
}