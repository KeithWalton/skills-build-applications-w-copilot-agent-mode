import { Router } from 'express';
import User from '../models/User.js';

const usersRouter = Router();

usersRouter.get('/', async (_req, res) => {
  try {
    const data = await User.find().populate('team', 'name region').sort({ createdAt: -1 }).lean();
    res.json({ message: 'Users retrieved successfully', count: data.length, data });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve users', error: String(error) });
  }
});

export default usersRouter;
