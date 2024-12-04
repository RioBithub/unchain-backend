import cron from "node-cron";
import { prismaClient } from "../config/database.js";
import logger from "../utils/logger/logger.js";

const updateDashboard = async () => {
  try {
    logger.log("updateDashboard", "Cron job started: Updating dashboards...");

    // Ambil semua user
    const users = await prismaClient.user.findMany({
      select: { id: true, name: true },
    });

    for (const user of users) {
      // Hitung konsumsi harian
      const dailyHistories = await prismaClient.history.findMany({
        where: {
          user_id: user.id,
          createdAt: {
            gte: new Date(new Date() - 24 * 60 * 60 * 1000), // 24 jam terakhir
          },
        },
      });
      const dailySugar = dailyHistories.reduce((total, item) => total + item.weight, 0);
      const dailyConsume = dailyHistories.map((item) => ({
        title: item.title,
        weight: item.weight,
      }));

      // Hitung konsumsi mingguan
      const weeklyHistories = await prismaClient.history.findMany({
        where: {
          user_id: user.id,
          createdAt: {
            gte: new Date(new Date() - 7 * 24 * 60 * 60 * 1000), // 7 hari terakhir
          },
        },
      });
      const weeklySugar = weeklyHistories.reduce((total, item) => total + item.weight, 0);

      // Hitung konsumsi bulanan
      const monthlyHistories = await prismaClient.history.findMany({
        where: {
          user_id: user.id,
          createdAt: {
            gte: new Date(new Date().setDate(1)), // Awal bulan ini
          },
        },
      });
      const monthlySugar = monthlyHistories.reduce((total, item) => total + item.weight, 0);

      // Upsert data ke tabel dashboard
      await prismaClient.dashboard.upsert({
        where: { user_id: user.id },
        create: {
          user_id: user.id,
          name: user.name,
          daily_sugar: dailySugar,
          weekly_sugar: weeklySugar,
          monthly_sugar: monthlySugar,
          daily_consume: dailyConsume,
        },
        update: {
          daily_sugar: dailySugar,
          weekly_sugar: weeklySugar,
          monthly_sugar: monthlySugar,
          daily_consume: dailyConsume,
          updatedAt: new Date(),
        },
      });

      logger.log("updateDashboard", `Dashboard updated for user: ${user.name}`);
    }

    logger.log("updateDashboard", "Cron job completed: Dashboards updated.");
  } catch (error) {
    logger.error("updateDashboard", `Error during cron job: ${error.message}`);
  }
};

// Schedule cron job to run every hour
cron.schedule("0 * * * *", async () => {
  await updateDashboard();
});

export default updateDashboard;
