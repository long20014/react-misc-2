import SalaryAndTax from 'components/SalaryAndTax/SalaryAndTax';
import ChatPage from 'pages/ChatPage/ChatPage';
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
  {
    path: '/chat',
    element: <ChatPage />,
  },
]);

const MainRouter = () => {
  return <RouterProvider router={router} />;
};

export default MainRouter;
