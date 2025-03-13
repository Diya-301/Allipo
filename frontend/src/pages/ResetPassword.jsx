import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";

const ResetPassword = () => {
  const { backendUrl } = useContext(ShopContext);
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`${backendUrl}/api/user/reset-password`, {
        token,
        password,
      });

      if (response.data.success) {
        toast.success("Password reset successful!");
        setTimeout(() => {
          setIsLoading(false);
          navigate("/login");
        }, 2000);
      } else {
        toast.error(response.data.message);
        setIsLoading(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
      setIsLoading(false);
    }
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
      <div className="min-h-screen flex justify-center items-center bg-baby_powder">
        <div className="w-full max-w-md p-6 sm:p-8 bg-white shadow-2xl rounded-2xl relative overflow-hidden transition-transform duration-300 hover:scale-105">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-200 to-purple-200 opacity-20 blur-lg animate-pulse"></div>
          <div className="relative z-10">
            <div className="flex justify-center mb-4 sm:mb-6">
              <img
                src={assets.SVGRP}
                alt="Reset Password Illustration"
                className="w-40 h-auto sm:w-80"
              />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-2 sm:mb-4">
              Reset Password
            </h2>
            <p className="text-sm sm:text-base text-center text-gray-600 mb-6 sm:mb-8">
              Enter a new password to secure your account.
            </p>
            <form onSubmit={handleSubmit}>
              <input
                type="password"
                className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 mb-4 sm:mb-6"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 sm:py-4 rounded-lg font-semibold hover:opacity-90 transition-all duration-300 relative overflow-hidden"
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
                    Updating...
                  </div>
                ) : (
                  "Update Password"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;