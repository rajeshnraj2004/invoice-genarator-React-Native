import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import ConnectDB from './config/DBConnect.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const App = express();
const PORT = process.env.PORT || 8000; // Fallback port if not in .env

// 1. Middleware (Must be defined BEFORE routes)
App.use(cors());
App.use(express.json());

// 2. Database Connection (Should run immediately)
ConnectDB();

// 3. Routes
App.use('/api/auth', authRoutes);

// 4. Start Server
App.listen(PORT, () => {
    console.log(`Server is Running on Port ${PORT}`);
});