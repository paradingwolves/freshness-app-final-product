import React, { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Header from './Header/Header';
import Footer from './Footer/Footer';


const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if the current path is '/'
    if (location.pathname === '/') {
      // Redirect to '/home' when the user manually refreshes the page
      window.location.href = '/protected/home';
    }

  }, [location]);
  return (
    <div>
      <Header />
        <Outlet />
      <Footer />
    </div>
  )
}

export default Layout
