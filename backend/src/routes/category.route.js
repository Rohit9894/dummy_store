import express from "express";

import {
  createCategory,
  getAllCategories,
} from "../controllers/category.controller.js";
const categoryRouter = express.Router();
categoryRouter.post("/categories", createCategory);
categoryRouter.get("/categories", getAllCategories);

export default categoryRouter;
