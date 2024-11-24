import { prismaClient } from "../../config/database.js";
import httpCode from "../constant/httpCode.js"
import { InternalServer } from "../errors/InternalServer.js";
import { Unauthorized } from "../errors/Unauthorized.js"
import logger from "../logger/logger.js";
import wrapper from "../wrapper/wrapper.js"


const verifyToken = async (req, res, next)=>{
  const ctx = 'middleware-verifyToken';
  if (!req.headers.authorization) {
    logger.log(ctx, 'Unauthorized');
    return wrapper.response(res, 'fail', wrapper.error(new Unauthorized()), 'Unauthorized', httpCode.UNAUTHORIZED);
  }
  req.accessToken = req.headers.authorization.split(' ')[1];
  
  try {
    const result = await prismaClient.user.count({
      where: {
        accessToken: req.accessToken
      }
    })
    if (result===0) {
      logger.log(ctx, 'Unauthorized');
      return wrapper.response(res, 'fail', wrapper.error(new Unauthorized()), 'Unauthorized', httpCode.UNAUTHORIZED);
    }
  } catch (error) {
    return wrapper.response(res, 'fail', wrapper.error(new InternalServer()), null, httpCode.INTERNAL_SERVER);
  }
  next();
}

export {
  verifyToken
}