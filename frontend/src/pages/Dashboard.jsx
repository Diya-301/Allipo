import { useState, useEffect, useContext } from "react";
import { Input } from "@relume_io/relume-ui";
import { Button } from "@relume_io/relume-ui";
import { Label } from "@relume_io/relume-ui";
import { ShoppingCart, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";

const DashboardPage = () => {
  const { backendUrl } = useContext(ShopContext);
  const [user, setUser] = useState({
    name: "",
    email: "",
    company: "Not provided",
    phone: "Not provided",
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("No token found");
        return;
      }

      try {
        const response = await axios.get(backendUrl + "/api/user/getUser", {
          headers: { Authorization: `${token}` },
        });

        const data = await response.data;
        if (data.success) {
          setUser((prevUser) => ({
            ...prevUser,
            name: data.user.name || prevUser.name,
            email: data.user.email || prevUser.email,
            company: data.user.company || prevUser.company,
            phone: data.user.mobile || prevUser.phone,
          }));
        } else {
          toast.error("Failed to fetch user data:", data.message);
        }
      } catch (error) {
        toast.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("No token found");
      return;
    }

    try {
      const response = await axios.put(
        backendUrl + "/api/user/updateUser",
        {
          name: user.name,
          email: user.email,
          company: user.company,
          phone: user.phone,
        },
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;
      if (data.success) {
        toast.success("Profile updated successfully!");
      } else {
        toast.error(data.message || "Failed to update profile.");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message;
        toast.error(errorMessage || "An error occurred while updating the profile.");
      } else {
        toast.error("An error occurred while updating the profile.");
      }
    }
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match!");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("No token found");
      return;
    }

    try {
      const response = await axios.put(
        backendUrl + "/api/user/updatePassword",
        {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        },
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;
      if (data.success) {
        toast.success("Password updated successfully!");
        setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        toast.error("Failed to update password: " + data.message);
      }
    } catch (error) {
      toast.error("An error occurred while updating the password.");
    }
  };

  function DashboardOverview() {
    return (
      <div className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-lg shadow-lg p-6">
        <div className="text-3xl font-bold text-center">
        🎉🎊 Hey there, {user.name}! Let’s make today amazing together! 💪🌈
        </div>
      </div>
    );
  }

  function QuickActions() {
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-semibold text-indigo-700 mb-6">Quick Actions</h2>
        <div className="grid gap-4">
          <Link to="/orders">
            <Button className="w-full bg-indigo-600 border-none text-white hover:bg-indigo-700">
              <ShoppingCart className="mr-2 h-4 w-4" /> View All Orders
            </Button>
          </Link>
          <Link to="/contact">
            <Button className="w-full bg-indigo-600 border-none text-white hover:bg-indigo-700">
              <HelpCircle className="mr-2 h-4 w-4" /> Contact Us
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-[5%] py-20 bg-baby_powder">
      <h1 className="text-5xl font-bold text-indigo-900 mb-8 text-center">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <DashboardOverview />
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm mt-8 p-6">
            <h2 className="text-3xl font-semibold text-indigo-900 mb-6">Account Settings</h2>
            <form onSubmit={handleSubmit} className="space-y-20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-indigo-900">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={user.name}
                    onChange={handleInputChange}
                    className="border-indigo-300"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-indigo-900">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={user.email}
                    onChange={handleInputChange}
                    className="border-indigo-300"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-indigo-900">
                    Company Name
                  </Label>
                  <Input
                    id="company"
                    name="company"
                    value={user.company}
                    onChange={handleInputChange}
                    className="border-indigo-300"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-indigo-900">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={user.phone}
                    onChange={handleInputChange}
                    className="border-indigo-300"
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="bg-indigo-600 border-none text-white hover:bg-indigo-700"
              >
                Update Profile
              </Button>
            </form>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm mt-8 p-6">
            <h2 className="text-3xl font-semibold text-indigo-900 mb-6">Change Password</h2>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password" className="text-indigo-900">
                  Current Password
                </Label>
                <Input
                  id="current-password"
                  name="currentPassword"
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className="border-indigo-300"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password" className="text-indigo-900">
                  New Password
                </Label>
                <Input
                  id="new-password"
                  name="newPassword"
                  type="password"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="border-indigo-300"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="text-indigo-900">
                  Confirm New Password
                </Label>
                <Input
                  id="confirm-password"
                  name="confirmPassword"
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="border-indigo-300"
                />
              </div>
              <Button
                type="submit"
                className="bg-indigo-600 border-none text-white hover:bg-indigo-700"
              >
                Change Password
              </Button>
            </form>
          </div>
        </div>
        <div>
          <QuickActions />
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;