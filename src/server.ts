import cors from 'cors';
import express, { Application } from 'express';
import helmet from 'helmet';
import { corsConfig, sequelize } from './config';
import { authRoute, userRoute } from './routes';

const app: Application = express();

app.use(cors(corsConfig));
app.use(helmet())
app.use(express.json());

app.use(authRoute)
app.use(userRoute)

const port = process.env.PORT

sequelize.sync().then(() => {
    console.log('Database is connected');
    app.listen(port, () => {
        console.log('Server is running on port', port);
    });
}).catch((err) => {
    console.log(err)
})