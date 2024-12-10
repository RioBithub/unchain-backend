import { config } from "dotenv";
config()

export const CONFIG = {
  PORT: process.env.PORT,
  MODEL_SUGAR_LEVEL_URL: process.env.MODEL_SUGAR_LEVEL_URL
}

export const SUGAR_LEVEL = ['High', 'Low', 'Normal'];