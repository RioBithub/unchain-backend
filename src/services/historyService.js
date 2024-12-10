import { prismaClient } from "../config/database.js";
import wrapper from "../utils/wrapper/wrapper.js";
import { InternalServer } from "../utils/errors/InternalServer.js";
import logger from "../utils/logger/logger.js";

const createHistory = async (payload) => {
    const ctx = 'historyService-createHistory';
  
    try {
      const history = await prismaClient.history.create({
        data: {
          title: payload.title,
          weight: payload.weight,
          isBeverage: payload.isBeverage,
          user: {
            connect: {
              id: payload.userId, // Menghubungkan dengan user_id yang ada
            },
          },
        },
      });
      return wrapper.data(history, 'History created successfully');
    } catch (error) {
      logger.log(ctx, error)
      return wrapper.error(new InternalServer());
    }
  };
  

  const getHistoriesByUser = async (userId) => {
    try {
      const histories = await prismaClient.history.findMany({
        where: { user_id: userId }, // Gunakan user_id sesuai schema Prisma
        orderBy: { createdAt: 'desc' },
      });
      return wrapper.data(histories, 'Histories fetched successfully');
    } catch (error) {
      console.error("Error in getHistoriesByUser:", error);
      return wrapper.error(new InternalServer());
    }
  };
  

const updateHistoryById = async (payload) => {
  try {
    const history = await prismaClient.history.update({
      where: { id: payload.id },
      data: {
        title: payload.title,
        weight: payload.weight,
        isBeverage: payload.isBeverage,
      },
    });
    return wrapper.data(history, 'History updated successfully');
  } catch (error) {
    console.error("Error in updateHistoryById:", error);
    return wrapper.error(new InternalServer());
  }
};

const deleteHistoryById = async (id, userId) => {
    try {
      // Cari history berdasarkan id dan user_id
      const history = await prismaClient.history.findFirst({
        where: { id, user_id: userId }, // Gunakan user_id sesuai schema Prisma
      });
  
      if (!history) {
        return wrapper.error(new Error('History not found'));
      }
  
      // Hapus history
      await prismaClient.history.delete({
        where: { id },
      });
  
      return wrapper.data({}, 'History deleted successfully');
    } catch (error) {
      console.error("Error in deleteHistoryById:", error);
      return wrapper.error(new InternalServer());
    }
  };
  

  export default {
    createHistory,
    getHistoriesByUser,
    updateHistoryById,
    deleteHistoryById,
  };    
