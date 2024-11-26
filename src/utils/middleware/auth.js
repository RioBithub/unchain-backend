import { prismaClient } from "../../config/database.js";
import httpCode from "../constant/httpCode.js";
import { InternalServer } from "../errors/InternalServer.js";
import { Unauthorized } from "../errors/Unauthorized.js";
import logger from "../logger/logger.js";
import wrapper from "../wrapper/wrapper.js";

const verifyToken = async (req, res, next) => {
  const ctx = "middleware-verifyToken";
  if (!req.headers.authorization) {
    logger.log(ctx, "Unauthorized");
    return wrapper.response(
      res,
      "fail",
      wrapper.error(new Unauthorized()),
      "Unauthorized",
      httpCode.UNAUTHORIZED
    );
  }

  req.accessToken = req.headers.authorization.split(" ")[1];

  try {
    const user = await prismaClient.user.findFirst({
      where: {
        accessToken: req.accessToken,
      },
    });

    if (!user) {
      logger.log(ctx, "Unauthorized");
      return wrapper.response(
        res,
        "fail",
        wrapper.error(new Unauthorized()),
        "Unauthorized",
        httpCode.UNAUTHORIZED
      );
    }

    // Tambahkan informasi pengguna ke req
    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  } catch (error) {
    logger.log(ctx, "Internal Server Error", error);
    return wrapper.response(
      res,
      "fail",
      wrapper.error(new InternalServer()),
      null,
      httpCode.INTERNAL_SERVER
    );
  }
  next();
};

export { verifyToken };
