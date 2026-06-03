import { Router } from 'express';
import Workout from '../models/Workout.js';

const workoutsRouter = Router();

workoutsRouter.get('/', async (_req, res) => {
  try {
    const data = await Workout.find().sort({ durationMinutes: 1 }).lean();
    res.json({ message: 'Workouts retrieved successfully', count: data.length, data });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve workouts', error: String(error) });
  }
});

export default workoutsRouter;
