import React, { useEffect } from 'react';
import {Routes, Route } from "react-router-dom";
import {useSelector} from 'react-redux';
import './App.css';
import LoginPage from './auth/LoginPage';
import ProductsPage from './products/ProductsPage';
import PaymentPage from './products/PaymentPage';
import ProtectedRouter from './ProtectedRouter';
import HeaderComponent from './HeaderComponent';
import {selectAuth} from './auth/AuthSlice';

function App() {
  const {isLoggedIn} = useSelector(selectAuth);
  useEffect(() => {
    console.log(isLoggedIn)
  }, [isLoggedIn]);
  return (
    <main style={{minHeight:"100vh", display:"grid", gridTemplateRows:"auto 1fr"}}>
        {isLoggedIn && <HeaderComponent />}
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<ProtectedRouter><ProductsPage/></ProtectedRouter>} />
            <Route path="/cart" element={<ProtectedRouter><PaymentPage/></ProtectedRouter>} />
            <Route path="*" element={<p>There's nothing here: 404!</p>} />
          </Routes>   
    </main>

  );
}

export default App;
