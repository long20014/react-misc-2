import SalaryAndTax from 'components/SalaryAndTax/SalaryAndTax';
import HomePage from 'pages/HomePage/HomePage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/salary',
    element: <SalaryAndTax />,
  },
]);

const MainRouter = () => {
  return <RouterProvider router={router} />;
};

export default MainRouter;
