import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { FaShoppingCart, FaBoxOpen } from "react-icons/fa";

const CustomToast = ({ closeToast }) => {
    const { navigate } = useContext(ShopContext);

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <p style={{ margin: 0, fontSize: "14px", fontWeight: "bold", color: "#fff" }}>Item added to cart!</p>
            <div style={{ display: "flex", gap: "10px" }}>
                <button
                    onClick={() => {
                        navigate("/cart");
                        closeToast();
                    }}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        padding: "8px 16px",
                        background: "#6200EE",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        fontSize: "14px",
                        position: "relative",
                        overflow: "hidden",
                    }}
                >
                    <FaShoppingCart size={16} /> Go to Cart
                    <span
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: "100%",
                            height: "100%",
                            background: "rgba(255, 255, 255, 0.3)",
                            borderRadius: "50%",
                            pointerEvents: "none",
                            opacity: 0,
                            transition: "opacity 0.5s ease, transform 0.5s ease",
                        }}
                    ></span>
                </button>

                <button
                    onClick={() => {
                        navigate("/products");
                        closeToast();
                    }}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        padding: "8px 16px",
                        background: "#03DAC6",
                        color: "#333",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        fontSize: "14px",
                        position: "relative",
                        overflow: "hidden",
                    }}
                >
                    <FaBoxOpen size={16} /> Back to Products
                    <span
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: "100%",
                            height: "100%",
                            background: "rgba(0, 0, 0, 0.1)",
                            borderRadius: "50%",
                            pointerEvents: "none",
                            opacity: 0,
                            transition: "opacity 0.5s ease, transform 0.5s ease",
                        }}
                    ></span>
                </button>
            </div>
        </div>
    );
};

export default CustomToast;