import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },

  items: [
    {
      productId: String,
      title: String,
      price: Number,
      image: String,
      qty: Number,
    },
  ],
});

export default mongoose.model("Cart", cartSchema);