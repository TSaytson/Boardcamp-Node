import express from "express";
import cors from 'cors';
import swaggerUi from 'swagger-ui-express'
import 'express-async-errors';
import routes from './routes/index.routes'
import { errorHandlerMiddleware } from "./middlewares/errorHandler.middleware";

import swaggerDocs from './docs/swagger.json'

const app = express();

app.use(express.json())
  .use(cors())
  .use(routes)
  .use(errorHandlerMiddleware)
  .use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

export default app