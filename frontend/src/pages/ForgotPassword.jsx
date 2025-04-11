import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from '../assets/assets';

const ForgotPassword = () => {
  const { backendUrl } = useContext(ShopContext);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`${backendUrl}/api/user/forgot-password`, { email });
      if (response.data.success) {
        toast.success("Reset link sent to your email!");
        setEmail("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
    setIsLoading(false);
  };

  return (
    <>
      <style>
        {`
          /* Pulse Animation */
          @keyframes pulse {
            0% {
              transform: scale(1);
              opacity: 0.8;
            }
            50% {
              transform: scale(1.05);
              opacity: 0.6;
            }
            100% {
              transform: scale(1);
              opacity: 0.8;
            }
          }

          .animate-pulse {
            animation: pulse 3s infinite;
          }

          /* Spinner Animation */
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }

          .animate-spin {
            animation: spin 1s linear infinite;
          }
        `}
      </style>

      <div className="min-h-screen flex justify-center items-center bg-baby_powder px-4">
        <div className="w-full max-w-md p-4 sm:p-6 md:p-8 bg-white shadow-2xl rounded-2xl relative overflow-hidden transition-transform duration-300 hover:scale-105">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-200 to-blue-200 opacity-20 blur-lg animate-pulse"></div>
          <div className="relative z-10">
            <div className="flex justify-center mb-4 sm:mb-6">
              <img
                src={assets.SVGFP}
                alt="Forgot Password Illustration"
                className="w-32 h-auto sm:w-48 md:w-64 lg:w-80 max-w-full"
              />
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-gray-800 mb-2 sm:mb-4">
              Forgot Password?
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-center text-gray-600 mb-4 sm:mb-6 md:mb-8">
              Enter your email, and we'll send you a reset link.
            </p>
            {/* Form */}
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                className="w-full p-2 sm:p-3 md:p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 mb-3 sm:mb-4 md:mb-6 text-sm sm:text-base"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 sm:py-3 md:py-4 rounded-lg font-semibold hover:opacity-90 transition-all duration-300 relative overflow-hidden text-sm sm:text-base"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </div>
                ) : (
                  "Send Reset Link"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;