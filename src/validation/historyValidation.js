import Joi from "joi";

export const historyCreateSchema = Joi.object({
  title: Joi.string().max(255).required(),
  weight: Joi.number().required(),
  isBeverage: Joi.boolean().required(),
  userId: Joi.string().required(),
});

export const historyUpdateSchema = Joi.object({
  id: Joi.number().required(),
  title: Joi.string().max(255).required(),
  weight: Joi.number().required(),
  isBeverage: Joi.boolean().required(),
});

const getHistoriesByUser = async (req, res) => {
    const userId = req.user.id; // Ambil user ID dari token pengguna
  
    const result = await historyService.getHistoriesByUser(userId);
  
    result.err
      ? wrapper.response(res, 'fail', result, 'Failed to fetch histories', httpCode.INTERNAL_SERVER)
      : wrapper.response(res, 'success', result, 'Histories fetched successfully', httpCode.OK);
  };
  