import express from "express";
import cors from 'cors';
import userRouter from "./router/userRouter.js";
import logger from "./utils/logger/logger.js";
import wrapper from "./utils/wrapper/wrapper.js";
import { NotFound } from "./utils/errors/NotFound.js";
import httpCode from "./utils/constant/httpCode.js";
import { CONFIG } from "./utils/constant/constants.js";
import historyRouter from "./router/historyRouter.js";
const app = express();

app.use(cors());
app.use(express.json())

app.get('/', (req, res)=>{
  res.send({message: 'Server is running!!!'})
});

const routers = [userRouter, historyRouter]

routers.forEach(e=> app.use('/api/v1', e.router))

app.use((req, res)=>{
  wrapper.response(res, 'fail', wrapper.error(new NotFound('Not Found')), '', httpCode.NOT_FOUND);
})

app.listen(CONFIG.PORT||8080,'0.0.0.0',()=>{
  const ctx = 'app-listen';
  logger.log(ctx, `App running at ${CONFIG.PORT||8080}`, 'initate application')
})
