import exprees from "express";
import {
  addToCart,
  clearCart,
  getCart,
  removeFromCart,
  updateQuantityInCart,
} from "../controllers/cart.controller.js";

const cartRouter = exprees.Router();
cartRouter.get("/", getCart);
cartRouter.post("/add", addToCart);
cartRouter.patch("/update-quantity", updateQuantityInCart);
cartRouter.post("/remove", removeFromCart);
cartRouter.post("/clear", clearCart);

export default cartRouter;
