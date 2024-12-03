import { prismaClient } from "../config/database.js";
import wrapper from "../utils/wrapper/wrapper.js";
import { InternalServer } from "../utils/errors/InternalServer.js";

const processDashboardData = async (userId) => {
  try {
    // Ambil data user untuk nama
    const user = await prismaClient.user.findUnique({
      where: { id: userId },
      select: { name: true },
    });

    if (!user) {
      return wrapper.error(new Error("User not found"));
    }

    // Definisi rentang waktu
    const todayStart = new Date(new Date().setHours(0, 0, 0, 0));
    const todayEnd = new Date(new Date().setHours(23, 59, 59, 999));
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const monthEnd = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);

    // Konsumsi gula harian
    const dailySugar = await prismaClient.history.aggregate({
      where: {
        user_id: userId,
        createdAt: { gte: todayStart, lt: todayEnd },
      },
      _sum: { weight: true },
    });

    // Konsumsi gula mingguan
    const weeklySugar = await prismaClient.history.aggregate({
      where: {
        user_id: userId,
        createdAt: { gte: weekStart, lt: weekEnd },
      },
      _sum: { weight: true },
    });

    // Konsumsi gula bulanan
    const monthlySugar = await prismaClient.history.aggregate({
      where: {
        user_id: userId,
        createdAt: { gte: monthStart, lt: monthEnd },
      },
      _sum: { weight: true },
    });

    // Konsumsi harian (list makanan/minuman)
    const dailyConsume = await prismaClient.history.findMany({
      where: {
        user_id: userId,
        createdAt: { gte: todayStart, lt: todayEnd },
      },
      select: { title: true, weight: true },
    });

    // Perbarui atau buat data Dashboard
    const dashboard = await prismaClient.dashboard.upsert({
      where: { user_id: userId },
      update: {
        name: user.name,
        daily_sugar: dailySugar._sum.weight || 0,
        weekly_sugar: weeklySugar._sum.weight || 0,
        monthly_sugar: monthlySugar._sum.weight || 0,
        daily_consume: dailyConsume, // Simpan sebagai JSON
      },
      create: {
        user_id: userId,
        name: user.name,
        daily_sugar: dailySugar._sum.weight || 0,
        weekly_sugar: weeklySugar._sum.weight || 0,
        monthly_sugar: monthlySugar._sum.weight || 0,
        daily_consume: dailyConsume, // Simpan sebagai JSON
      },
    });

    // Kembalikan hasil (dengan konsumsi harian)
    return wrapper.data(
      {
        ...dashboard,
        dailyConsume: dailyConsume, // List makanan/minuman
      },
      "Dashboard processed successfully"
    );
  } catch (error) {
    console.error("Error in processDashboardData:", error);
    return wrapper.error(new InternalServer());
  }
};

const getDashboardByUserId = async (userId) => {
  try {
    // Ambil data dashboard berdasarkan user ID
    const dashboard = await prismaClient.dashboard.findUnique({
      where: { user_id: userId },
    });

    if (!dashboard) {
      return wrapper.error(new Error("Dashboard not found"));
    }

    return wrapper.data(dashboard, "Dashboard fetched successfully");
  } catch (error) {
    console.error("Error in getDashboardByUserId:", error);
    return wrapper.error(new InternalServer());
  }
};

export default {
  processDashboardData,
  getDashboardByUserId,
};
