import express from 'express';
import cookieParser from 'cookie-parser';

import userRoutes from './routes/userRoutes';
import orderRoutes from './routes/orderRoutes';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(userRoutes);
app.use(orderRoutes);

export default app;
