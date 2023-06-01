import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './components/App';

const AppRouter = () => {
  const router = createBrowserRouter(
    [
      {
        path: '/',
        element: <App />,
      },
    ],
    { basename: '/videohub' },
  );
  return <RouterProvider router={router} />;
};

export default AppRouter;
