import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
 Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const BASE_URL =
  "https://mern-ecommerce-project-rtjp.onrender.com";

const categoryData = {
  Fashion: ["men", "women", "kids"],

  Electronics: [
    "mobiles",
    "laptops",
    "accessories",
  ],

  Bags: ["backpacks", "handbags"],

  Footwear: ["sports", "casual"],

  Groceries: [
    "fresh-fruits",
    "vegetables",
  ],

  Beauty: [
    "skincare",
    "fragrances",
  ],

  Jewellery: ["necklaces", "rings"],
};

const Vendor = () => {
  const currentUser = JSON.parse(
    localStorage.getItem("currentUser")
  );

  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    title: "",
    price: "",
    images: [],
    category: "",
    subCategory: "",
  });

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [editingId, setEditingId] =
    useState(null);

  // FETCH PRODUCTS
  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/products/vendor`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log(error);
      setProducts([]);
    }
  };

  // FETCH ORDERS
  const fetchOrders = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/orders/vendor`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      setOrders(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log(error);
      setOrders([]);
    }
  };

  useEffect(() => {
    if (token) {
      fetchProducts();
      fetchOrders();
    }
  }, [token]);

  // HANDLE INPUT
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // IMAGE UPLOAD
  const handleImageUpload = (files) => {
    const imagePromises = files.map(
      (file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();

          reader.onloadend = () => {
            resolve(reader.result);
          };

          reader.readAsDataURL(file);
        });
      }
    );

    Promise.all(imagePromises).then(
      (images) => {
        setForm((prev) => ({
          ...prev,
          images: [
            ...prev.images,
            ...images,
          ],
        }));
      }
    );
  };

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      handleImageUpload(acceptedFiles);
    }
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    multiple: true,
  });

  // ADD / UPDATE PRODUCT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.title ||
      !form.price ||
      form.images.length === 0 ||
      !form.category ||
      !form.subCategory
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      const productData = {
        name: form.title,
        description: form.subCategory,
        price: Number(form.price),

        category:
          form.category.toLowerCase(),

        subCategory:
          form.subCategory.toLowerCase(),

        images: form.images,

        brand: "Vendor Product",

        countInStock: 10,
      };

      if (editingId) {
        await fetch(
          `${BASE_URL}/api/products/${editingId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type":
                "application/json",

              Authorization: `Bearer ${token}`,
            },

            body: JSON.stringify(
              productData
            ),
          }
        );
      } else {
        await fetch(
          `${BASE_URL}/api/products`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",

              Authorization: `Bearer ${token}`,
            },

            body: JSON.stringify(
              productData
            ),
          }
        );
      }

      fetchProducts();

      setForm({
        title: "",
        price: "",
        images: [],
        category: "",
        subCategory: "",
      });

      setEditingId(null);

      alert(
        "Product Saved Successfully"
      );
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  // DELETE PRODUCT
  const handleDelete = async (id) => {
    try {
      await fetch(
        `${BASE_URL}/api/products/${id}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  // EDIT PRODUCT
  const handleEdit = (product) => {
    setEditingId(product._id);

    setForm({
      title: product.name || "",
      price: product.price || "",
      images: product.images || [],
      category: product.category || "",
      subCategory:
        product.subCategory || "",
    });
  };

  // STATS
  const totalEarnings =
    Array.isArray(orders)
      ? orders.reduce(
          (acc, order) =>
            acc + (order.totalPrice || 0),
          0
        )
      : 0;

  const earningsData =
    Array.isArray(orders)
      ? orders.map((o) => ({
          date: new Date(
            o.createdAt
          ).toLocaleDateString(),

          total: o.totalPrice || 0,
        }))
      : [];

  const orderData = Array.isArray(orders)
    ? orders.map((o) => ({
        date: new Date(
          o.createdAt
        ).toLocaleDateString(),

        count: 1,
      }))
    : [];

  return (
    <div
      className="min-h-screen px-4 py-8"
      style={{
        background:
          "linear-gradient(135deg, #fff7ed 0%, #fdf2f8 35%, #eff6ff 70%, #ffffff 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-gray-800">
            Vendor Dashboard
          </h2>

          <p className="text-gray-500 mt-2">
            Welcome {currentUser?.name}
          </p>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-5 mb-8">
          <div className="bg-white/90 backdrop-blur-xl p-5 rounded-3xl shadow-lg">
            <p className="text-gray-500 text-sm">
              Total Products
            </p>

            <h3 className="text-3xl font-bold mt-2">
              {products.length}
            </h3>
          </div>

          <div className="bg-white/90 backdrop-blur-xl p-5 rounded-3xl shadow-lg">
            <p className="text-gray-500 text-sm">
              Orders
            </p>

            <h3 className="text-3xl font-bold mt-2">
              {orders.length}
            </h3>
          </div>

          <div className="bg-white/90 backdrop-blur-xl p-5 rounded-3xl shadow-lg">
            <p className="text-gray-500 text-sm">
              Earnings
            </p>

            <h3 className="text-3xl font-bold mt-2">
              ₹{totalEarnings}
            </h3>
          </div>
        </div>

        {/* PRODUCT FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/90 backdrop-blur-xl p-6 rounded-3xl shadow-lg mb-8"
        >
          <h3 className="font-semibold text-xl mb-5">
            {editingId
              ? "Edit Product"
              : "Add Product"}
          </h3>

          <input
            type="text"
            name="title"
            placeholder="Product Name"
            className="w-full mb-4 px-4 py-3 rounded-2xl border border-gray-200"
            value={form.title}
            onChange={handleChange}
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            className="w-full mb-4 px-4 py-3 rounded-2xl border border-gray-200"
            value={form.price}
            onChange={handleChange}
          />

          <select
            name="category"
            value={form.category}
            onChange={(e) =>
              setForm({
                ...form,
                category: e.target.value,
                subCategory: "",
              })
            }
            className="w-full mb-4 px-4 py-3 rounded-2xl border border-gray-200"
          >
            <option value="">
              Select Category
            </option>

            {Object.keys(
              categoryData
            ).map((cat) => (
              <option
                key={cat}
                value={cat}
              >
                {cat}
              </option>
            ))}
          </select>

          {form.category && (
            <select
              name="subCategory"
              value={form.subCategory}
              onChange={handleChange}
              className="w-full mb-4 px-4 py-3 rounded-2xl border border-gray-200"
            >
              <option value="">
                Select Sub Category
              </option>

              {categoryData[
                form.category
              ]?.map((sub) => (
                <option
                  key={sub}
                  value={sub}
                >
                  {sub}
                </option>
              ))}
            </select>
          )}

          {/* IMAGE DROPZONE */}
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-3xl p-8 text-center cursor-pointer transition-all
            ${
              isDragActive
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 bg-gray-50"
            }`}
          >
            <input
              {...getInputProps()}
            />

            {form.images.length > 0 ? (
              <div>
                <div className="flex flex-wrap gap-4 justify-center">
                  {form.images.map(
                    (img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt=""
                        className="h-28 w-28 object-cover rounded-2xl shadow-md border"
                      />
                    )
                  )}
                </div>

                <p className="text-sm text-gray-600 mt-4">
                  {
                    form.images.length
                  }{" "}
                  Images Uploaded
                </p>
              </div>
            ) : (
              <div>
                <p className="text-lg font-semibold text-gray-700">
                  Drag & Drop Product
                  Images
                </p>

                <p className="text-sm text-gray-500 mt-2">
                  or click to browse
                </p>
              </div>
            )}
          </div>

          <button className="mt-5 px-6 py-3 rounded-2xl bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 text-white font-semibold">
            {editingId
              ? "Update Product"
              : "Add Product"}
          </button>
        </form>

        {/* PRODUCTS */}
        <div className="grid md:grid-cols-3 gap-5">
          {products.map((p) => (
            <div
              key={p._id}
              className="bg-white/90 backdrop-blur-xl p-4 rounded-3xl shadow-lg"
            >
              <img
                src={
                  p.images?.[0] ||
                  "https://dummyimage.com/400x400/cccccc/000000&text=No+Image"
                }
                alt={p.name}
                className="h-52 w-full object-cover rounded-2xl mb-4"
              />

              <h4 className="font-semibold text-lg">
                {p.name}
              </h4>

              <p className="text-gray-500 mb-1">
                ₹
                {Number(
                  p.price
                ).toLocaleString(
                  "en-IN"
                )}
              </p>

              <p className="text-sm text-gray-400 mb-4 capitalize">
                {p.category} /{" "}
                {p.subCategory}
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() =>
                    handleEdit(p)
                  }
                  className="flex-1 py-2 rounded-xl bg-blue-100 text-blue-700"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    handleDelete(p._id)
                  }
                  className="flex-1 py-2 rounded-xl bg-red-100 text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Vendor;