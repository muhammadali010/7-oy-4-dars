import React, { createContext, useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import Cart from './Pages/Cart';
import Checkout from './Pages/Checkout';
import Details from './Pages/Details';
import ErrorPage from './Pages/ErrorPage';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Orders from './Pages/Orders';
import Produts from './Pages/Products';
import MainLayout from './layouts/MainLayout';

export const CartContext = createContext();
export const ThemeContext = createContext()
function App() {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [cart , setCart] = useState([])
  const [theme, setTheme] = useState('light')

  let location = useLocation();


  useEffect(() => {
    if (localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'));
    } else if (!( location.pathname == '/' ||location.pathname.includes('register') || location.pathname.includes('about') || location.pathname.includes('products') || location.pathname.includes('cart'))) {
      navigate('/login');
    }
  }, [navigate, location.pathname]);

  const PrivateRoute = ({ isAuth, children }) => {
    if (!isAuth) {
      navigate('/login');
    }
    return children;
  };

  return (
  <ThemeContext.Provider value={{theme, setTheme}}>
  <CartContext.Provider value={{cart, setCart}}>
    <Routes>
      <Route path='/' element={<MainLayout><Home /></MainLayout>} />
      <Route path='about' element={<MainLayout><About /></MainLayout>} />
      <Route path='/cart' element={<MainLayout><Cart /></MainLayout>} />
      <Route path='/products/:id' element={<MainLayout><Details /></MainLayout>} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/products' element={<MainLayout><Produts></Produts></MainLayout>} />
      
      <Route path='/checkout'
        element={
          <PrivateRoute isAuth={!!token}>
            <MainLayout>
              <Checkout />
            </MainLayout>
          </PrivateRoute>
        }
      />
      <Route path='/orders'
        element={
          <PrivateRoute isAuth={!!token}>
            <MainLayout>
              <Orders />
            </MainLayout>
          </PrivateRoute>
        }
      />

      <Route path='*' element={<ErrorPage />} />
    </Routes>
  </CartContext.Provider>
  </ThemeContext.Provider>
  );
}

export default App;
