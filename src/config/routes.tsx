import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '../components';
import { WorkoutsPage, WorkoutDetailsPage, HomePage } from '../pages';

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <MainLayout />,
    children: [
      {
        index: true,
        id: 'home',
        element: <HomePage />,
      },
      {
        path: '/workouts',
        element: null,
        children: [
          {
            index: true,
            id: 'workouts',
            element: <WorkoutsPage />,
          },
          {
            id: 'workoutDetails',
            path: '/workouts/:workoutId',
            element: <WorkoutDetailsPage />,
          },
        ],
      },
    ],
  },
]);
