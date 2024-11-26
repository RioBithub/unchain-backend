import wrapper from "../utils/wrapper/wrapper.js";
import historyService from '../services/historyService.js';
import httpCode from "../utils/constant/httpCode.js";
import { validateSchema } from "../utils/validator/validator.js";
import { historyCreateSchema, historyUpdateSchema } from "../validation/historyValidation.js";

const createHistory = async (req, res) => {
  const payload = { ...req.body, userId: req.user.id };
  const checkValidation = validateSchema(historyCreateSchema, payload);

  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return historyService.createHistory(result);
  };

  const sendResponse = async (result) => {
    result.err
      ? wrapper.response(res, 'fail', result, result.message, httpCode.BAD_REQUEST)
      : wrapper.response(res, 'success', result, 'History created successfully', httpCode.CREATED);
  };

  sendResponse(await postRequest(checkValidation));
};

const getHistoriesByUser = async (req, res) => {
  const userId = req.user.id;

  const result = await historyService.getHistoriesByUser(userId);

  result.err
    ? wrapper.response(res, 'fail', result, 'Failed to fetch histories', httpCode.INTERNAL_SERVER)
    : wrapper.response(res, 'success', result, 'Histories fetched successfully', httpCode.OK);
};

const updateHistoryById = async (req, res) => {
  const payload = { ...req.body, id: parseInt(req.params.id), userId: req.user.id };
  const checkValidation = validateSchema(historyUpdateSchema, payload);

  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return historyService.updateHistoryById(result);
  };

  const sendResponse = async (result) => {
    result.err
      ? wrapper.response(res, 'fail', result, result.message, httpCode.BAD_REQUEST)
      : wrapper.response(res, 'success', result, 'History updated successfully', httpCode.OK);
  };

  sendResponse(await postRequest(checkValidation));
};

const deleteHistoryById = async (req, res) => {
    const historyId = parseInt(req.params.id);
    const userId = req.user.id; // Ambil userId dari token
  
    const result = await historyService.deleteHistoryById(historyId, userId);
  
    result.err
      ? wrapper.response(res, 'fail', result, result.message, httpCode.INTERNAL_SERVER)
      : wrapper.response(res, 'success', result, 'History deleted successfully', httpCode.OK);
  };
  

export default {
  createHistory,
  getHistoriesByUser,
  updateHistoryById,
  deleteHistoryById,
};
