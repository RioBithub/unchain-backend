import { getDashboardService } from '../services/dashboardService.js';

export const getDashboard = async (req, res) => {
  try {
    const userId = req.query.userId;

    if (!userId) {
      return res.status(400).json({
        status: 'error',
        message: 'User ID is required',
        code: 400,
      });
    }

    const dashboardData = await getDashboardService(userId);

    return res.status(200).json({
      status: 'success',
      data: dashboardData,
      message: 'Dashboard fetched successfully',
      code: 200,
    });
  } catch (error) {
    console.error('Error in getDashboard:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      code: 500,
    });
  }
};
