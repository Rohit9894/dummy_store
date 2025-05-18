import { Product } from "../models/product.model.js";

const createProduct = async (req, res) => {
  try {
    const { name, description, price, categoryId, stock, images, ratings } =
      console.log(search);
    if (
      !name ||
      !description ||
      !price ||
      !categoryId ||
      !stock ||
      !images ||
      !ratings
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newProduct = new Product({
      ...req.body,
    });

    await newProduct.save();
    res
      .status(201)
      .json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, sortBy, order = "desc" } = req.query;
    const skip = (page - 1) * limit;
    const searchQuery =
      typeof search === "string" && search.trim() !== ""
        ? { name: { $regex: search.trim(), $options: "i" } }
        : {};

    const sortOrder = order === "asc" ? 1 : -1;
    const sortQuery = { [sortBy]: sortOrder };
    let query = Product.find(searchQuery).skip(skip).limit(limit);

    if (sortBy) {
      const sortOrder = order === "asc" ? 1 : -1;
      query = query.sort({ [sortBy]: sortOrder });
    }

    const allProducts = await query;
    const totalCount = await Product.countDocuments(searchQuery);
    const totalPages = Math.ceil(totalCount / limit);

    return res.status(200).json({
      msg: "Products fetched successfully",
      data: allProducts,
      pagination: {
        totalCount,
        totalPages,
        currentPage: page,
        limit,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Server error", error: err.message });
  }
};
const getProductById = async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Server error", error: err.message });
  }
};
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ msg: "Invalid product ID" });
    }
    const updatedProduct = await Product.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });
    if (!updatedProduct) {
      return res.status(404).json({ msg: "Product not found" });
    }

    res
      .status(200)
      .json({ msg: "Product updated successfully", product: updatedProduct });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ msg: "Invalid product ID" });
    }
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ msg: "Product not found" });
    }
    return res
      .status(200)
      .json({ msg: "Product deleted successfully", deletedProduct });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Server error", error: err.message });
  }
};

const getProductsByTags = async (req, res) => {
  const desiredTags = ["sale", "best-deal", "popular-search"];
  const result = {};

  // Initialize the output structure
  desiredTags.forEach((tag) => {
    result[tag] = [];
  });
  try {
    // Simple query to fetch documents containing any of the tags
    const products = await Product.find(
      { productTags: { $in: desiredTags } },
      { name: 1, price: 1, productTags: 1, ratings: 1, images: 1 }
    );

    // Check which tags are present and push tag names
    products.forEach((product) => {
      desiredTags.forEach((tag) => {
        if (product.productTags.includes(tag)) {
          result[tag].push(product); // Or push product._id/product as needed
        }
      });
    });

    res
      .status(201)
      .json({ message: "Products fetched successfully", data: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
export {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsByTags,
};
