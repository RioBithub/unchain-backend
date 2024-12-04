import firebaseAdmin from "../../config/firebase-admin.js";
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

  const idToken = req.headers.authorization.split(" ")[1];

  try {
    const decodedIdToken = await firebaseAdmin.auth().verifyIdToken(idToken);
    if (!decodedIdToken) {
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
      id: decodedIdToken.user_id,
      name: decodedIdToken.name,
      email: decodedIdToken.email,
    };
  } catch (error) {
    logger.log(ctx, error.message, error.code);
    return wrapper.response(
      res,
      "fail",
      wrapper.error(new InternalServer(error.message)),
      null,
      httpCode.INTERNAL_SERVER
    );
  }
  next();
};

export { verifyToken };
