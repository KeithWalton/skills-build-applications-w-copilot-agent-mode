import { Router } from 'express';
import Activity from '../models/Activity.js';

const activitiesRouter = Router();

activitiesRouter.get('/', async (_req, res) => {
  try {
    const data = await Activity.find()
      .populate('user', 'username fullName')
      .populate('team', 'name')
      .sort({ performedAt: -1 })
      .lean();
    res.json({ message: 'Activities retrieved successfully', count: data.length, data });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve activities', error: String(error) });
  }
});

export default activitiesRouter;
