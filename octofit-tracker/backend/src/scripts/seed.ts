import { connect, disconnect } from 'mongoose';
import User from '../models/User.js';
import Team from '../models/Team.js';
import Activity from '../models/Activity.js';
import Leaderboard from '../models/Leaderboard.js';
import Workout from '../models/Workout.js';

const MONGODB_URI = 'mongodb://localhost:27017/octofit_db';

async function seedDatabase() {
  console.log('Seed the octofit_db database with test data');

  await connect(MONGODB_URI);

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Leaderboard.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const [ava, noah, mia, lucas, zoe, ethan] = await User.insertMany([
    {
      username: 'ava_runner',
      fullName: 'Ava Thompson',
      email: 'ava.thompson@example.com',
      age: 28,
      heightCm: 167,
      weightKg: 61,
      fitnessLevel: 'intermediate',
      goals: ['Run a half marathon', 'Improve endurance'],
    },
    {
      username: 'noah_lifts',
      fullName: 'Noah Patel',
      email: 'noah.patel@example.com',
      age: 31,
      heightCm: 181,
      weightKg: 84,
      fitnessLevel: 'advanced',
      goals: ['Increase strength', 'Maintain body fat'],
    },
    {
      username: 'mia_moves',
      fullName: 'Mia Rodriguez',
      email: 'mia.rodriguez@example.com',
      age: 25,
      heightCm: 162,
      weightKg: 57,
      fitnessLevel: 'beginner',
      goals: ['Build consistency', 'Improve mobility'],
    },
    {
      username: 'lucas_cycle',
      fullName: 'Lucas Kim',
      email: 'lucas.kim@example.com',
      age: 34,
      heightCm: 176,
      weightKg: 72,
      fitnessLevel: 'intermediate',
      goals: ['Boost VO2 max', 'Ride 100 km'],
    },
    {
      username: 'zoe_yogi',
      fullName: 'Zoe Walker',
      email: 'zoe.walker@example.com',
      age: 29,
      heightCm: 170,
      weightKg: 64,
      fitnessLevel: 'intermediate',
      goals: ['Reduce stress', 'Improve flexibility'],
    },
    {
      username: 'ethan_hiit',
      fullName: 'Ethan Nguyen',
      email: 'ethan.nguyen@example.com',
      age: 27,
      heightCm: 178,
      weightKg: 76,
      fitnessLevel: 'advanced',
      goals: ['Increase speed', 'Improve recovery'],
    },
  ]);

  const [teamPulse, teamPeak] = await Team.insertMany([
    {
      name: 'Team Pulse',
      description: 'Cardio-focused athletes preparing for endurance events.',
      region: 'Seattle',
      captain: ava._id,
      members: [ava._id, mia._id, zoe._id],
      totalPoints: 1580,
    },
    {
      name: 'Team Peak',
      description: 'Strength and HIIT squad pushing high weekly intensity.',
      region: 'Austin',
      captain: noah._id,
      members: [noah._id, lucas._id, ethan._id],
      totalPoints: 1710,
    },
  ]);

  await Promise.all([
    User.updateMany({ _id: { $in: [ava._id, mia._id, zoe._id] } }, { team: teamPulse._id }),
    User.updateMany({ _id: { $in: [noah._id, lucas._id, ethan._id] } }, { team: teamPeak._id }),
  ]);

  const now = new Date();
  await Activity.insertMany([
    {
      user: ava._id,
      team: teamPulse._id,
      type: 'run',
      durationMinutes: 52,
      distanceKm: 10.4,
      caloriesBurned: 610,
      performedAt: new Date(now.getTime() - 1000 * 60 * 60 * 26),
      notes: 'Tempo run with negative split finish.',
    },
    {
      user: mia._id,
      team: teamPulse._id,
      type: 'yoga',
      durationMinutes: 35,
      distanceKm: 0,
      caloriesBurned: 180,
      performedAt: new Date(now.getTime() - 1000 * 60 * 60 * 18),
      notes: 'Mobility-focused flow for hips and shoulders.',
    },
    {
      user: zoe._id,
      team: teamPulse._id,
      type: 'swim',
      durationMinutes: 45,
      distanceKm: 1.5,
      caloriesBurned: 430,
      performedAt: new Date(now.getTime() - 1000 * 60 * 60 * 10),
      notes: 'Drill set plus steady endurance laps.',
    },
    {
      user: noah._id,
      team: teamPeak._id,
      type: 'strength',
      durationMinutes: 60,
      distanceKm: 0,
      caloriesBurned: 520,
      performedAt: new Date(now.getTime() - 1000 * 60 * 60 * 20),
      notes: 'Lower-body day with progressive overload.',
    },
    {
      user: lucas._id,
      team: teamPeak._id,
      type: 'cycle',
      durationMinutes: 75,
      distanceKm: 31.2,
      caloriesBurned: 790,
      performedAt: new Date(now.getTime() - 1000 * 60 * 60 * 14),
      notes: 'Intervals on rolling terrain.',
    },
    {
      user: ethan._id,
      team: teamPeak._id,
      type: 'hiit',
      durationMinutes: 28,
      distanceKm: 0,
      caloriesBurned: 360,
      performedAt: new Date(now.getTime() - 1000 * 60 * 60 * 8),
      notes: '8 rounds of sprint and bodyweight circuits.',
    },
  ]);

  await Leaderboard.insertMany([
    {
      user: noah._id,
      team: teamPeak._id,
      points: 620,
      rank: 1,
      streakDays: 14,
      weeklyMinutes: 290,
      badges: ['Strength Streak', 'Consistency Pro'],
      lastUpdated: now,
    },
    {
      user: ava._id,
      team: teamPulse._id,
      points: 590,
      rank: 2,
      streakDays: 12,
      weeklyMinutes: 265,
      badges: ['Endurance Builder'],
      lastUpdated: now,
    },
    {
      user: lucas._id,
      team: teamPeak._id,
      points: 545,
      rank: 3,
      streakDays: 9,
      weeklyMinutes: 250,
      badges: ['Cycling Power'],
      lastUpdated: now,
    },
    {
      user: ethan._id,
      team: teamPeak._id,
      points: 510,
      rank: 4,
      streakDays: 8,
      weeklyMinutes: 220,
      badges: ['HIIT Hero'],
      lastUpdated: now,
    },
    {
      user: zoe._id,
      team: teamPulse._id,
      points: 470,
      rank: 5,
      streakDays: 10,
      weeklyMinutes: 210,
      badges: ['Mindful Athlete'],
      lastUpdated: now,
    },
    {
      user: mia._id,
      team: teamPulse._id,
      points: 430,
      rank: 6,
      streakDays: 6,
      weeklyMinutes: 185,
      badges: ['Fresh Start'],
      lastUpdated: now,
    },
  ]);

  await Workout.insertMany([
    {
      title: 'Sunrise 5K Builder',
      description: 'Progressive run session with warm-up, tempo effort, and cooldown.',
      category: 'cardio',
      difficulty: 'beginner',
      durationMinutes: 35,
      targetMuscles: ['legs', 'core'],
      recommendedFor: ['new runners', 'fat loss'],
      caloriesEstimate: 320,
    },
    {
      title: 'Barbell Fundamentals',
      description: 'Foundational strength workout focused on squat, press, and hinge patterns.',
      category: 'strength',
      difficulty: 'intermediate',
      durationMinutes: 55,
      targetMuscles: ['quads', 'glutes', 'back', 'shoulders'],
      recommendedFor: ['strength gain', 'muscle building'],
      caloriesEstimate: 460,
    },
    {
      title: 'Desk Reset Mobility',
      description: 'Low-impact mobility flow for thoracic spine, hips, and hamstrings.',
      category: 'mobility',
      difficulty: 'beginner',
      durationMinutes: 20,
      targetMuscles: ['hips', 'hamstrings', 'upper back'],
      recommendedFor: ['recovery days', 'office workers'],
      caloriesEstimate: 120,
    },
    {
      title: 'Power Interval Blast',
      description: 'Alternating high-intensity intervals and active recovery blocks.',
      category: 'hiit',
      difficulty: 'advanced',
      durationMinutes: 30,
      targetMuscles: ['full body', 'core'],
      recommendedFor: ['athletic conditioning', 'speed'],
      caloriesEstimate: 410,
    },
    {
      title: 'Evening Recovery Session',
      description: 'Breathing, stretching, and low-load movement to support recovery.',
      category: 'recovery',
      difficulty: 'beginner',
      durationMinutes: 25,
      targetMuscles: ['full body'],
      recommendedFor: ['active recovery', 'stress management'],
      caloriesEstimate: 90,
    },
  ]);

  const counts = await Promise.all([
    User.countDocuments(),
    Team.countDocuments(),
    Activity.countDocuments(),
    Leaderboard.countDocuments(),
    Workout.countDocuments(),
  ]);

  console.log('Seed complete:', {
    users: counts[0],
    teams: counts[1],
    activities: counts[2],
    leaderboard: counts[3],
    workouts: counts[4],
  });
}

seedDatabase()
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await disconnect();
  });
