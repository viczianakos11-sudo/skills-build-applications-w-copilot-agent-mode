import mongoose from 'mongoose';
import Activity from '../models/Activity.js';
import Leaderboard from '../models/Leaderboard.js';
import Team from '../models/Team.js';
import User from '../models/User.js';
import Workout from '../models/Workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  await mongoose.connect(connectionString);

  const user = await User.findOneAndUpdate(
    { username: 'alex-runner' },
    { username: 'alex-runner', email: 'alex@example.com', displayName: 'Alex Runner' },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  );

  await Team.findOneAndUpdate(
    { name: 'Trail Blazers' },
    { name: 'Trail Blazers', description: 'A team for getting outside and moving.', members: [user._id] },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  );
  await Activity.findOneAndUpdate(
    { userId: user._id, type: 'running', durationMinutes: 30 },
    { userId: user._id, type: 'running', durationMinutes: 30, distanceKm: 4.2, points: 42 },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  );
  await Leaderboard.findOneAndUpdate(
    { userId: user._id, period: 'all-time' },
    { userId: user._id, period: 'all-time', points: 42 },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  );
  await Workout.findOneAndUpdate(
    { title: 'Easy Interval Run' },
    {
      title: 'Easy Interval Run',
      activityType: 'running',
      level: 'beginner',
      durationMinutes: 25,
      description: 'Alternate a comfortable jog with short walking breaks.',
    },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  );

  console.log('Database seeding complete');
}

seedDatabase()
  .catch((error: unknown) => {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
