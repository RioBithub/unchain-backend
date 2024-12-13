import { prismaClient } from "../config/database.js";
import { BadRequest } from "../utils/errors/BadRequest.js";
import { InternalServer } from "../utils/errors/InternalServer.js";
import * as modelHelper from "../utils/helpers/modelHelper.js";
import logger from "../utils/logger/logger.js";
import wrapper from "../utils/wrapper/wrapper.js"
import { CONFIG, MILLISECONDS, SUGAR_LEVEL, BEHAVIOUR_USER, MESSAGE_OPTION } from "../utils/constant/constants.js";
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
    if (!result) {
      return wrapper.error(new BadRequest('Data not found'));
    }

    return wrapper.data(result, 'Success get user data');
  } catch (error) {
    return wrapper.error(new InternalServer(error));
  }
}

const predictSugarLevelUser = async (payload)=>{
  const ctx = 'userService-predictSugarLevelUser'
  const tfIdf = new natural.TfIdf();
  const { id } = payload;
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate()-7);

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
    
    const predicted = await modelHelper.predictSugarLevel(CONFIG.MODEL_SUGAR_LEVEL_URL, transformedData, sugarInTake);
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

const predictBehaviourUser = async (payload)=>{
  const ctx = 'userService-predictBehaviourUser'
  const { id } = payload;
  let behaviourStatus = BEHAVIOUR_USER[3];
  let randomNumber = Math.floor(Math.random() * MESSAGE_OPTION[behaviourStatus].length)
  
  try {
    const results = await Promise.all([
      prismaClient.user.findUnique({
        where: {
          id: id
        },
      }),
      prismaClient.$queryRaw`
        SELECT DATE(h."createdAt") AS date, SUM(h.weight) AS weight
        FROM histories h
        WHERE h.user_id = ${id}
        GROUP BY DATE(h."createdAt");
      `
    ]);

    if (results[1].length === 0) {
      const resultData = {
        behaviourStatus,
        message: MESSAGE_OPTION[behaviourStatus][randomNumber]
      }
      return wrapper.data(resultData, 'Success get user behaviour');
    }
    
    const user = results[0];
    const histories = results[1].map(e=>e.weight);
    const firstDay = new Date(user.createdAt);
    const today = new Date();
    

    const reportedDays = histories.length;
    const timeDifference = Math.abs(today-firstDay);
    const totalDays = Math.ceil(timeDifference / MILLISECONDS);
    const missingDays = totalDays - reportedDays;
    const zeroDays = histories.filter(e=>e===0).length
    const persistOverConsumption = histories.filter(e=>e>70).length
    const excessDay = histories.filter(e=>e>100).length;
    const totalConsume = histories.reduce((acc, curr)=>acc+curr,0);
    const avgSugar = totalConsume/histories.length;
    const stdSugar = Math.sqrt(histories.map(x => Math.pow(x - avgSugar, 2)).reduce((a, b) => a + b) / reportedDays);
    const maxSugar = Math.max(...histories);

    const predictionData = 
    {
      avgSugar,
      stdSugar,
      maxSugar,
      excessDay,
      missingDays,
      zeroDays,
      stdSugar,
      persistOverConsumption
    }

    const predicted = await modelHelper.predictBehaviour(CONFIG.MODEL_USER_BEHAVIOUR_URL, predictionData);
    const idxMax = predicted.findIndex(e=>e===Math.max(...predicted))
    behaviourStatus = BEHAVIOUR_USER[idxMax];
    randomNumber = Math.floor(Math.random() * MESSAGE_OPTION[behaviourStatus].length)
    const resultData = {
      behaviourStatus,
      message: MESSAGE_OPTION[behaviourStatus][randomNumber]
    }
    return wrapper.data(resultData, 'Success get user behaviour');
  } catch (error) {
    logger.log(ctx, error)
    return wrapper.error(new InternalServer(error));
  }
}

export default {
  createUser,
  updateUser,
  getProfile,
  predictSugarLevelUser,
  predictBehaviourUser
}