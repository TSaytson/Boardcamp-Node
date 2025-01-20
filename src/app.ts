import express from "express";
import cors from 'cors';
import 'express-async-errors';
import routes from './routes/index.routes'
import { errorHandlerMiddleware } from "./middlewares/errorHandler.middleware";

const app = express();

app.use(express.json())
  .use(cors())
  .use(routes)
  .use(errorHandlerMiddleware)

export default app