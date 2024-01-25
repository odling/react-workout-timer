import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../components';
import WorkoutPage from '../pages';

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        id: 'workout',
        index: true,
        element: <WorkoutPage />,
      },
    ],
  },
]);
