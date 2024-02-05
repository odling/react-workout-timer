import { createBrowserRouter } from 'react-router-dom';
import { MainLayout, RequireAuth } from '../components';
import { WorkoutsPage, WorkoutDetailsPage, HomePage, ExercisesPage } from '../pages';
import path from './path';

export const appRouter = createBrowserRouter([
  {
    path: path.home,
    element: <MainLayout />,
    errorElement: <MainLayout />,
    children: [
      {
        index: true,
        id: 'home',
        element: <HomePage />,
      },
      {
        id: 'requireAuth',
        element: <RequireAuth />,
        children: [
          {
            path: path.workouts,
            element: null,
            children: [
              {
                index: true,
                id: 'workouts',
                element: <WorkoutsPage />,
              },
              {
                id: 'workoutDetails',
                path: `${path.workouts}/:workoutId`,
                element: <WorkoutDetailsPage />,
              },
            ],
          },
          {
            id: 'exercises',
            path: path.exercises,
            element: <ExercisesPage />,
          },
        ],
      },
    ],
  },
]);
