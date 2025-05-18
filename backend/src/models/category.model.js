import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  categoryId: String,
  name: String,
  description: String,
});
export const Category =
  mongoose.models?.Category || mongoose.model("Category", categorySchema);
