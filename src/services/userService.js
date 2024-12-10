import { prismaClient } from "../config/database.js";
import { BadRequest } from "../utils/errors/BadRequest.js";
import { InternalServer } from "../utils/errors/InternalServer.js";
import { predictSugarLevel } from "../utils/helpers/modelHelper.js";
import logger from "../utils/logger/logger.js";
import wrapper from "../utils/wrapper/wrapper.js"
import { CONFIG, SUGAR_LEVEL } from "../utils/constant/constants.js";
import natural from "natural";

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
    return wrapper.error(new InternalServer(error));
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
    return wrapper.error(new InternalServer(error));
  }
}

const getProfile = async (payload)=>{
  const { id } = payload;

  try {
    const result = await prismaClient.user.findUnique({
      where: {
        id: id
      },
    });

    return wrapper.data(result, 'Success get user data');
  } catch (error) {
    return wrapper.error(new InternalServer(error));
  }
}

const predictSugarLevelUser = async (payload)=>{
  const ctx = 'userService-predictSugarLevelUser'
  const tfIdf = new natural.TfIdf();
  const { id } = payload;
  const oneWeekAgo = new Date(new Date().getDate() - 7);

  try {
    let histories =
     await prismaClient.history.findMany({
      where: {
        AND: {
          user_id : id,
          createdAt: {
            gte: oneWeekAgo
          }
        }
      }
    })

    if (histories.length === 0) {
      return wrapper.error(new BadRequest('History data not found'));
    }

    const sugarInTake = histories.reduce((acc,curr)=> acc+ curr.weight, 0);

    // encoding title 
    histories = histories.map(e=>e.title);
    histories.forEach(item => tfIdf.addDocument(item))

    let transformedData = []; 
    tfIdf.tfidfs(histories, function(i, measure) { transformedData.push(measure); });
    const fillData = new Array(1375).fill(0);
    transformedData = transformedData.concat(fillData).splice(0,1375)
    
    const predicted = await predictSugarLevel(CONFIG.MODEL_SUGAR_LEVEL_URL, transformedData, sugarInTake);
    const max = Math.max(...predicted)
    const idxMax = [...predicted].findIndex(e=>e===max)
    
    const result = {
      sugarLevel: SUGAR_LEVEL[idxMax]
    };
    return wrapper.data(result, 'Success predict user sugar level');
  } catch (error) {
    logger.log(ctx, error)
    return wrapper.error(new InternalServer(error));
  }
}

export default {
  createUser,
  updateUser,
  getProfile,
  predictSugarLevelUser
}