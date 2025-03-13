import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";

const Totals = () => {
    const { getCart, subtotal, tax, cartTotal } = useContext(ShopContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            await getCart();
        } catch (error) {
            toast.error("Failed to fetch cart:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="text-center py-20 text-xl">Loading checkout...</div>;

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4 text-russian_violet">Cart Totals</h2>
            <div className="space-y-2">
                <div className="flex justify-between">
                    <p className="text-true_blue font-semibold">Subtotal:</p>
                    <p className="text-true_blue font-semibold">₹{subtotal}</p>
                </div>
                <div className="flex justify-between">
                    <p className="text-true_blue font-semibold">Tax (18%):</p>
                    <p className="text-true_blue font-semibold">₹{tax}</p>
                </div>
                <div className="flex justify-between">
                    <p className="text-true_blue font-bold text-lg">Total:</p>
                    <p className="text-true_blue font-bold text-lg">₹{cartTotal}</p>
                </div>
            </div>
        </div>
    );
};

export default Totals;