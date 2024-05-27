import { configureStore } from '@reduxjs/toolkit';
import './App.css';
import './Login.css';
import LoginAppNew from './screens/login/loginNew';
import { AppRoutes } from './router/routes';
import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom';
import { ProductsList } from './screens/products/productDetails';
import { CreateUserAccount } from './screens/login/createAccount';
import { Provider } from 'react-redux';
import { gproductsAPI } from './redux/service/users';

const store = configureStore({
  reducer: {
    [gproductsAPI.reducerPath]: gproductsAPI.reducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware()
      .concat(gproductsAPI.middleware),
})

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
  return (
    <Provider store={store}> 
      <RouterProvider router = {router}></RouterProvider>
    </Provider>
  );
}

export default App;
