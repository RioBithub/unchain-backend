import { prismaClient } from "../config/database.js";
import { BadRequest } from "../utils/errors/BadRequest.js";
import { InternalServer } from "../utils/errors/InternalServer.js";
import logger from "../utils/logger/logger.js";
import wrapper from "../utils/wrapper/wrapper.js"

const createUser = async (payload)=>{
  const ctx = 'userService-createUser'
  const { id, email } = payload;
  try {
    const isExistUser = await prismaClient.user.count({
      where: {
        OR: [
          { id: id },
          { email: email }
        ]
      }
    });
    if (isExistUser===1) {
      logger.log(ctx, 'User already exist');
      return wrapper.error(new BadRequest('User already exist'));
    }
    const result = await prismaClient.user.create({data: payload});
    return wrapper.data(result, 'Success create user');
  } catch (error) {
    return wrapper.error(new InternalServer());
  }
}

const getUserByToken = async (payload)=>{
  const { accessToken } = payload;
  try {
    const user = await prismaClient.user.findFirst({
      where:{
        accessToken : accessToken
      },
      omit:{
        accessToken: true
      },
    });
    
    return wrapper.data(user, 'Success get user data');
  } catch (error) {
    return wrapper.error();
  }
}

const updateUserTokenById = async (payload)=>{
  const { id, accessToken } = payload;
  
  try {
    const user = await prismaClient.user.update({
      where: {
        id: id
      },
      data: {
        accessToken: accessToken
      }
    });
    return wrapper.data(user, 'Success update user token');
  } catch (error) {
    return wrapper.error(new InternalServer());
  }
}

const updateUserByLoggedIn = async (payload)=>{
  const { accessToken } = payload;
  try {
    let isExistUser = await prismaClient.user.findFirst({
      where: {
        accessToken: accessToken
      }
    });

    isExistUser = {...isExistUser,...payload};
    const user = await prismaClient.user.update({
      where: {
        id: isExistUser.id
      },
      data: isExistUser
    });
    return wrapper.data(user, 'Success update user data');
  } catch (error) {
    return wrapper.error(new InternalServer());
  }
}

export default {
  createUser,
  getUserByToken,
  updateUserTokenById,
  updateUserByLoggedIn
}