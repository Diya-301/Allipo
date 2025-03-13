import productModel from "../models/productModel.js";

const getAllProducts = async (req, res) => {
    try {
        const products = await productModel.find();

        if (!products || products.length === 0) {
            return res.json({ success: false, message: "No products found" });
        }

        const cleanedProducts = products.map(product => {
            const filteredProduct = Object.fromEntries(
                Object.entries(product.toObject()).filter(([key, value]) => 
                    Array.isArray(value) ? value.length > 0 : true
                )
            );
            return filteredProduct;
        });

        res.json({ success: true, products: cleanedProducts });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

const getProductByName = async (req, res) => {
    try {
        let { name } = req.params;

        name = name.replace(/_/g, " ");

        const productsCollection = await productModel.find();

        for (const category of productsCollection) {
            for (const key in category.toObject()) {
                if (Array.isArray(category[key])) {
                    const product = category[key].find(p => p.name.toLowerCase() === name.toLowerCase());
                    if (product) {
                        return res.json({ success: true, category: key, product });
                    }
                }
            }
        }

        res.json({ success: false, message: "Product not found" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};


const addProduct = async (req, res) => {
    try {
        const { category, name, pharma_grade, grade, CAS_No } = req.body;

        if (!category) {
            return res.json({ success: false, message: "Category is required" });
        }

        const productsCollection = await productModel.findOne({ [category]: { $exists: true } });

        if (!productsCollection) {
            return res.json({ success: false, message: "Category not found" });
        }

        const newProduct = { name, pharma_grade, grade, CAS_No };

        productsCollection[category].push(newProduct);
        await productsCollection.save();

        res.json({ success: true, message: "Product added successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { category, name, pharma_grade, grade, CAS_No } = req.body;

        if (!category) {
            return res.json({ success: false, message: "Category is required" });
        }

        const updateFields = { name };
        if (pharma_grade) updateFields["pharma_grade"] = pharma_grade;
        if (grade) updateFields["grade"] = grade;
        if (CAS_No) updateFields["CAS_No"] = CAS_No;

        const result = await productModel.updateOne(
            { [category]: { $elemMatch: { name: name } } }, 
            { $set: { [`${category}.$`]: updateFields } } 
        );

        if (result.matchedCount === 0) {
            return res.json({ success: false, message: "Product not found" });
        }

        res.json({
            success: true,
            message: "Product updated successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};


export { getAllProducts, getProductByName, addProduct, updateProduct, };
