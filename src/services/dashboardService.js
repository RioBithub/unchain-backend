import { prismaClient } from "../config/database.js";

export const getDashboardService = async (userId) => {
  const user = await prismaClient.user.findUnique({
    where: { id: userId },
    include: {
      histories: true,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const today = new Date();
  const startOfDay = new Date(today.setHours(0, 0, 0, 0));
  const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
  const startOfMonth = new Date(today.setDate(1));

  const dailyHistories = user.histories.filter(
    (history) => history.createdAt >= startOfDay
  );
  const weeklyHistories = user.histories.filter(
    (history) => history.createdAt >= startOfWeek
  );
  const monthlyHistories = user.histories.filter(
    (history) => history.createdAt >= startOfMonth
  );

  const calculateSugar = (histories) =>
    histories.reduce((total, history) => total + history.weight, 0);

  const dailySugar = calculateSugar(dailyHistories);
  const weeklySugar = calculateSugar(weeklyHistories);
  const monthlySugar = calculateSugar(monthlyHistories);

  const dailyConsume = dailyHistories.map((history) => ({
    title: history.title,
    weight: history.weight,
  }));

  return {
    name: user.name,
    daily_sugar: dailySugar,
    weekly_sugar: weeklySugar,
    monthly_sugar: monthlySugar,
    daily_consume: dailyConsume,
  };
};
