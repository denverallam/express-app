import express, { Application } from 'express';
import { authRouter } from './routes/auth.route';
import { sequelize } from './config/db.config';

const app: Application = express();

app.use(express.json())

app.use(authRouter)

const port = process.env.PORT

sequelize.sync().then(() => {
    console.log('Database is connected');
    app.listen(port, () => {
        console.log('Server is running on port', port);
    });
}).catch((err) => {
    console.log(err)
})