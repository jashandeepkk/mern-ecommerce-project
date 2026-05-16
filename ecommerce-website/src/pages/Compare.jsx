import React, { useEffect, useState } from "react";

import {
  FaHeart,
  FaEye,
} from "react-icons/fa";

import { IoGitCompareOutline } from "react-icons/io5";

import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";

const Compare = () => {

  const [products, setProducts] =
    useState([]);

  const navigate = useNavigate();

  const loadCompare = () => {

    const data =
      JSON.parse(
        localStorage.getItem("compare")
      ) || [];

    setProducts(data);
  };

  useEffect(() => {

    loadCompare();

    window.addEventListener(
      "compareUpdated",
      loadCompare
    );

    window.addEventListener(
      "storage",
      loadCompare
    );

    return () => {

      window.removeEventListener(
        "compareUpdated",
        loadCompare
      );

      window.removeEventListener(
        "storage",
        loadCompare
      );
    };

  }, []);

  const removeCompare = (item) => {

    const updated = products.filter(
      (p) =>
        (p._id || p.id) !==
        (item._id || item.id)
    );

    localStorage.setItem(
      "compare",
      JSON.stringify(updated)
    );

    window.dispatchEvent(
      new Event("compareUpdated")
    );

    toast.success(
      "Removed from compare ❌"
    );
  };

  return (

    <div className="max-w-7xl mx-auto px-4 py-8">

      {/* HEADER */}

      <div className="mb-8">

        <h2 className="text-4xl font-bold text-[#0B1A3A]">
          Compare Products
        </h2>

        <p className="text-gray-500 mt-2">
          Compare your selected products
        </p>

      </div>

      {/* EMPTY */}

      {products.length === 0 ? (

        <div className="bg-white rounded-2xl shadow-md p-10 text-center">

          <p className="text-gray-500 text-lg">
            No products to compare
          </p>

        </div>

      ) : (

        <div
          className="
          grid grid-cols-2
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          gap-4
        "
        >

          {products.map((item) => {

            return (

              <div
                key={
                  item._id || item.id
                }

                onClick={() =>
                  navigate(
                    `/product/${item._id}`,
                    {
                      state: item,
                    }
                  )
                }

                className="
                group relative
                bg-white rounded-xl
                border border-gray-200
                hover:shadow-lg
                hover:-translate-y-1
                transition-all duration-300
                flex flex-col overflow-hidden
                cursor-pointer
              "
              >

                {/* RIGHT ICONS */}

                <div className="absolute top-3 right-3 flex flex-col gap-2 z-40">

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="p-2 bg-white rounded-full shadow-md"
                  >
                    <FaHeart size={13} />
                  </button>

                  <button
                    onClick={(e) => {

                      e.stopPropagation();

                      navigate(
                        `/product/${item._id}`,
                        {
                          state: item,
                        }
                      );
                    }}

                    className="p-2 bg-white rounded-full shadow-md"
                  >
                    <FaEye size={13} />
                  </button>

                  <button
                    onClick={(e) => {

                      e.stopPropagation();

                      removeCompare(
                        item
                      );
                    }}

                    className="p-2 bg-white rounded-full shadow-md"
                  >
                    <IoGitCompareOutline
                      size={15}
                    />
                  </button>

                </div>

                {/* IMAGE */}

                <div
                  className="
                  h-[180px]
                  bg-white
                  flex items-center
                  justify-center
                  overflow-hidden
                  p-2
                "
                >

                  <img
                    loading="lazy"

                    src={
                      item.images?.[0]
                        ? item.images[0].startsWith(
                            "data:image"
                          )
                          ? item.images[0]
                          : `http://localhost:5000/${item.images[0]}`
                        : "https://dummyimage.com/300x300/cccccc/000000&text=No+Image"
                    }

                    alt={
                      item.name ||
                      item.title
                    }

                    onError={(e) => {

                      e.target.onerror =
                        null;

                      e.target.src =
                        "https://dummyimage.com/300x300/cccccc/000000&text=No+Image";
                    }}

                    className="
                    h-full
                    w-full
                    object-contain
                    transition-transform
                    duration-300
                    group-hover:scale-105
                  "
                  />

                </div>

                {/* CONTENT */}

                <div className="flex flex-col flex-grow p-2.5">

                  {/* CATEGORY */}

                  <p
                    className="
                    text-[11px]
                    uppercase
                    tracking-wide
                    text-gray-400
                    mb-2
                  "
                  >
                    {item.category ||
                      "JEWELLERY"}
                  </p>

                  {/* TITLE */}

                  <h3
                    className="
                    text-[14px]
                    font-semibold
                    text-gray-800
                    line-clamp-2
                    min-h-[40px]
                  "
                  >
                    {item.name ||
                      item.title}
                  </h3>

                  {/* BRAND */}

                  <p className="text-xs text-gray-500 mt-1">

                    {item.brand ||
                      "Vendor Product"}

                  </p>

                  {/* PRICE */}

                  <div className="mt-auto pt-3">

                    <div className="flex items-center gap-2">

                      <span
                        className="
                        font-bold
                        text-black
                        text-xl
                      "
                      >
                        ₹
                        {Number(
                          item.price
                        ).toLocaleString(
                          "en-IN"
                        )}
                      </span>

                    </div>

                  </div>

                  {/* STOCK */}

                  <p
                    className={`text-xs mt-2 font-medium ${
                      (
                        item.countInStock ||
                        item.stock
                      ) > 0
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >

                    {(
                      item.countInStock ||
                      item.stock
                    ) > 0
                      ? `In Stock (${
                          item.countInStock ||
                          item.stock
                        })`
                      : "Out of Stock"}

                  </p>

                  {/* BUTTON */}

                  <button
                    onClick={(e) => {

                      e.stopPropagation();

                      removeCompare(
                        item
                      );
                    }}

                    className="
                    mt-3
                    w-full
                    bg-black
                    text-white
                    py-2
                    rounded-lg
                    hover:bg-gray-800
                    transition
                    text-sm
                    font-medium
                  "
                  >
                    Remove
                  </button>

                </div>

              </div>
            );
          })}

        </div>
      )}
    </div>
  );
};

export default Compare;