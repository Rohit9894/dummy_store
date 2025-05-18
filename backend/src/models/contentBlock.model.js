import mongoose from "mongoose";

const contentBlockSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["slider", "banner", "promotion", "category-highlight"],
      required: true,
    },
    identifier: {
      type: String,
      required: true,
      unique: true,
      enum: [
        "homepage-hero-slider",
        "mid-page-sale-banner",
        "category-banner-electronics",
        "footer-banner",
      ],
    },
    title: String,
    description: String,
    images: [String],
    redirectLinks: [String],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
export const ContentBlock =
  mongoose?.models?.ContentBlock ||
  mongoose.model("ContentBlock", contentBlockSchema);
