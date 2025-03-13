import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('All');

  const fetchAllOrders = async () => {
    if (!token) return null;

    try {
      const response = await axios.post(
        backendUrl + '/api/order/list',
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/order/status',
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success("Order Status Updated Sucessfully")
        await fetchAllOrders();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred');
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  const filteredOrders =
    filter === 'All'
      ? orders
      : orders.filter((order) => order.status === filter);

  const getProgressBarStyle = (status) => {
    switch (status) {
      case 'Order Placed':
        return { width: '25%', backgroundColor: 'gray' };
      case 'Processing':
        return { width: '50%', backgroundColor: 'yellow' };
      case 'Shipped':
        return { width: '75%', backgroundColor: 'blue' };
      case 'Delivered':
        return { width: '100%', backgroundColor: 'green' };
      case 'Cancelled':
        return { width: '100%', backgroundColor: 'red' };
      default:
        return { width: '0%', backgroundColor: 'transparent' };
    }
  };

  return (
    <div className="p-4 md:p-8 bg-white shadow-md min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-0">
          Manage Orders
        </h3>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border border-gray-300 shadow-lg rounded text-sm md:text-base text-gray-700 w-full md:w-auto"
        >
          <option value="All">All</option>
          <option value="Order Placed">Order Placed</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {filteredOrders.map((order, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg p-4 md:p-6 transition duration-300 hover:shadow-2xl overflow-hidden"
          >
            <div className="mb-4 flex items-center">
              <img
                src={assets.parcel_icon}
                alt="Order"
                className="w-10 h-10 md:w-12 md:h-12 mr-4 rounded-lg"
              />
              <div className="">
                <p className="text-sm md:text-base text-gray-700 font-medium">
                  Amount: ₹{order.amount}
                </p>
                <p className="text-sm md:text-base text-gray-700">
                  Payment: {order.payment ? 'Done' : 'Pending'}
                </p>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-base md:text-lg font-medium text-gray-800 mb-2">
                Order Details
              </h4>
              <div>
                {order.items.map((item, idx) => (
                  <p key={idx} className="text-sm md:text-base text-gray-700">
                    {item.productName} - {item.grade}{' '}
                    <span>{item.size}</span> in {item.packaging} x{' '}
                    {item.quantity}
                  </p>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-base md:text-lg font-medium text-gray-800 mb-2">
                Customer Information
              </h4>
              <p className="text-sm md:text-base text-gray-700">
                {order.address.firstName + ' ' + order.address.lastName}
              </p>
              <p className="text-sm md:text-base text-gray-700">
                {order.address.street}, {order.address.city},{' '}
                {order.address.state}, {order.address.country},{' '}
                {order.address.zipCode}
              </p>
              <p className="text-sm md:text-base text-gray-700">
                {order.address.phoneNumber}
              </p>
            </div>

            <div className="mb-4">
              <p className="text-sm md:text-base text-gray-700 font-medium">
                Status:
              </p>
              <select
                onChange={(event) => statusHandler(event, order._id)}
                value={order.status}
                className="p-2 border border-gray-300 rounded text-sm md:text-base text-gray-700 w-full"
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2 md:h-2.5">
              <div
                className="h-full rounded-full"
                style={getProgressBarStyle(order.status)}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;