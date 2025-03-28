import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, } from 'recharts';
import { assets } from '../assets/assets';
import axios from 'axios';
import { backendUrl } from '../App';

const Home = ({ token }) => {
  const [stats, setStats] = useState({});
  const [trends, setTrends] = useState([]);
  const [paymentMethodDistribution, setPaymentMethodDistribution] = useState([]);
  const [topProductsByQuantity, setTopProductsByQuantity] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(
          backendUrl + '/api/order/stats',
          { headers: { token } }
        );
        if (response.data.success) {
          setStats(response.data.stats);
          setTrends(response.data.trends);
          setPaymentMethodDistribution(response.data.paymentMethodDistribution);
          setTopProductsByQuantity(response.data.topProductsByQuantity);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchStats();
  }, []);

  // Colors for pie charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div className="min-h-screen lg:mt-6 md:mt-0 flex flex-col p-4">
      {/* Welcome Message */}
      
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Welcome, Admin!</h1>
        <p className="text-lg md:text-xl text-gray-600 mt-2">Manage your platform efficiently.</p>
      </div>
      

      {/* Statistics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white shadow-lg rounded-lg p-4 text-center hover:shadow-2xl transition duration-300 transform hover:-translate-y-1">
          <h3 className="text-xl font-semibold text-gray-800">Total Orders</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">{stats.totalOrders || 0}</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-4 text-center hover:shadow-2xl transition duration-300 transform hover:-translate-y-1">
          <h3 className="text-xl font-semibold text-gray-800">Pending Orders</h3>
          <p className="text-3xl font-bold text-yellow-600 mt-2">{stats.pendingOrders || 0}</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-4 text-center hover:shadow-2xl transition duration-300 transform hover:-translate-y-1">
          <h3 className="text-xl font-semibold text-gray-800">Completed Orders</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">{stats.deliveredOrders || 0}</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-4 text-center hover:shadow-2xl transition duration-300 transform hover:-translate-y-1">
          <h3 className="text-xl font-semibold text-gray-800">Cancelled Orders</h3>
          <p className="text-3xl font-bold text-red-600 mt-2">{stats.cancelledOrders || 0}</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-4 text-center hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 col-span-1 sm:col-span-2 lg:col-span-1">
          <h3 className="text-xl font-semibold text-gray-800">Total Revenue</h3>
          <p className="text-3xl font-bold text-purple-600 mt-2">₹{stats.totalRevenue || 0}</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Monthly Order Trends Chart */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Monthly Order Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={trends}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis
                tickFormatter={(value) => {
                  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
                  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
                  return value.toString();
                }}
                angle={-45} // Rotate labels by -45 degrees
                textAnchor="end" // Align text to the end of the label
              />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="orders" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="revenue" stroke="#82ca9d" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Payment Method Distribution Chart */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Payment Method Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={paymentMethodDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count" // Use 'count' as the value for each slice
                nameKey="_id"   // Use '_id' (payment method name) for labels
                label={({ _id, percent }) =>
                  `${_id}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {paymentMethodDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Top Products by Quantity Sold Chart */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Top Products by Quantity Sold (in kgs)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topProductsByQuantity}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="totalQuantity" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Order Status Distribution Chart */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Order Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={[
                { name: 'Pending', quantity: stats.pendingOrders || 0, color: '#A9A9A9' }, // Grey
                { name: 'Processing', quantity: stats.processingOrders || 0, color: '#FFD700' }, // Yellow
                { name: 'Shipped', quantity: stats.shippedOrders || 0, color: '#0000FF' }, // Blue
                { name: 'Delivered', quantity: stats.deliveredOrders || 0, color: '#008000' }, // Green
                { name: 'Cancelled', quantity: stats.cancelledOrders || 0, color: '#FF0000' }, // Red
              ]}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="quantity" fill="#000">
                {[
                  { name: 'Pending', color: '#A9A9A9' },
                  { name: 'Processing', color: '#FFD700' },
                  { name: 'Shipped', color: '#0000FF' },
                  { name: 'Delivered', color: '#008000' },
                  { name: 'Cancelled', color: '#FF0000' },
                ].map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      
    </div>
  );
};

export default Home;