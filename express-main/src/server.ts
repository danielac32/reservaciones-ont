import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

// Routes
import userRouter from './User/routes/user.routes';
import salonRouter from './Salon/routes/salon.routes';
import reservationRouter from './Reservar/routes/reserve.routes';
import directionRouter from './Direction/routes/direction.routes';
const app = express();

// Middlewares
app.use(morgan('dev'))
app.use(cors());
app.use(express.json())

// Routes
app.use(userRouter)
app.use('/salon', salonRouter)
app.use('/reservations', reservationRouter)
app.use('/directions', directionRouter)

export default app;
