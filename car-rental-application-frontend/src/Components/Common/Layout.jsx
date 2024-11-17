// src/components/Layout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children, isAuthenticated = false, user = null }) => {
  return (
    <>
      <Header isAuthenticated = {isAuthenticated} user = {user} />
      <main>
        <Outlet/>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
