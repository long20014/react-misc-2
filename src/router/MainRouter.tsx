import HomePage from 'pages/HomePage/HomePage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
]);

const MainRouter = () => {
  return <RouterProvider router={router} />;
};

export default MainRouter;
