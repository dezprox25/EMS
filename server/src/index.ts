import express from 'express';
import dotenv from 'dotenv';
import connectDB from './utils/databse';
import authRoutes from './routes/auth';
import cors from 'cors';




dotenv.config();
console.log('MONGODB_URI:', process.env.MONGODB_URI);

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json()); // Add this line!
app.use('/api/auth', authRoutes);

app.use(cors({
  origin: 'http://localhost:3000', // Allow your frontend origin
  credentials: true                // If you need cookies/auth
}));

app.get('/', (req, res) => {
  res.send('EMS Backend is running!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});