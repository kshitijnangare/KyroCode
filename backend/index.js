import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
// import morgan from 'morgan';
import {connectPostgreSQL} from './config/postgreSQL.js';
import { connectRedis } from './config/redis.js';
// import {connectMongoDB} from './config/MongoDB.js';
// import { errorMiddleware } from './middlewares/errorMiddleware.js';

import authRoutes from './routes/authRoutes.js';


// 1. Initialize App & Config
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// 2. Database Connection
// connectMongoDB();
await connectPostgreSQL();
await connectRedis();

// 3. Essential Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(morgan('dev'));

// 4. Routes
app.get('/', (req, res) => {
    res.status(200).json({ message: 'API is running successfully' });
});

app.use('/api/v1/auth', authRoutes);

// 5. Error Middleware (Must be after routes)
// app.use(errorMiddleware);

// 6. Start Server
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// 7. Global Rejection Handling
process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`);
    process.exit(1);
});