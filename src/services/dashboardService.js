import { prismaClient } from "../config/database.js";
import wrapper from "../utils/wrapper/wrapper.js";
import { InternalServer } from "../utils/errors/InternalServer.js";

const getOrCreateDashboard = async (userId) => {
  try {
    // Ambil data user untuk nama
    const user = await prismaClient.user.findUnique({
      where: { id: userId },
      select: { name: true },
    });

    if (!user) {
      return wrapper.error(new Error("User not found"));
    }

    const todayStart = new Date(new Date().setHours(0, 0, 0, 0));
    const todayEnd = new Date(new Date().setHours(23, 59, 59, 999));

    // Hitung konsumsi gula harian
    const dailySugar = await prismaClient.history.aggregate({
      where: {
        user_id: userId,
        createdAt: {
          gte: todayStart,
          lt: todayEnd,
        },
      },
      _sum: {
        weight: true,
      },
    });

    // Ambil semua konsumsi harian (list makanan/minuman)
    const dailyConsume = await prismaClient.history.findMany({
      where: {
        user_id: userId,
        createdAt: {
          gte: todayStart,
          lt: todayEnd,
        },
      },
      select: {
        title: true,
        weight: true,
      },
    });

    // Hitung konsumsi gula mingguan
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);

    const weeklySugar = await prismaClient.history.aggregate({
      where: {
        user_id: userId,
        createdAt: {
          gte: weekStart,
          lt: weekEnd,
        },
      },
      _sum: {
        weight: true,
      },
    });

    // Hitung konsumsi gula bulanan
    const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const monthEnd = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);

    const monthlySugar = await prismaClient.history.aggregate({
      where: {
        user_id: userId,
        createdAt: {
          gte: monthStart,
          lt: monthEnd,
        },
      },
      _sum: {
        weight: true,
      },
    });

    // Perbarui tabel Dashboard
    const dashboard = await prismaClient.dashboard.upsert({
      where: { user_id: userId },
      update: {
        name: user.name,
        daily_sugar: dailySugar._sum.weight || 0,
        weekly_sugar: weeklySugar._sum.weight || 0,
        monthly_sugar: monthlySugar._sum.weight || 0,
      },
      create: {
        user_id: userId,
        name: user.name,
        daily_sugar: dailySugar._sum.weight || 0,
        weekly_sugar: weeklySugar._sum.weight || 0,
        monthly_sugar: monthlySugar._sum.weight || 0,
      },
    });

    // Tambahkan konsumsi harian ke hasil response
    const dashboardWithConsume = {
      ...dashboard,
      dailyConsume: dailyConsume, // List makanan/minuman hari ini
    };

    return wrapper.data(dashboardWithConsume, "Dashboard fetched and updated successfully");
  } catch (error) {
    console.error("Error in getOrCreateDashboard:", error);
    return wrapper.error(new InternalServer());
  }
};

export default {
  getOrCreateDashboard,
};
