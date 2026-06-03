import { Router } from 'express';
import Team from '../models/Team.js';

const teamsRouter = Router();

teamsRouter.get('/', async (_req, res) => {
  try {
    const data = await Team.find()
      .populate('captain', 'username fullName')
      .populate('members', 'username fullName')
      .sort({ totalPoints: -1 })
      .lean();
    res.json({ message: 'Teams retrieved successfully', count: data.length, data });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve teams', error: String(error) });
  }
});

export default teamsRouter;
