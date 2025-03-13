import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trash2, Plus, Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";

const Cart = () => {
  const { getCart, deleteCart, updateCart } = useContext(ShopContext);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const cartData = await getCart();
      setCartItems(cartData);
    } catch (error) {
      toast.error("Failed to fetch cart. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalCost = () => {
    return cartItems.reduce(
      (total, item) => total + item.quantity * item.packagingSizeValue * item.pricePerKg,
      0
    );
  };

  const handleDeleteProduct = async (product) => {
    try {
      await deleteCart(product);
      const updatedItems = cartItems.filter(
        (item) =>
          !(
            item.productName === product.productName &&
            item.selectedGrade === product.selectedGrade &&
            item.selectedPackagingType === product.selectedPackagingType &&
            item.selectedPackagingSize === product.selectedPackagingSize
          )
      );
      setCartItems(updatedItems);
    } catch (error) {
      toast.error("Failed to delete product. Please try again later.");
    }
  };

  const handleUpdateQuantity = async (product, change) => {
    const updatedQuantity = Math.max(0, product.quantity + change);

    if (updatedQuantity === 0) {
      return handleDeleteProduct(product);
    }

    try {
      await updateCart(product, change);
      const updatedItems = cartItems.map((item) =>
        item.productName === product.productName &&
          item.selectedGrade === product.selectedGrade &&
          item.selectedPackagingType === product.selectedPackagingType &&
          item.selectedPackagingSize === product.selectedPackagingSize
          ? { ...item, quantity: updatedQuantity }
          : item
      );
      setCartItems(updatedItems);
    } catch (error) {
      toast.error("Failed to update quantity. Please try again later.");
    }
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty. Please add items to proceed.");
      return;
    }

    setCheckoutLoading(true);

    setTimeout(() => {
      navigate("/checkout");
      setCheckoutLoading(false);
    }, 1000);
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-xl text-gray-600">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Loading cart...
        </motion.div>
      </div>
    );
  }

  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 bg-baby_powder min-h-screen">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-8">
        <motion.h1
          className="text-3xl font-bold mb-8 text-gray-800 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Your Shopping Cart
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <motion.div
                  key={
                    item.productName +
                    item.selectedGrade +
                    item.selectedPackagingType +
                    item.selectedPackagingSize
                  }
                  className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm flex items-center justify-between"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-gray-800">{item.productName}</h3>
                    <p className="text-gray-600">Grade: {item.selectedGrade}</p>
                    <p className="text-gray-600">Packaging Type: {item.selectedPackagingType}</p>
                    <p className="text-gray-600">Packaging Size: {item.selectedPackagingSize}</p>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                    <p className="text-gray-600">Price per Kg: ₹{item.pricePerKg.toFixed(2)}</p>
                    <p className="text-gray-800 font-bold">
                      Total: ₹{(item.quantity * item.packagingSizeValue * item.pricePerKg).toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleUpdateQuantity(item, -1)}
                      aria-label="Decrease Quantity"
                      className="text-gray-500 hover:text-gray-800 transition-colors"
                    >
                      <Minus size={20} />
                    </button>
                    <span className="font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => handleUpdateQuantity(item, 1)}
                      aria-label="Increase Quantity"
                      className="text-gray-500 hover:text-gray-800 transition-colors"
                    >
                      <Plus size={20} />
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(item)}
                      aria-label="Remove Product"
                      className="text-red-500 ml-4 hover:text-red-700 transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.p
                className="text-center text-xl text-gray-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                Your cart is empty. Add items to get started!
              </motion.p>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white">
              <h2 className="text-2xl font-bold mb-4 text-center">Order Summary</h2>
              <p className="text-lg font-semibold text-center">
                Total Cost: ₹{calculateTotalCost().toFixed(2)}
              </p>
              <button
                onClick={handleCheckout}
                disabled={checkoutLoading}
                className={`mt-4 w-full py-2 px-4 rounded-lg text-gray-800 font-bold ${checkoutLoading ? "bg-gray-300" : "bg-white hover:bg-opacity-90"
                  } transition-colors`}
                aria-label="Proceed to Checkout"
              >
                {checkoutLoading ? (
                  <span className="flex items-center justify-center">
                    Processing... <span className="ml-2 animate-spin">⏳</span>
                  </span>
                ) : (
                  "Checkout"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;