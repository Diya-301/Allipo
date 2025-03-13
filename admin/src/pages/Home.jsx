import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';

const Home = () => {
  return (
    <div className="min-h-screen lg:mt-10 md:mt-0 flex flex-col  p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
          Welcome, Admin!
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mt-2">
          Manage your platform efficiently.
        </p>    
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Link
          to="/edit"
          className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 cursor-pointer text-center"
        >
          <div className="flex flex-col items-center justify-center">
            <img
              src={assets.edit}
              alt="Edit Icon"
              className="w-16 h-16 mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800">Edit</h3>
            <p className="text-gray-600 mt-2">
              Modify products, and prices.
            </p>
          </div>
        </Link>

        <Link
          to="/orders"
          className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 cursor-pointer text-center"
        >
          <div className="flex flex-col items-center justify-center">
            <img
              src={assets.order}
              alt="Orders Icon"
              className="w-16 h-16 mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800">Orders</h3>
            <p className="text-gray-600 mt-2">
              View and manage all orders placed by customers.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;