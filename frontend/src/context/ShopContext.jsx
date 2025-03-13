import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();

    // 🛠 Fix: Initialize token from localStorage to prevent re-renders
    const [token, setToken] = useState(localStorage.getItem('token') || '');

    // Add cartItems state
    const [cartItems, setCartItems] = useState([]);

    // Add cartTotal state
    const [cartTotal, setCartTotal] = useState(0);
    const [subtotal, setSubtotal] = useState(0);
    const [tax, setTax] = useState(0);

    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'));
        }
    }, []);

    // Fetch cart data
    const getCart = async () => {
        try {
            const response = await axios.post(`${backendUrl}/api/cart/get`, {}, {
                headers: { Authorization: token },
            });
            if (response.data.success) {
                const formattedCart = formatCartData(response.data.cartData);
                setCartItems(formattedCart); // Update cartItems state with formatted data
                calculateAndUpdateTotal(formattedCart); // Calculate and update cartTotal
                return formattedCart;
            }
        } catch (error) {
            toast.error("Error fetching cart:", error.response?.data || error.message);
            throw error; // Re-throw the error for handling in the component
        }
    };

    // Format cart data
    const formatCartData = (cartData) => {
        let formattedCart = [];
        for (const product in cartData) {
            for (const grade in cartData[product]) {
                for (const type in cartData[product][grade]) {
                    for (const size in cartData[product][grade][type]) {
                        const packagingSizeValue = parseInt(size.replace(/\D/g, ""), 10);
                        const capitalizedPackagingType =
                            type.charAt(0).toUpperCase() + type.slice(1);
                        formattedCart.push({
                            productName: product.replace(/_/g, " ").trim().replace(/\b\w/g, (l) => l.toUpperCase()),
                            selectedGrade: grade,
                            selectedPackagingType: capitalizedPackagingType,
                            selectedPackagingSize: size,
                            quantity: cartData[product][grade][type][size].quantity,
                            pricePerKg: cartData[product][grade][type][size].price,
                            packagingSizeValue: packagingSizeValue,
                        });
                    }
                }
            }
        }
        return formattedCart.reverse();
    };

    // Delete a product from the cart
    const deleteCart = async (product) => {
        try {
            await axios.post(
                `${backendUrl}/api/cart/delete`,
                {
                    product: {
                        productName: product.productName.toLowerCase().replace(/\s+/g, "_"),
                        selectedGrade: product.selectedGrade,
                        selectedPackagingType: product.selectedPackagingType.toLowerCase(),
                        selectedPackagingSize: product.selectedPackagingSize,
                    },
                },
                {
                    headers: { Authorization: token },
                }
            );
            toast.success("Item deleted from cart successfully");

            // Refetch the cart and recalculate the total
            const updatedCart = await getCart();
            calculateAndUpdateTotal(updatedCart);
        } catch (error) {
            toast.error("Error deleting item from cart:", error.response?.data || error.message);
            throw error;
        }
    };

    const updateCart = async (product, change) => {
        const updatedQuantity = Math.max(0, product.quantity + change);

        try {
            await axios.post(
                `${backendUrl}/api/cart/update`,
                {
                    product: {
                        productName: product.productName.toLowerCase().replace(/\s+/g, "_"),
                        selectedGrade: product.selectedGrade,
                        selectedPackagingType: product.selectedPackagingType.toLowerCase(),
                        selectedPackagingSize: product.selectedPackagingSize,
                        quantity: updatedQuantity,
                        price: product.pricePerKg,
                    },
                },
                {
                    headers: { Authorization: token },
                }
            );
            toast.success("Cart updated successfully");

            // Refetch the cart and recalculate the total
            const updatedCart = await getCart();
            calculateAndUpdateTotal(updatedCart);
        } catch (error) {
            toast.error("Error updating cart:", error.response?.data || error.message);
            throw error;
        }
    };

    const calculateAndUpdateTotal = (cartData) => {
        const calculatedSubtotal = cartData.reduce(
            (sum, item) => sum + item.quantity * item.packagingSizeValue * item.pricePerKg,
            0
        );
        const calculatedTax = calculatedSubtotal * 0.18; // 18% tax
        const calculatedFinalTotal = calculatedSubtotal + calculatedTax;

        setSubtotal(calculatedSubtotal.toFixed(2)); // Store subtotal as a string with 2 decimal places
        setTax(calculatedTax.toFixed(2)); // Store tax as a string with 2 decimal places
        setCartTotal(calculatedFinalTotal.toFixed(2)); // Store final total as a string with 2 decimal places
    };

    // Expose cartItems and setCartItems in the context
    const value = { 
        navigate,
        backendUrl,
        setToken,
        token,
        getCart,
        deleteCart,
        updateCart,
        cartItems,
        setCartItems,
        cartTotal, // Final total
        subtotal,  // Subtotal
        tax,       // Tax amount
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )

}

export default ShopContextProvider;