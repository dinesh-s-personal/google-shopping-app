import './App.css';
import './Login.css';
import './Products.css';
import LoginAppNew from './screens/login/loginNew';
import { AppRoutes } from './router/routes';
import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom';
import { ProductsList } from './screens/products/gProductsPage';
import { CreateUserAccount } from './screens/login/createAccount';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProducts } from './store/store';

const protectedRouteLoader = () => {
  if (localStorage.getItem('loginStatus') !== 'Login successful'){
    return redirect(AppRoutes.login);
  }
  return null;
}

const publicRouteLoader = () => {
  if (localStorage.getItem('loginStatus') === 'Login successful'){
    return redirect(AppRoutes.products);
  }
  return null;
}

const router = createBrowserRouter(
  [
    {
      path: AppRoutes.login,
      loader: publicRouteLoader,
      element: <LoginAppNew /> 
    },
    {
      path: '/',
      loader: publicRouteLoader,
      element: <LoginAppNew /> 
    },
    {
      path: AppRoutes.products,
      loader: protectedRouteLoader,
      element: <ProductsList /> 
    },
    {
      path: AppRoutes.account,
      loader: publicRouteLoader,
      element: <CreateUserAccount /> 
    }
  ]
)

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
      <RouterProvider router = {router}>
        localStorage.removeItem('loginStatus');
      </RouterProvider>
  );
}

export default App;
