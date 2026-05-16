import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },

  items: [
    {
      productId: String,
      name: String,
      price: Number,
      images: [String],
      brand: String,
      category: String,
    },
  ],
});

export default mongoose.model(
  "Wishlist",
  wishlistSchema
);