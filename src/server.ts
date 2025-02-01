import express, { Application } from 'express';
import { sequelize } from './config';
import { authRoute } from './routes';

const app: Application = express();

app.use(express.json())

app.use(authRoute)

const port = process.env.PORT

sequelize.sync().then(() => {
    console.log('Database is connected');
    app.listen(port, () => {
        console.log('Server is running on port', port);
    });
}).catch((err) => {
    console.log(err)
})