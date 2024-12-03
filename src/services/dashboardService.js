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

    // Hitung konsumsi gula harian
    const todayStart = new Date(new Date().setHours(0, 0, 0, 0)); // Start of today
    const todayEnd = new Date(new Date().setHours(23, 59, 59, 999)); // End of today
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

    // Item konsumsi harian terbesar
    const dailyConsume = await prismaClient.history.findFirst({
      where: {
        user_id: userId,
        createdAt: {
          gte: todayStart,
          lt: todayEnd,
        },
      },
      orderBy: {
        weight: "desc", // Order by weight
      },
      select: {
        title: true,
        weight: true,
      },
    });

    // Hitung konsumsi gula mingguan
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - weekStart.getDay()); // Start of the week
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6); // End of the week
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
    const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1); // Start of the month
    const monthEnd = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0); // End of the month
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
        daily_consume: dailyConsume?.title || "No data",
        daily_consume_weight: dailyConsume?.weight || 0,
      },
      create: {
        user_id: userId,
        name: user.name,
        daily_sugar: dailySugar._sum.weight || 0,
        weekly_sugar: weeklySugar._sum.weight || 0,
        monthly_sugar: monthlySugar._sum.weight || 0,
        daily_consume: dailyConsume?.title || "No data",
        daily_consume_weight: dailyConsume?.weight || 0,
      },
    });

    // Kembalikan data dashboard
    return wrapper.data(dashboard, "Dashboard fetched and updated successfully");
  } catch (error) {
    console.error("Error in getOrCreateDashboard:", error);
    return wrapper.error(new InternalServer());
  }
};

export default {
  getOrCreateDashboard,
};
