import { prismaClient } from "../config/database.js";
import { BadRequest } from "../utils/errors/BadRequest.js";
import { InternalServer } from "../utils/errors/InternalServer.js";
import logger from "../utils/logger/logger.js";
import wrapper from "../utils/wrapper/wrapper.js"

const createUser = async (payload)=>{
  const ctx = 'userService-createUser'
  
  const { id, email, dateOfBirth } = payload;
  try {
    const isExistUser = await prismaClient.user.findFirst({
      where: {
        OR: [
          { id: id },
          { email: email }
        ]
      }
    });
    if (isExistUser) {
      logger.log(ctx, 'User already exist');
      return wrapper.error(new BadRequest('User already exist'));
    }

    const data = { 
      ...payload
    };
    
    data.dateOfBirth = dateOfBirth ? new Date(dateOfBirth) : null;
    const result = await prismaClient.user.create({data});
    
    return wrapper.data(result, 'Success create user');
  } catch (error) {
    return wrapper.error(new InternalServer());
  }
}

const updateUser = async (payload)=>{
  const { id, dateOfBirth } = payload;
  try {
    const result = await prismaClient.user.update({
      where: {
        id: id
      },
      data: {...payload, dateOfBirth: new Date(dateOfBirth)}
    });

    return wrapper.data(result, 'Success update user');
  } catch (error) {
    return wrapper.error(new InternalServer());
  }
}

export default {
  createUser,
  updateUser
}