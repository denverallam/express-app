import cors from 'cors';
import express, { Application } from 'express';
import helmet from 'helmet';
import { corsConfig, sequelize } from './config';
import { errorHandlerMiddleware } from './middleware/error.middleware';
import { authRoute, userRoute } from './routes';

const app: Application = express();

app.use(cors(corsConfig)).use(helmet()).use(express.json());

app.use(authRoute).use(userRoute);

app.use(errorHandlerMiddleware);

const port = process.env.PORT;

sequelize
  .sync()
  .then(() => {
    console.log('Database is connected');
    app.listen(port, () => {
      console.log('Server is running on port', port);
    });
  })
  .catch((err) => {
    console.log(err);
  });
