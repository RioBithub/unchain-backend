import dashboardService from "../services/dashboardService.js";
import wrapper from "../utils/wrapper/wrapper.js";
import httpCode from "../utils/constant/httpCode.js";

const getDashboard = async (req, res) => {
  const userId = req.user.id; // Ambil user ID dari token pengguna

  const result = await dashboardService.getDashboardByUserId(userId);

  result.err
    ? wrapper.response(res, "fail", result, result.message, httpCode.NOT_FOUND)
    : wrapper.response(res, "success", result, "Dashboard fetched successfully", httpCode.OK);
};

const processDashboard = async (req, res) => {
  const userId = req.user.id; // Ambil user ID dari token pengguna

  const result = await dashboardService.processDashboardData(userId);

  result.err
    ? wrapper.response(res, "fail", result, result.message, httpCode.INTERNAL_SERVER)
    : wrapper.response(res, "success", result, "Dashboard processed successfully", httpCode.OK);
};

export default {
  getDashboard, // Tambahkan fungsi ini
  processDashboard,
};
