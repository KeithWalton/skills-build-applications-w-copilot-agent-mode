import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import usersRouter from './routes/users.js';
import teamsRouter from './routes/teams.js';
import activitiesRouter from './routes/activities.js';
import leaderboardRouter from './routes/leaderboard.js';
import workoutsRouter from './routes/workouts.js';
import { getApiBaseUrl } from './config/baseUrl.js';
import { connectDB } from './config/database.js';

dotenv.config();

const app = express();
const PORT = 8000;

// Middleware
app.use(cors());
app.use(express.json());

const BASE_URL = getApiBaseUrl(PORT);

// Routes
app.get('/health', (req, res) => {
  res.json({
    status: 'API is running',
    port: PORT,
    baseUrl: BASE_URL,
  });
});

app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

// Start server
async function startServer() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server is running on ${BASE_URL}`);
  });
}

startServer();
