import { Router } from 'express';
import Leaderboard from '../models/Leaderboard.js';

const leaderboardRouter = Router();

leaderboardRouter.get('/', async (_req, res) => {
  try {
    const data = await Leaderboard.find()
      .populate('user', 'username fullName')
      .populate('team', 'name')
      .sort({ points: -1 })
      .lean();
    res.json({ message: 'Leaderboard retrieved successfully', count: data.length, data });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve leaderboard', error: String(error) });
  }
});

export default leaderboardRouter;
