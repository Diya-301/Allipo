import userModel from "../models/userModel.js";

// Add products to user cart
const addToCart = async (req, res) => {
    try {
        const { userId, product } = req.body;

        const userData = await userModel.findById(userId);
        let cartData = userData.cartData || {};

        // Check if the product already exists in the cart
        if (cartData[product.productName]) {
            if (cartData[product.productName][product.selectedGrade]) {
                if (cartData[product.productName][product.selectedGrade][product.selectedPackagingType]) {
                    if (cartData[product.productName][product.selectedGrade][product.selectedPackagingType][product.selectedPackagingSize]) {
                        // Increment the quantity if the exact product configuration exists
                        cartData[product.productName][product.selectedGrade][product.selectedPackagingType][product.selectedPackagingSize].quantity += product.quantity;
                    } else {
                        // Add the new packaging size
                        cartData[product.productName][product.selectedGrade][product.selectedPackagingType][product.selectedPackagingSize] = {
                            quantity: product.quantity,
                            price: product.price,
                        };
                    }
                } else {
                    // Add the new packaging type
                    cartData[product.productName][product.selectedGrade][product.selectedPackagingType] = {
                        [product.selectedPackagingSize]: {
                            quantity: product.quantity,
                            price: product.price,
                        },
                    };
                }
            } else {
                // Add the new grade
                cartData[product.productName][product.selectedGrade] = {
                    [product.selectedPackagingType]: {
                        [product.selectedPackagingSize]: {
                            quantity: product.quantity,
                            price: product.price,
                        },
                    },
                };
            }
        } else {
            // Add the new product
            cartData[product.productName] = {
                [product.selectedGrade]: {
                    [product.selectedPackagingType]: {
                        [product.selectedPackagingSize]: {
                            quantity: product.quantity,
                            price: product.price,
                        },
                    },
                },
            };
        }

        // Save the updated cart data to the database
        await userModel.findByIdAndUpdate(userId, { cartData });

        res.json({ success: true, message: "Added To Cart" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Update user cart
const updateCart = async (req, res) => {
    try {
        const { userId, product } = req.body;

        const userData = await userModel.findById(userId);
        let cartData = userData.cartData || {};

        // Update the specific product configuration in the cart
        if (
            cartData[product.productName] &&
            cartData[product.productName][product.selectedGrade] &&
            cartData[product.productName][product.selectedGrade][product.selectedPackagingType] &&
            cartData[product.productName][product.selectedGrade][product.selectedPackagingType][product.selectedPackagingSize]
        ) {
            cartData[product.productName][product.selectedGrade][product.selectedPackagingType][product.selectedPackagingSize].quantity = product.quantity;
            cartData[product.productName][product.selectedGrade][product.selectedPackagingType][product.selectedPackagingSize].price = product.price;
        } else {
            return res.json({
                success: false,
                message: "Product configuration not found in the cart.",
            });
        }

        // Save the updated cart data to the database
        await userModel.findByIdAndUpdate(userId, { cartData });

        res.json({ success: true, message: "Cart Updated" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Get user cart data
const getUserCart = async (req, res) => {
    try {
        const { userId } = req.body;

        const userData = await userModel.findById(userId);
        let cartData = userData.cartData || {};

        res.json({ success: true, cartData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Delete a product from the user's cart
const deleteCart = async (req, res) => {
    try {
        const { userId, product } = req.body;

        const userData = await userModel.findById(userId);
        let cartData = userData.cartData || {};

        const {
            productName,
            selectedGrade,
            selectedPackagingType,
            selectedPackagingSize,
        } = product;

        // Check if the product exists in the cart
        if (
            cartData[productName] &&
            cartData[productName][selectedGrade] &&
            cartData[productName][selectedGrade][selectedPackagingType] &&
            cartData[productName][selectedGrade][selectedPackagingType][selectedPackagingSize]
        ) {
            // Delete the specific packaging size
            delete cartData[productName][selectedGrade][selectedPackagingType][selectedPackagingSize];

            // If no packaging sizes are left, delete the packaging type
            if (Object.keys(cartData[productName][selectedGrade][selectedPackagingType]).length === 0) {
                delete cartData[productName][selectedGrade][selectedPackagingType];
            }

            // If no packaging types are left, delete the grade
            if (Object.keys(cartData[productName][selectedGrade]).length === 0) {
                delete cartData[productName][selectedGrade];
            }

            // If no grades are left, delete the product entirely
            if (Object.keys(cartData[productName]).length === 0) {
                delete cartData[productName];
            }
        } else {
            return res.json({
                success: false,
                message: "Product configuration not found in the cart.",
            });
        }

        // Save the updated cart data to the database
        await userModel.findByIdAndUpdate(userId, { cartData });

        res.json({ success: true, message: "Product Removed From Cart" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { addToCart, updateCart, getUserCart, deleteCart };