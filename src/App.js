import './App.css';
import {Routes, Route } from "react-router-dom";
import LoginPage from './LoginPage';
import ProductsPage from './ProductsPage';
import PaymentPage from './PaymentPage';
import ProtectedRouter from './ProtectedRouter';
import {useSelector} from 'react-redux';
import HeaderComponent from './HeaderComponent';
import { useEffect } from 'react';
import {selectAuth} from './auth/AuthSlice';
function App() {
  const {isLoggedIn} = useSelector(selectAuth);
  useEffect(() => {
    console.log(isLoggedIn)
  }, [isLoggedIn]);
  return (
    <main style={{minHeight:"100vh", display:"grid", gridTemplateRows:"auto 1fr"}}>
      {isLoggedIn && <HeaderComponent />}
      <section>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<ProtectedRouter><ProductsPage/></ProtectedRouter>} />
          <Route path="/cart" element={<PaymentPage />} />
          <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Routes>
      </section>
    </main>

  );
}

export default App;
