import logger from "../logger/logger.js";
import wrapper from "../wrapper/wrapper.js";

const verifyToken = async (req, res, next) => {
  const ctx = "middleware-verifyToken";
  
  // Log informasi bahwa validasi token dilewati
  logger.log(ctx, "Skipping token validation for testing purposes.");
  
  // Tambahkan informasi pengguna default ke req (opsional)
  req.user = {
    id: "test-user-id",
    name: "Test User",
    email: "testuser@example.com",
  };

  next();
};

export { verifyToken };
