import React from 'react'
import { assets } from '../assets/assets'
import { toast } from 'react-toastify'
import { RiLogoutBoxRLine } from "react-icons/ri";
import { Link } from 'react-router-dom';

const Navbar = ({ setToken }) => {
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setToken('');
    toast.success("Admin Logged Out Successfully")
  }
  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
      <Link to="/">
  <img
    className="w-[max(10%,150px)] cursor-pointer transition duration-300 transform hover:scale-110"
    src={assets.logo}
    alt="Logo"
  />
</Link>
      <button
        onClick={onSubmitHandler}
        className='bg-true_blue font-medium rounded-md text-white px-5 py-2 sm:px-7 sm:py-2 hover:bg-russian_violet text-base sm:text-base flex items-center justify-center gap-2'>
        <RiLogoutBoxRLine className="text-xl sm:text-lg" />
        <span>Logout</span>
      </button>
    </div>
  )
}

export default Navbar