import { Category } from "../models/category.model.js";

const createCategory = async (req, res) => {
  console.log(req.body);
  const { categoryId, name, description } = req?.body;
  if (!categoryId || !name || !description) {
    res.status(400).json({ msg: "Please enter all the fields" });
  }
  try {
    const catagoryExist = await Category.findOne({ categoryId });
    if (catagoryExist) {
      res.status(409).json({ msg: "Catagroy already exists" });
    }
    const category = new Category({
      ...req.body,
    });
    await category.save();
    return res.status(201).json({
      status: 201,
      msg: "Category created successfully",
      data: category,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Server error", error: err.message });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categoreis = await Category.find({});
    return res
      .status(200)
      .json({ msg: "Category fetched successfully", data: categoreis });
  } catch (error) {
    return res.status(500).json({ msg: "Sever error", error: error.message });
  }
};

export { createCategory, getAllCategories };
