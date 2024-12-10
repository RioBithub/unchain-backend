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

const predictUserBehaviour = async (payload)=>{
  const { id } = payload;

  try {
    const result = Promise.all([
      await prismaClient.history.findMany({
        where: {
          user_id: id
        }
      }),
      await prismaClient.user.findFirst({
        where:{id: id}
      })
    ]);
    const histories = result[0]
    const user = result[1]

    const reportedDate = Array.from(new Set(histories.map(item => item.createdAt))).length;
    const missingDay = Math.abs(new Date.now()-user.createdAt)

    return wrapper.data({
      reportedDate,
      missingDay
    }, 'Success get user data');
  } catch (error) {
    return wrapper.error(new InternalServer(error));
  }
}

export default {
  createUser,
  updateUser,
  getProfile,
  predictSugarLevelUser,
  predictUserBehaviour
}