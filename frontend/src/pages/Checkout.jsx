import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import Totals from "../components/Totals";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";

const Checkout = () => {
    const [deliveryInfo, setDeliveryInfo] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "India",
        phoneNumber: "",
    });
    const [paymentMethod, setPaymentMethod] = useState("");
    const [placeOrderLoading, setPlaceOrderLoading] = useState(false);
    const [buttonState, setButtonState] = useState("default");
    const [errors, setErrors] = useState({});
    const [isRazorpayProcessing, setIsRazorpayProcessing] = useState(false);
    const { navigate, backendUrl, token, cartItems, setCartItems, cartTotal } = useContext(ShopContext);
    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {
        if (placeOrderLoading) {
            setButtonState("placing");
            const placingTimeout = setTimeout(() => {
                setButtonState("done");
            }, 4000);

            const doneTimeout = setTimeout(() => {
                setButtonState("default");
                setPlaceOrderLoading(false);
                if (!isRazorpayProcessing) {
                    navigate("/orders");
                }
            }, 6000);

            return () => {
                clearTimeout(placingTimeout);
                clearTimeout(doneTimeout);
            };
        }
    }, [placeOrderLoading, navigate, isRazorpayProcessing]);

    const initPay = (order) => {
        setIsRazorpayProcessing(true);
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: "Order Payment",
            description: "Order Payment",
            order_id: order.id,
            receipt: order.receipt,
            handler: async (response) => {
                try {
                    const { data } = await axios.post(`${backendUrl}/api/order/verifyRazorpay`, response, {
                        headers: { Authorization: token },
                    });
                    if (data.success) {
                        setCartItems([]);
                        toast.success("Order Placed Successfully");
                        setPlaceOrderLoading(true);
                    } else {
                        toast.error(data.message || "Failed to verify payment.");
                        setPlaceOrderLoading(false);
                    }
                } catch (error) {
                    toast.error(error.message || "An error occurred while verifying payment.");
                    setPlaceOrderLoading(false);
                } finally {
                    setIsRazorpayProcessing(false);
                }
            },
            modal: {
                escape: false,
                backdropclose: false,
            },
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
        rzp.on('payment.failed', function (response) {
            toast.error("Payment Failed. Please try again.");
            setPlaceOrderLoading(false);
            setIsRazorpayProcessing(false);
        });
    };

    const validateForm = () => {
        const newErrors = {};

        if (!deliveryInfo.firstName.trim()) newErrors.firstName = "First Name is required";
        if (!deliveryInfo.lastName.trim()) newErrors.lastName = "Last Name is required";

        if (!deliveryInfo.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(deliveryInfo.email)) {
            newErrors.email = "Invalid email format";
        }

        if (!deliveryInfo.street.trim()) newErrors.street = "Street is required";
        if (!deliveryInfo.city.trim()) newErrors.city = "City is required";
        if (!deliveryInfo.state.trim()) newErrors.state = "State is required";

        if (!deliveryInfo.zipCode.trim()) {
            newErrors.zipCode = "Pincode is required";
        } else if (!/^\d{6}$/.test(deliveryInfo.zipCode)) {
            newErrors.zipCode = "Pincode must be exactly 6 digits";
        }

        if (!deliveryInfo.phoneNumber.trim()) {
            newErrors.phoneNumber = "Phone Number is required";
        } else if (!/^\d{10}$/.test(deliveryInfo.phoneNumber)) {
            newErrors.phoneNumber = "Phone Number must be exactly 10 digits";
        }

        if (!paymentMethod) {
            newErrors.paymentMethod = "Please select a payment method";
            toast.error("Please select a payment method");
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handlePlaceOrder = async (e) => {
        if (e) e.preventDefault();

        const isValid = validateForm();
        if (!isValid) return;

        setPlaceOrderLoading(true);

        try {
            let orderItems = [];

            for (const item of cartItems) {
                if (item.quantity > 0) {
                    const orderItem = {
                        productName: item.productName,
                        grade: item.selectedGrade,
                        packaging: item.selectedPackagingType,
                        size: item.selectedPackagingSize,
                        quantity: item.quantity,
                        pricePerKg: item.pricePerKg,
                        total: item.quantity * item.packagingSizeValue * item.pricePerKg,
                    };

                    orderItems.push(orderItem);
                }
            }

            let orderData = {
                address: deliveryInfo,
                items: orderItems,
                amount: cartTotal,
            };

            switch (paymentMethod) {
                case "cod":
                    const response = await axios.post(`${backendUrl}/api/order/place`, orderData, {
                        headers: { Authorization: token },
                    });
                    if (response.data.success) {
                        setIsDisabled(true);
                        setCartItems([]);
                        toast.success("Order Placed Successfully");
                        setPlaceOrderLoading(true);                      
                    } else {
                        toast.error(response.data.message || "Failed to place the order.");
                        setPlaceOrderLoading(false);
                    }
                    break;

                case "razorpay":
                    const responseRazorpay = await axios.post(`${backendUrl}/api/order/razorpay`, orderData, {
                        headers: { Authorization: token },
                    });
                    if (responseRazorpay.data.success) {
                        setIsDisabled(true);
                        initPay(responseRazorpay.data.order);                      
                    } else {
                        toast.error(responseRazorpay.data.message || "Failed to initiate Razorpay payment.");
                        setPlaceOrderLoading(false);
                    }
                    break;

                default:
                    toast.error("Invalid payment method selected");
                    setPlaceOrderLoading(false);
            }
        } catch (error) {
            toast.error(error.message || "An error occurred while placing the order.");
            setPlaceOrderLoading(false);
        }
    };

    return (
        <section className="px-[5%] py-16 md:py-24 lg:py-28 bg-baby_powder min-h-screen">
            <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-8">
                <motion.h1
                    className="text-3xl font-bold mb-8 text-gray-800 text-center"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Checkout
                </motion.h1>
                <form className="grid grid-cols-1 lg:grid-cols-3 gap-8" onSubmit={handlePlaceOrder}>
                    <div className="lg:col-span-2">
                        <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
                            <h2 className="text-2xl font-bold mb-4 text-gray-800">Delivery Information</h2>
                            <div className="space-y-4">
                                <div className="flex space-x-4">
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium text-gray-700">First Name</label>
                                        <input
                                            type="text"
                                            value={deliveryInfo.firstName}
                                            onChange={(e) => setDeliveryInfo({ ...deliveryInfo, firstName: e.target.value })}
                                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.firstName ? "border-red-500" : "border-gray-300"
                                                }`}
                                            required
                                        />
                                        {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName}</p>}
                                    </div>
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium text-gray-700">Last Name</label>
                                        <input
                                            type="text"
                                            value={deliveryInfo.lastName}
                                            onChange={(e) => setDeliveryInfo({ ...deliveryInfo, lastName: e.target.value })}
                                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.lastName ? "border-red-500" : "border-gray-300"
                                                }`}
                                            required
                                        />
                                        {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName}</p>}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email Address</label>
                                    <input
                                        type="email"
                                        value={deliveryInfo.email}
                                        onChange={(e) => setDeliveryInfo({ ...deliveryInfo, email: e.target.value })}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? "border-red-500" : "border-gray-300"
                                            }`}
                                        required
                                    />
                                    {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Street</label>
                                    <input
                                        type="text"
                                        value={deliveryInfo.street}
                                        onChange={(e) => setDeliveryInfo({ ...deliveryInfo, street: e.target.value })}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.street ? "border-red-500" : "border-gray-300"
                                            }`}
                                        required
                                    />
                                    {errors.street && <p className="text-red-500 text-xs">{errors.street}</p>}
                                </div>
                                <div className="flex space-x-4">
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium text-gray-700">City</label>
                                        <input
                                            type="text"
                                            value={deliveryInfo.city}
                                            onChange={(e) => setDeliveryInfo({ ...deliveryInfo, city: e.target.value })}
                                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.city ? "border-red-500" : "border-gray-300"
                                                }`}
                                            required
                                        />
                                        {errors.city && <p className="text-red-500 text-xs">{errors.city}</p>}
                                    </div>
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium text-gray-700">State</label>
                                        <input
                                            type="text"
                                            value={deliveryInfo.state}
                                            onChange={(e) => setDeliveryInfo({ ...deliveryInfo, state: e.target.value })}
                                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.state ? "border-red-500" : "border-gray-300"
                                                }`}
                                            required
                                        />
                                        {errors.state && <p className="text-red-500 text-xs">{errors.state}</p>}
                                    </div>
                                </div>
                                <div className="flex space-x-4">
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium text-gray-700">Zip Code</label>
                                        <input
                                            type="text"
                                            value={deliveryInfo.zipCode}
                                            onChange={(e) => setDeliveryInfo({ ...deliveryInfo, zipCode: e.target.value })}
                                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.zipCode ? "border-red-500" : "border-gray-300"
                                                }`}
                                            required
                                        />
                                        {errors.zipCode && <p className="text-red-500 text-xs">{errors.zipCode}</p>}
                                    </div>
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium text-gray-700">Country</label>
                                        <input
                                            type="text"
                                            value="India"
                                            readOnly
                                            className="w-full px-3 py-2 border rounded-md bg-gray-100 cursor-not-allowed"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                                    <input
                                        type="tel"
                                        value={deliveryInfo.phoneNumber}
                                        onChange={(e) => setDeliveryInfo({ ...deliveryInfo, phoneNumber: e.target.value })}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.phoneNumber ? "border-red-500" : "border-gray-300"
                                            }`}
                                        required
                                    />
                                    {errors.phoneNumber && <p className="text-red-500 text-xs">{errors.phoneNumber}</p>}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
                            <Totals />
                            <div className="mt-6">
                                <h3 className="text-lg font-bold mb-2 text-gray-800">Payment Method</h3>
                                <div className="space-y-2">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="razorpay"
                                            checked={paymentMethod === "razorpay"}
                                            onChange={() => setPaymentMethod("razorpay")}
                                            className="mr-2"
                                        />
                                        <span className="text-gray-700 font-semibold">Razorpay</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="cod"
                                            checked={paymentMethod === "cod"}
                                            onChange={() => setPaymentMethod("cod")}
                                            className="mr-2"
                                        />
                                        <span className="text-gray-700 font-semibold">Cash on Delivery (COD)</span>
                                    </label>
                                </div>
                                {errors.paymentMethod && <p className="text-red-500 text-xs mt-2">{errors.paymentMethod}</p>}
                            </div>
                            <button
                                type="button"
                                onClick={handlePlaceOrder}
                                disabled={isDisabled}
                                className={`mt-6 place-order place-order--${buttonState}`}
                            >
                                <div className="default text">Place Order</div>
                                <div className="forklift">
                                    <div className="upper"></div>
                                    <div className="lower"></div>
                                </div>
                                <div className="box animation"></div>
                                <div className="done text">Done</div>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <style jsx>{`
                * {
                    margin: 0;
                    padding: 0;
                    font-family: "Montserrat", sans-serif;
                }

                .place-order {
                    width: 160px;
                    height: 60px;
                    border-radius: 10px;
                    background-color: #2b59b5;
                    position: relative;
                    overflow: hidden;
                    border: none;
                    cursor: pointer;
                }
                .place-order .text {
                    width: 100%;
                    height: 100%;
                    line-height: 60px;
                    opacity: 0;
                    color: #fff;
                    font-weight: bold;
                    font-size: 16px;
                    position: absolute;
                    top: 0;
                    transition: all 0.2s;
                    transform: translateY(20px);
                }
                .place-order:focus {
                    outline: none;
                }
                .place-order .forklift {
                    display: none;
                    transform: scale(0.4);
                    position: absolute;
                    top: -2px;
                    left: -65px;
                    animation: 4s lift-moving infinite;
                }
                .place-order .forklift .upper {
                    width: 34px;
                    height: 20px;
                    margin-bottom: 2px;
                    border: 5px solid #ff7745;
                    position: relative;
                    border-radius: 10px 50px 10px 5px;
                }
                .place-order .forklift .upper:after {
                    content: "";
                    width: 30px;
                    height: 50px;
                    position: absolute;
                    left: 170%;
                    top: 12px;
                    box-sizing: border-box;
                    border-left: 5px solid #000;
                    border-bottom: 6px solid #000;
                    border-radius: 0 0 0 5px;
                    transform-origin: center;
                }
                .place-order .forklift .lower {
                    width: 60px;
                    height: 30px;
                    position: relative;
                    background-color: #FF4500;
                    border-radius: 5px 15px 10px 10px;
                }
                .place-order .forklift .lower:before, .place-order .forklift .lower:after {
                    content: "";
                    width: 20px;
                    height: 20px;
                    position: absolute;
                    left: 0;
                    bottom: -10px;
                    border: 3px solid #2b59b5;
                    border-radius: 50%;
                    background-color: #000;
                }
                .place-order .forklift .lower:after {
                    left: 36px;
                }
                .place-order .box {
                    display: none;
                    width: 50px;
                    height: 50px;
                    background-color: #ad8762;
                    border-radius: 5px;
                    position: absolute;
                    top: 56px;
                    left: 50px;
                    transform: scale(0.4);
                    animation: 4s box infinite;
                }
                .place-order .box:before, .place-order .box:after {
                    content: "";
                    width: 4px;
                    height: 12px;
                    left: 21px;
                    background-color: #ffbf59;
                    position: absolute;
                }
                .place-order .box:after {
                    height: 10px;
                    left: 25px;
                }
                .place-order--default .default {
                    opacity: 1;
                    transform: translateY(0);
                }
                .place-order--default .done {
                    transform: translateY(20px);
                }
                .place-order--placing .forklift {
                    display: block;
                }
                .place-order--placing .box {
                    display: block;
                }
                .place-order--placing .default {
                    transform: translateY(-20px);
                }
                .place-order--done .done {
                    opacity: 1;
                    transform: translateY(0);
                }
                .place-order--done .default {
                    transform: translateY(-20px);
                }

                @keyframes lift-moving {
                    0% {
                        left: -65px;
                    }
                    50% {
                        left: 20px;
                    }
                    60% {
                        left: 15px;
                    }
                    100% {
                        left: 200px;
                    }
                }
                @keyframes box {
                    0% {
                        top: 56px;
                    }
                    20% {
                        top: 6px;
                        left: 50px;
                    }
                    50% {
                        top: 6px;
                        left: 50px;
                    }
                    60% {
                        top: 6px;
                        left: 45px;
                    }
                    100% {
                        top: 6px;
                        left: 230px;
                    }
                }
            `}</style>
        </section>
    );
};

export default Checkout;