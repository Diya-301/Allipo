import { useState, useContext, useEffect } from "react";
import { Link, useLocation, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import Animation from "../components/ui/Animation";
import Atom from "../components/ui/Atom";
import { motion } from "framer-motion";

const Login = () => {
  const location = useLocation();
  const [currentState, setCurrentState] = useState("Login");
  const [isLoading, setIsLoading] = useState(false);
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("signup") === "true") {
      setCurrentState("Sign Up");
    }
  }, [location.search]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(backendUrl + "/api/user/register", { name, email, password });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success("Registration successful!");
          window.scrollTo(0, 0)
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backendUrl + "/api/user/login", { email, password });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success("Login successful!");
          window.scrollTo(0, 0)
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred. Please try again.");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-baby_powder flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 relative  overflow-hidden">
      <Animation />
      <div className="w-full max-w-md z-10">
        <h2 className="mt-6 text-center pt-10 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-russian_violet">
          {currentState === "Login" ? "Welcome back!" : "Create an Account"}
        </h2>
        <p className="mt-2 text-center font-medium text-base sm:text-lg text-true_blue">
          {currentState === "Login" ? "Login to Your Account" : "Sign up to get started"}
        </p>
      </div>
      <div className="w-full max-w-md z-10 mt-6">
        <div className="bg-baby_powder py-8 px-6 sm:px-10 shadow sm:rounded-lg">
          <form onSubmit={onSubmitHandler} className="space-y-6">
            <div className="flex justify-center mb-6">
              <Atom />
            </div>
            {currentState === "Sign Up" && (
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-russian_violet">Name</label>
                <input id="name" name="name" type="text" required value={name} onChange={(e) => setName(e.target.value)} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-true_blue focus:border-true_blue sm:text-sm bg-baby_powder" />
              </div>
            )}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-russian_violet">Email</label>
              <input id="email" name="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-true_blue focus:border-true_blue sm:text-sm bg-baby_powder" />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-russian_violet">Password</label>
              <input id="password" name="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-true_blue focus:border-true_blue sm:text-sm bg-baby_powder" />
            </div>
            <div>
              <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-true_blue hover:bg-russian_violet focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-true_blue transition-all duration-300" disabled={isLoading}>
                {isLoading ? "Loading..." : currentState === "Login" ? "Sign In" : "Sign Up"}
              </button>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
              <div className="text-sm">
                <Link to="/forgot-password" className="font-medium text-true_blue hover:text-russian_violet transition-colors duration-300">Forgot your password?</Link>
              </div>
              <div className="text-sm">
                <p onClick={() => setCurrentState(currentState === "Login" ? "Sign Up" : "Login")} className="font-medium text-true_blue hover:text-russian_violet transition-colors duration-300 cursor-pointer">
                  {currentState === "Login" ? "Create an account" : "Login Here"}
                </p>
              </div>
            </div>
            {currentState === "Sign Up" && (
              <div className="overflow-hidden whitespace-nowrap w-full relative">
                <motion.div
                  className="text-sm flex space-x-8"
                  animate={{ x: ["0%", "-100%"] }}
                  transition={{
                    repeat: Infinity,
                    duration: 10,
                    ease: "linear",
                  }}
                >
                  <p className="mr-8">
                    By signing up, you agree to the{" "}
                    <NavLink to="/terms&conditions" className="text-blue-600 hover:underline">
                      Terms of Service
                    </NavLink>{" "}
                    and{" "}
                    <NavLink to="/privacy" className="text-blue-600 hover:underline">
                      Privacy Policy
                    </NavLink>
                    , including{" "}
                    <NavLink to="/cookies" className="text-blue-600 hover:underline">
                      cookie use
                    </NavLink>.
                  </p>
                  <p className="mr-8">
                    By signing up, you agree to the{" "}
                    <NavLink to="/terms&conditions" className="text-blue-600 hover:underline">
                      Terms of Service
                    </NavLink>{" "}
                    and{" "}
                    <NavLink to="/privacy" className="text-blue-600 hover:underline">
                      Privacy Policy
                    </NavLink>
                    , including{" "}
                    <NavLink to="/cookies" className="text-blue-600 hover:underline">
                      cookie use
                    </NavLink>.
                  </p>
                </motion.div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
export default Login;