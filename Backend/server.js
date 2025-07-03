import express from 'express'
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db/db.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.routes.js';
dotenv.config();
import captainRoutes from './routes/captain.routes.js';
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/user',userRoutes)
app.use('/api/captain', captainRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB().then(() => {
    console.log('Database connected successfully');
  }).catch((error) => {
    console.error('Database connection failed:', error);
  });
});
