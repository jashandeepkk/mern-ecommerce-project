import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    
    name: {
      type: String,
      required: true,
      trim: true,
    },

    
    description: {
      type: String,
      required: true,
      trim: true,
    },

    
    price: {
      type: Number,
      required: true,
      default: 0,
    },

    
    category: {
      type: String,
      required: true,
      trim: true,
    },

    
subCategory: {
  type: String,
  trim: true,
},

    
    brand: {
      type: String,
      default: "",
      trim: true,
    },

    
    stock: {
      type: Number,
      default: 0,
    },

    
    images: [
      {
        type: String,
      },
    ],

    
    thumbnail: {
      type: String,
      default: "",
    },

    
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    
    rating: {
      type: Number,
      default: 0,
    },

    
    numReviews: {
      type: Number,
      default: 0,
    },

    
    discountPercentage: {
      type: Number,
      default: 0,
    },

   
    featured: {
      type: Boolean,
      default: false,
    },

    
    approved: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model(
  "Product",
  productSchema
);

export default Product;