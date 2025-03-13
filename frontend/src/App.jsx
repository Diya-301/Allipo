import React,{useState, useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';

import Contact from './pages/static/Contact';
import Privacy from './pages/static/Privacy';
import Refund from './pages/static/Refund';
import Terms from "./pages/static/Terms";
import Cookies from './pages/static/Cookies';

import Navbar from './components/Layout/Nav';
import Footer from './components/Layout/Footer';
import Login from './pages/Login';
import Products from './pages/Products';
import 'react-toastify/dist/ReactToastify.css';
import { Slide, ToastContainer } from 'react-toastify';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ProductDetails from "./pages/ProductDetails";
import Checkout from './pages/Checkout';
import ScrollToTop from './components/Scroll';

const App = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <div className='bg-baby_powder'>
      <Navbar />
      <ToastContainer position= {isMobile ? "bottom-center" : "bottom-left"}
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Slide} />
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/products' element={<Products />} />
        <Route path="/products/:productName" element={<ProductDetails />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/privacy' element={<Privacy />} />
        <Route path='/refund' element={<Refund />} />
        <Route path='/terms&conditions' element={<Terms />} />
        <Route path='/cookies' element={<Cookies />} />
        <Route path='/login' element={<Login />} />
        <Route path='/cart' element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path='/orders' element={<ProtectedRoute><Orders /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App