import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import userRouter from "./src/routes/user.route.js";
import productRouter from "./src/routes/product.route.js";
import categoryRouter from "./src/routes/category.route.js";
import contentBlockRouter from "./src/routes/contentBlock.route.js";
import cartRouter from "./src/routes/cart.route.js";
import { authMiddleware } from "./src/middleware/authMiddleware.js";
import { User } from "./src/models/user.model.js";
import { Cart } from "./src/models/cart.model.js";
dotenv.config();
const app = express();
const port = process.env.PORT || 4000;
// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

/**
 * Swagger Implementation
 */
const swaggerDocument = YAML.load("./src/docs/swagger.yaml");
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/**
 * All Routes
 */
app.get("/", (req, res) => {
  const token = req.cookies.token;
  console.log(req.cookies);
  if (token) {
    res.json({ msg: "Cookie received!", token });
  } else {
    res.status(401).json({ msg: "No cookie found!" });
  }
});
// Validate Token
app.get("/api/auth/validate-token", authMiddleware, async (req, res) => {
  try {
    const userData = await User.findOne({ _id: req?.user?.id }).select(
      "-password"
    );
    const cart = await Cart.findOne({ userId: req.user.id });

    const count = cart
      ? cart.items.reduce((sum, item) => sum + item.quantity, 0)
      : 0;
    if (!userData) {
      return res
        .status(404)
        .json({ isAuthenticated: false, message: "User not found" });
    }

    return res.status(200).json({
      isAuthenticated: true,
      user: userData,
      cartCount: count,
    });
  } catch (error) {
    console.error("Token validation error:", error.message);
    return res.status(500).json({
      isAuthenticated: false,
      message: "Server error during token validation",
    });
  }
});

app.use("/api/users", userRouter);
app.use("/api/products", authMiddleware, productRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/content-blocks", authMiddleware, contentBlockRouter);
app.use("/api/cart", authMiddleware, cartRouter);

app.listen(port, "0.0.0.0", async () => {
  connectDB();
  console.log(`http://localhost:${port}`);
});
