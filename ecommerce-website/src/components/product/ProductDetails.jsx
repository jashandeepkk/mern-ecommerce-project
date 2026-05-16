import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FaStar,
  FaShoppingCart,
  FaMapMarkerAlt,
} from "react-icons/fa";

import { getPricing } from "../../utils/pricing";
import { useCart } from "../context/CartContext";

const ProductDetails = () => {
  const { state: product } = useLocation();

  const { addToCart } = useCart();

  if (!product) {
    return (
      <p className="p-10 text-lg">
        Product not found
      </p>
    );
  }

  const {
    price,
    oldPrice,
    discount,
  } = getPricing(product);

  
  const getImage = (img) => {
    if (!img) {
      return "https://dummyimage.com/600x600/cccccc/000000&text=No+Image";
    }

    if (img.startsWith("data:image")) {
      return img;
    }

    return `https://mern-ecommerce-project-rtjp.onrender.com/${img}`;
  };

  
  const images =
    product.images?.length > 0
      ? product.images
      : [
          product.thumbnail ||
            product.image,
        ];

  const [activeImage, setActiveImage] =
    useState(getImage(images[0]));

  const [qty, setQty] = useState(1);

 
  const handleCart = () => {
    addToCart({
      ...product,
      qty,
    });

    toast.success("Added to cart 🛒");
  };

  return (
    <div className="bg-[#f3f3f3] min-h-screen py-6 px-3 lg:px-6">

      
      <p className="text-sm text-gray-500 mb-5">
        Home / {product.category} /{" "}
        {product.name}
      </p>

      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">

       
        <div className="lg:col-span-5">

          <div className="bg-white rounded-xl p-4 shadow-sm border">

            <div className="flex gap-4">

              
              <div className="flex flex-col gap-3">

                {images.map((img, index) => (
                  <button
                    key={index}
                    onMouseEnter={() =>
                      setActiveImage(
                        getImage(img)
                      )
                    }
                    onClick={() =>
                      setActiveImage(
                        getImage(img)
                      )
                    }
                    className={`w-[70px] h-[70px]
                    border rounded-md overflow-hidden
                    bg-white p-1 transition-all duration-200
                    ${
                      activeImage ===
                      getImage(img)
                        ? "border-[#007185] shadow"
                        : "border-gray-300 hover:border-[#007185]"
                    }`}
                  >

                    <img
                      src={getImage(img)}
                      alt={`thumb-${index}`}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.target.src =
                          "https://dummyimage.com/100x100/cccccc/000000&text=No+Image";
                      }}
                    />

                  </button>
                ))}

              </div>

              
              <div
                className="flex-1 border rounded-lg
                bg-white h-[650px]
                flex items-center justify-center
                overflow-hidden relative group"
              >

                <img
                  src={activeImage}
                  alt={product.name}
                  className="
                  w-full
                  h-full
                  object-contain
                  p-6
                  transition-transform duration-300
                  group-hover:scale-110"
                  onError={(e) => {
                    e.target.src =
                      "https://dummyimage.com/600x600/cccccc/000000&text=No+Image";
                  }}
                />

              </div>

            </div>

          </div>

        </div>

      
        <div className="lg:col-span-4 bg-white rounded-xl p-6 shadow-sm border">

         
          <h1 className="text-2xl font-normal text-black leading-snug">
            {product.name}
          </h1>

          
          {product.brand && (
            <p className="text-[#007185] mt-2 text-sm hover:underline cursor-pointer">
              Visit the {product.brand} Store
            </p>
          )}

            <div className="flex items-center gap-2 mt-3">

            <div className="flex text-[#f59e0b] text-sm">
              {Array.from({
                length: 5,
              }).map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>

            <span className="text-sm text-[#007185]">
              {product.rating || 4}
            </span>

          </div>

          <hr className="my-5" />

          
          {discount > 0 && (
            <div className="mb-3">

              <span className="bg-red-600 text-white text-sm px-2 py-1 rounded">
                Great Summer Deal
              </span>

            </div>
          )}

          
          <div className="flex items-end gap-3 flex-wrap">

            {discount > 0 && (
              <span className="text-red-500 text-3xl">
                -{discount}%
              </span>
            )}

            <span className="text-5xl font-medium text-black">
              ₹{price.toFixed(2)}
            </span>

          </div>

          {oldPrice > price && (
            <div className="mt-2">

              <span className="text-gray-500">
                M.R.P:
              </span>

              <span className="line-through text-gray-400 ml-2">
                ₹{oldPrice.toFixed(2)}
              </span>

            </div>
          )}

          <p className="text-sm text-gray-600 mt-3">
            Inclusive of all taxes
          </p>

          <hr className="my-6" />

          {/* STOCK */}
          {(product.countInStock ||
            product.stock) > 0 ? (
            <p className="text-green-700 text-xl font-medium">
              In Stock
            </p>
          ) : (
            <p className="text-red-500 text-xl font-medium">
              Out of Stock
            </p>
          )}

          
          <div className="mt-7">

            <h3 className="font-semibold text-lg mb-3">
              About this item
            </h3>

            <p className="text-gray-700 leading-7 text-[15px]">
              {product.description}
            </p>

          </div>

        </div>

       
        <div className="lg:col-span-3">

          <div
            className="bg-white rounded-xl p-6
            border shadow-sm sticky top-24"
          >

            
            <h2 className="text-4xl font-medium text-black">
              ₹{price.toFixed(2)}
            </h2>

            {oldPrice > price && (
              <p className="text-gray-400 line-through mt-2">
                ₹{oldPrice.toFixed(2)}
              </p>
            )}

            
            <p className="text-sm text-gray-700 mt-5 leading-6">
              FREE delivery Saturday,
              16 May.
            </p>

            
            <div className="flex items-start gap-2 mt-4">

              <FaMapMarkerAlt className="mt-1 text-gray-600" />

              <p className="text-sm text-[#007185] cursor-pointer hover:underline">
                Delivering to India
              </p>

            </div>

            
            <p className="text-green-700 text-xl mt-5">
              In stock
            </p>

            
            <div className="mt-5">

              <label className="text-sm font-medium">
                Quantity
              </label>

              <select
                value={qty}
                onChange={(e) =>
                  setQty(
                    Number(
                      e.target.value
                    )
                  )
                }
                className="w-full border rounded-lg px-4 py-3 mt-2 outline-none bg-[#f7f7f7]"
              >
                {[1, 2, 3, 4, 5].map(
                  (num) => (
                    <option
                      key={num}
                      value={num}
                    >
                      {num}
                    </option>
                  )
                )}
              </select>

            </div>

            
            <button
              onClick={handleCart}
              className="w-full mt-6 bg-yellow-400 hover:bg-yellow-500 text-black py-3 rounded-full font-medium transition flex items-center justify-center gap-2"
            >
              <FaShoppingCart />
              Add to Cart
            </button>

            
            <button
              className="w-full mt-3 bg-orange-400 hover:bg-orange-500 text-black py-3 rounded-full font-medium transition"
            >
              Buy Now
            </button>

           
            <button
              className="w-full mt-5 border py-3 rounded-lg hover:bg-gray-50 transition"
            >
              Add to Wish List
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ProductDetails;