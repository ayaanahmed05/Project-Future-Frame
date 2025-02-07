import express from 'express';
import cookieParser from 'cookie-parser';

import userRoutes from './routes/userRoutes';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(userRoutes);

export default app;
