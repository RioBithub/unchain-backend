import { userCreateSchema, userGetDataSchema, userUpdateSchema, userUpdateTokenSchema } from "../validation/userValidation.js";
import { validateSchema } from "../utils/validator/validator.js";
import wrapper from "../utils/wrapper/wrapper.js";
import userService from '../services/userService.js'
import httpCode from "../utils/constant/httpCode.js";

const createUser = async (req, res)=>{
  const payload = req.body;
  const checkValidation = validateSchema(userCreateSchema, payload);
  const postRequest = async(result)=>{
    if (result.err) {
      return result
    }
    return userService.createUser(result);
  }
  const sendResponse = async(result)=>{
    (result.err) ? wrapper.response(res, 'fail', result, 'Failed create user', httpCode.INTERNAL_SERVER)
      : wrapper.response(res, 'success', result, 'Success create user', httpCode.CREATED);
  };
  sendResponse(await postRequest(checkValidation));
}

const getUserByToken = async (req, res)=>{
  const payload = { accessToken: req.accessToken };
  const checkValidation = validateSchema(userGetDataSchema, payload);
  const postRequest = async(result)=>{
    if (result.err) {
      return result
    }
    return userService.getUserByToken(result);
  }
  const sendResponse = async(result)=>{
    (result.err) ? wrapper.response(res, 'fail', result, 'Failed get user data', httpCode.INTERNAL_SERVER)
      : wrapper.response(res, 'success', result, 'Success get user data', httpCode.OK);
  };
  sendResponse(await postRequest(checkValidation));
}

const updateUserTokenById = async (req, res)=>{
  const payload = { id: req.params.id, accessToken: req.body.accessToken };
  const checkValidation = validateSchema(userUpdateTokenSchema, payload);
  const postRequest = async(result)=>{
    if (result.err) {
      return result
    }
    return userService.updateUserTokenById(result);
  }
  const sendResponse = async(result)=>{
    (result.err) ? wrapper.response(res, 'fail', result, 'Failed update token', httpCode.INTERNAL_SERVER)
      : wrapper.response(res, 'success', result, 'Success update user token', httpCode.OK);
  };
  sendResponse(await postRequest(checkValidation));
}

const updateUserByLoggedIn = async (req, res)=>{
  const payload = { ...req.body, accessToken: req.accessToken };
  const checkValidation = validateSchema(userUpdateSchema, payload);
  const postRequest = async(result)=>{
    if (result.err) {
      return result
    }
    return userService.updateUserByLoggedIn(result);
  }
  const sendResponse = async(result)=>{
    (result.err) ? wrapper.response(res, 'fail', result, 'Failed update user data', httpCode.INTERNAL_SERVER)
      : wrapper.response(res, 'success', result, 'Success get update data', httpCode.OK);
  };
  sendResponse(await postRequest(checkValidation));
}

export default {
  createUser,
  getUserByToken,
  updateUserTokenById,
  updateUserByLoggedIn
}