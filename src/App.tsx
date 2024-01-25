import { RouterProvider } from 'react-router-dom';
import { appRouter } from './config/routes';

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
