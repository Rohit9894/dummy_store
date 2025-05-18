import exprees from "express";
import {
  createContentBlock,
  getAllContentBlocks,
} from "../controllers/contentBlock.controller.js";
const contentBlockRouter = exprees.Router();

contentBlockRouter.get("/",getAllContentBlocks);
contentBlockRouter.post("/", createContentBlock);

export default contentBlockRouter;
