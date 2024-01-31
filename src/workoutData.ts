import { IWarmup, IWorkout } from './types';

export const defaultWarmup: IWarmup = {
  description: 'Warmup',
  rounds: 1,
  restBetweenRounds: 0,
  exercises: [
    {
      description: 'Jumping Jacks',
      quantity: 45,
      type: 'exercise',
    },
    {
      description: 'Front Kick Squats',
      quantity: 30,
      type: 'exercise',
    },
    {
      description: 'Lunges Rotation',
      quantity: 30,
      type: 'exercise',
    },
    {
      description: 'Mountain Climber Twist',
      quantity: 30,
      type: 'exercise',
    },
    {
      description: 'Walking Kicks',
      quantity: 30,
      type: 'exercise',
    },
    {
      description: 'Arm Circles Forward',
      quantity: 15,
      type: 'exercise',
    },
    {
      description: 'Arm Circles Backwards',
      quantity: 15,
      type: 'exercise',
    },
    {
      description: 'Wrist Rotation',
      quantity: 10,
      type: 'exercise',
    },
  ],
};

export const workouts: IWorkout[] = [
  {
    id: '0',
    rounds: 3,
    restBetweenRounds: 60,
    description: 'Evaluation Test',
    useDefaultWarmup: true,
    exercises: [
      {
        type: 'exercise',
        description: 'Pushups',
        quantity: 60,
      },
      {
        type: 'rest',
        description: 'Rest',
        quantity: 60,
      },
      {
        type: 'exercise',
        description: 'Pullups',
        quantity: 30,
      },
      {
        type: 'rest',
        description: 'Rest',
        quantity: 60,
      },
      {
        type: 'exercise',
        description: 'Squats',
        quantity: 60,
      },
      {
        type: 'rest',
        description: 'Rest',
        quantity: 60,
      },
      {
        type: 'exercise',
        description: 'Situps',
        quantity: 60,
      },
      {
        type: 'rest',
        description: 'Rest',
        quantity: 60,
      },
      {
        type: 'exercise',
        description: 'Dips',
        quantity: 30,
      },
    ],
  },
  {
    id: '2',
    rounds: 4,
    restBetweenRounds: 45,
    description: 'Week 1 - Lower Body',
    useDefaultWarmup: true,
    exercises: [
      {
        type: 'exercise',
        description: 'High Knees',
        quantity: 30,
      },
      {
        type: 'rest',
        description: 'Rest',
        quantity: 30,
      },
      {
        type: 'exercise',
        description: 'Squats',
        quantity: 30,
      },
      {
        type: 'rest',
        description: 'Rest',
        quantity: 30,
      },
      {
        type: 'exercise',
        description: 'Jumping Lunges',
        quantity: 30,
      },
      {
        type: 'rest',
        description: 'Rest',
        quantity: 30,
      },
      {
        type: 'exercise',
        description: 'Wall Sit',
        quantity: 30,
      },
      {
        type: 'rest',
        description: 'Rest',
        quantity: 50,
      },
      {
        type: 'exercise',
        description: 'Calf Raises',
        quantity: 20,
      },
      {
        type: 'rest',
        description: 'Rest',
        quantity: 35,
      },
      {
        type: 'exercise',
        description: 'Side Hops',
        quantity: 20,
      },
    ],
  },
  {
    id: '3',
    rounds: 4,
    restBetweenRounds: 35,
    description: 'Week 1 - Upper Body',
    useDefaultWarmup: true,
    exercises: [
      {
        type: 'exercise',
        description: 'Chinups',
        quantity: 10,
        isRepBased: true,
      },
      {
        type: 'rest',
        description: 'Rest',
        quantity: 30,
      },
      {
        type: 'exercise',
        description: 'Regular Pushups',
        quantity: 15,
        isRepBased: true,
      },
      {
        type: 'rest',
        description: 'Rest',
        quantity: 30,
      },
      {
        type: 'exercise',
        description: '90 Degree Pullup Holds',
        quantity: 15,
      },
      {
        type: 'rest',
        description: 'Rest',
        quantity: 35,
      },
      {
        type: 'exercise',
        description: 'Reverse Chair Dips',
        quantity: 15,
        isRepBased: true,
      },
      {
        type: 'rest',
        description: 'Rest',
        quantity: 45,
      },
      {
        type: 'exercise',
        description: 'Shoulder Press Ups',
        quantity: 10,
        isRepBased: true,
      },
    ],
  },
];
