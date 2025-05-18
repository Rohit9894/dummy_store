import { ContentBlock } from "../models/contentBlock.model.js";

const createContentBlock = async (req, res) => {
  try {
    const { type, identifier, title, description, images, redirectLinks } =
      req.body;
    if (
      !type ||
      !identifier ||
      !title ||
      !description ||
      !images ||
      !redirectLinks
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newContentBlock = new ContentBlock({
      ...req.body,
    });
    await newContentBlock.save();
    res.status(201).json({
      message: "Product created successfully",
      contentBlock: newContentBlock,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const getAllContentBlocks = async (req, res) => {
  try {
    const { identifier } = req.query;
    const allContentBlock = await ContentBlock.find({ identifier });
    return res.status(200).json({
      msg: "contentBlock fetched successfully",
      data: allContentBlock,
    });
  } catch (err) {
    return res.status(500).json({ msg: "Server error", error: err.message });
  }
};
export { createContentBlock, getAllContentBlocks };
