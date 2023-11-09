import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './ui/Home';
import Error from './ui/Error';
import AppLayout from './ui/AppLayout';
import Cart from './features/cart/Cart';
import Menu, { loader as menuLoader } from './features/menu/Menu';
import Order, { loader as orderLoader } from './features/order/Order';
import { action as updateOrderAction } from './features/order/UpdateOrder';
import CreateOrder, { action as createOrderAction, } from './features/order/CreateOrder';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,

    children: [
      {
        path: '/pizza-delivery',
        element: <Home />,
      },
      {
        path: '/pizza-delivery/menu',
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      { path: '/pizza-delivery/cart', element: <Cart /> },
      {
        path: '/pizza-delivery/order/new',
        element: <CreateOrder />,
        action: createOrderAction,
      },
      {
        path: '/pizza-delivery/order/:orderId',
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />,
        action: updateOrderAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
