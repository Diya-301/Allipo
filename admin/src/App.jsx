import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Side'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Add from './pages/Add'
import Edit from './pages/Edit'
import Orders from './pages/Orders'
import Login from './components/Login'
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const backendUrl = import.meta.env.VITE_BACKEND_URL

const App = () => {

  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    localStorage.setItem('token', token)
  }, [token])


  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className='bg-baby_powder min-h-screen'>
      <ToastContainer position={isMobile ? "bottom-center" : "bottom-left"}
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
      {token === ""
        ? <Login setToken={setToken} />
        : <>
          <Navbar setToken={setToken} />
          <hr />
          <div className='flex w-full'>
            <Sidebar />
            <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
              <Routes>
                <Route path='/' element={<Home token={token} />} />
                {/* <Route path='/add' element={<Add token={token} />} /> */}
                <Route path='/edit' element={<Edit token={token} />} />
                <Route path='/orders' element={<Orders token={token} />} />
              </Routes>
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default App