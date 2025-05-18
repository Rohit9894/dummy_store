import exprees from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  getProductsByTags,
  updateProduct,
} from "../controllers/product.controller.js";
const productRouter = exprees.Router();
productRouter.post("/", createProduct); // Create a product
productRouter.get("/", getAllProducts); // Get all products
productRouter.get("/tag-products", getProductsByTags); 
productRouter.get("/:id", getProductById); // Get product by ID
productRouter.put("/:id", updateProduct); // Update product by ID
productRouter.delete("/:id", deleteProduct); // Delete product by I
export default productRouter;
