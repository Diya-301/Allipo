import express from "express";
import { getAllProducts, getProductByName, addProduct, updateProduct, } from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.get("/all", getAllProducts);
productRouter.get("/:name", getProductByName);
productRouter.post("/add", addProduct);
productRouter.put("/update", updateProduct);

export default productRouter;
