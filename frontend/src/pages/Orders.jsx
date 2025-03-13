import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Input, Button } from "@relume_io/relume-ui";
import { motion } from "framer-motion";
import { ShopContext } from "../context/ShopContext";

const OrdersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { backendUrl, token } = useContext(ShopContext);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.post(
          `${backendUrl}/api/order/userorders`,
          {},
          { headers: { Authorization: token } }
        );
        if (response.data.success) {
          const formattedOrders = response.data.orders.reverse().map((order) => ({
            id: order._id,
            amount: order.amount.toFixed(2),
            date: new Date(order.date).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            }).replace(/\//g, "-"),
            status: order.status,
            details: order,
          }));
          setOrders(formattedOrders);
        } else {
          toast.error("Failed to fetch orders:", response.data.message);
        }
      } catch (error) {
        toast.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [backendUrl, token]);

  const filteredOrders = orders.filter(
    (order) =>
      (statusFilter === "all" || order.status === statusFilter) &&
      (order.id.includes(searchTerm) || order.date.includes(searchTerm))
  );

  const closeModal = () => setSelectedOrder(null);

  return (
    <div className="mx-auto px-[5%] py-10 md:py-16 lg:py-20 bg-baby_powder min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold pt-6 text-gray-800 mb-6 text-center">Your Orders</h1>
      <div className="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Order History</h2>
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <Input
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-[180px] border border-gray-300 rounded-lg px-3 py-2 bg-white shadow-sm hover:bg-gray-50"
            >
              <option value="all">All Statuses</option>
              <option value="Order Placed">Order Placed</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>              
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          {loading ? (
            <p className="text-center text-gray-500">Loading orders...</p>
          ) : (
            <>
              <div className="hidden sm:block overflow-x-auto w-full">
                <Table className="w-full border-collapse border-2 bg-white rounded-lg shadow-sm min-w-[600px]">
                  <TableHeader>
                    <TableRow className="bg-gray-100">
                      <TableHead>Order ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Total Amount</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.length > 0 ? (
                      filteredOrders.map((order) => (
                        <motion.tr
                          key={order.id}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className="border-b hover:bg-gray-50"
                        >
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell>
                            <span
                              className={`px-3 py-1 text-sm rounded-full ${order.status === "Delivered"
                                ? "bg-green-200 text-green-900"
                                : order.status === "Processing"
                                  ? "bg-yellow-200 text-yellow-800"
                                  : order.status === "Shipped"
                                    ? "bg-blue-200 text-blue-800"
                                    : order.status === "Cancelled"
                                      ? "bg-red-200 text-red-800"
                                      : "bg-gray-200 text-gray-800"
                                }`}
                            >
                              {order.status}
                            </span>
                          </TableCell>
                          <TableCell>₹{order.amount}</TableCell>
                          <TableCell>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white transition-all"
                              onClick={() => setSelectedOrder(order.details)} // Open modal with order details
                            >
                              View Details
                            </Button>
                          </TableCell>
                        </motion.tr>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan="5" className="text-center py-4 text-gray-500">
                          No orders found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              <div className="sm:hidden flex flex-col gap-4">
                {filteredOrders.map((order) => (
                  <div key={order.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
                    <p className="text-lg font-semibold">Order ID: {order.id}</p>
                    <p className="text-gray-600">Date: {order.date}</p>
                    <p className="text-gray-600">Total Amount: ₹{order.amount}</p>
                    <span
                      className={`px-3 py-1 text-sm rounded-full ${order.status === "Delivered"
                        ? "bg-green-200 text-green-900"
                        : order.status === "Processing"
                          ? "bg-yellow-200 text-yellow-800"
                          : order.status === "Shipped"
                            ? "bg-blue-200 text-blue-800"
                            : order.status === "Cancelled"
                              ? "bg-red-200 text-red-800"
                              : "bg-gray-200 text-gray-800"
                        }`}
                    >
                      {order.status}
                    </span>
                    <div className="mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white transition-all w-full"
                        onClick={() => setSelectedOrder(order.details)}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative overflow-y-auto max-h-[90vh]">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={closeModal}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Details</h2>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Items</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-200 px-4 py-2 text-xs sm:text-sm">Product Name</th>
                      <th className="border border-gray-200 px-4 py-2 text-xs sm:text-sm">Grade</th>
                      <th className="border border-gray-200 px-4 py-2 text-xs sm:text-sm">Packaging</th>
                      <th className="border border-gray-200 px-4 py-2 text-xs sm:text-sm">Size</th>
                      <th className="border border-gray-200 px-4 py-2 text-xs sm:text-sm">Quantity</th>
                      <th className="border border-gray-200 px-4 py-2 text-xs sm:text-sm">Price/Kg</th>
                      <th className="border border-gray-200 px-4 py-2 text-xs sm:text-sm">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.items.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="border border-gray-200 px-4 py-2 text-xs sm:text-sm">{item.productName}</td>
                        <td className="border border-gray-200 px-4 py-2 text-xs sm:text-sm">{item.grade}</td>
                        <td className="border border-gray-200 px-4 py-2 text-xs sm:text-sm">{item.packaging}</td>
                        <td className="border border-gray-200 px-4 py-2 text-xs sm:text-sm">{item.size}</td>
                        <td className="border border-gray-200 px-4 py-2 text-xs sm:text-sm">{item.quantity}</td>
                        <td className="border border-gray-200 px-4 py-2 text-xs sm:text-sm">₹{item.pricePerKg.toFixed(2)}</td>
                        <td className="border border-gray-200 px-4 py-2 text-xs sm:text-sm">₹{item.total.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Billing Address</h3>
                <p className="text-xs sm:text-sm">{selectedOrder.address.firstName} {selectedOrder.address.lastName}</p>
                <p className="text-xs sm:text-sm">{selectedOrder.address.street}</p>
                <p className="text-xs sm:text-sm">{selectedOrder.address.city}, {selectedOrder.address.state}, {selectedOrder.address.zipCode}</p>
                <p className="text-xs sm:text-sm">{selectedOrder.address.country}</p>
                <p className="text-xs sm:text-sm">Phone: {selectedOrder.address.phoneNumber}</p>
                <p className="text-xs sm:text-sm">Email: {selectedOrder.address.email}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Order Summary</h3>
                <p className="text-xs sm:text-sm"><strong>Date:</strong> {new Date(selectedOrder.date).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                }).replace(/\//g, "-")}</p>
                <p className="text-xs sm:text-sm"><strong>Status:</strong> {selectedOrder.status}</p>
                <p className="text-xs sm:text-sm"><strong>Payment Method:</strong> {selectedOrder.paymentMethod}</p>
                <p className="text-xs sm:text-sm"><strong>Total Amount:</strong> ₹{selectedOrder.amount.toFixed(2)}</p>
                <p className="text-xs sm:text-sm"><strong>Payment Status:</strong> {selectedOrder.payment ? "Paid" : "Pending"}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;