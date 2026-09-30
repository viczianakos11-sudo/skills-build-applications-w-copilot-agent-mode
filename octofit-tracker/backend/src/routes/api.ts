import { NextFunction, Request, Response, Router } from 'express';
import Activity from '../models/Activity.js';
import Leaderboard from '../models/Leaderboard.js';
import Team from '../models/Team.js';
import User from '../models/User.js';
import Workout from '../models/Workout.js';

const router = Router();

router.get('/users', async (_request, response) => {
  response.json(await User.find().sort({ username: 1 }));
});

router.post('/users', async (request, response) => {
  response.status(201).json(await User.create(request.body));
});

router.get('/teams', async (_request, response) => {
  response.json(await Team.find().populate('members', 'username displayName').sort({ name: 1 }));
});

router.post('/teams', async (request, response) => {
  response.status(201).json(await Team.create(request.body));
});

router.get('/activities', async (_request, response) => {
  response.json(await Activity.find().populate('userId', 'username displayName').sort({ occurredAt: -1 }));
});

router.post('/activities', async (request, response) => {
  response.status(201).json(await Activity.create(request.body));
});

router.get('/leaderboard', async (_request, response) => {
  response.json(
    await Leaderboard.find().populate('userId', 'username displayName').sort({ points: -1, updatedAt: 1 }),
  );
});

router.get('/workouts', async (_request, response) => {
  response.json(await Workout.find().sort({ level: 1, title: 1 }));
});

router.post('/workouts', async (request, response) => {
  response.status(201).json(await Workout.create(request.body));
});

router.use((error: Error, _request: Request, response: Response, _next: NextFunction) => {
  const status = error.name === 'ValidationError' ? 400 : 500;
  response.status(status).json({ error: error.message || 'Unexpected server error' });
});

export default router;