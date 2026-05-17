import React, { useState } from "react";
import {
  FaSearch,
  FaBoxOpen,
  FaTruck,
  FaCheckCircle,
  FaClock,
  FaCog,
} from "react-icons/fa";

const BASE_URL =
  "https://mern-ecommerce-project-rtjp.onrender.com";

const Track = () => {
  const [orderId, setOrderId] =
    useState("");

  const [order, setOrder] =
    useState(null);

  const [error, setError] =
    useState("");

  const handleTrack = async () => {
    try {
      setError("");
      setOrder(null);

      const token =
        localStorage.getItem("token");

      if (!token) {
        setError("Please login first");
        return;
      }

      const response = await fetch(
        `${BASE_URL}/api/orders/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        setError(
          data.message ||
            "Order not found"
        );
        return;
      }

      if (data && data._id) {
        setOrder(data);
      } else {
        setError("No order found");
      }

    } catch (err) {
      console.log(err);

      setError(
        "Something went wrong"
      );
    }
  };

  const getStep = () => {
    if (!order) return 1;

    switch (order.status) {
      case "Pending":
        return 1;

      case "Processing":
        return 2;

      case "Shipped":
        return 3;

      case "Delivered":
        return 4;

      default:
        return 1;
    }
  };

  const currentStep = getStep();

  const steps = [
    {
      label: "Pending",
      icon: <FaClock />,
    },
    {
      label: "Processing",
      icon: <FaCog />,
    },
    {
      label: "Shipped",
      icon: <FaTruck />,
    },
    {
      label: "Delivered",
      icon: <FaCheckCircle />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] py-10">
      <div className="max-w-6xl mx-auto px-4 md:px-6">

        {/* HERO */}

        <div className="bg-gradient-to-r from-[#0f172a] to-[#1e293b] rounded-3xl p-8 md:p-12 text-white mb-10 relative overflow-hidden">

          <div className="relative z-10">

            <p className="uppercase tracking-[3px] text-sm text-yellow-400 mb-3">
              ORDER TRACKING
            </p>

            <h1 className="text-3xl md:text-5xl font-bold">
              Track Your Order
            </h1>

            <p className="text-gray-300 mt-4 max-w-2xl">
              Enter your order ID below to view
              real-time delivery updates and order details.
            </p>

            <div className="mt-8 max-w-2xl flex flex-col sm:flex-row gap-4">

              <div className="relative flex-1">

                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type="text"
                  placeholder="Enter Order ID"
                  value={orderId}
                  onChange={(e) =>
                    setOrderId(e.target.value)
                  }
                  className="w-full pl-12 pr-4 py-4 rounded-xl text-black outline-none border border-transparent focus:border-yellow-400"
                />

              </div>

              <button
                onClick={handleTrack}
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-4 rounded-xl transition"
              >
                Track Order
              </button>

            </div>

            {error && (
              <div className="mt-5 bg-red-500/10 border border-red-500/20 text-red-200 px-5 py-4 rounded-xl max-w-2xl">
                {error}
              </div>
            )}

          </div>

          <div className="absolute -right-16 -top-16 w-72 h-72 bg-yellow-400/10 rounded-full"></div>

          <div className="absolute right-20 bottom-0 w-52 h-52 bg-white/5 rounded-full"></div>

        </div>

        {/* ORDER DETAILS */}

        {order && (
          <div className="bg-white rounded-3xl shadow-sm border overflow-hidden">

            {/* HEADER */}

            <div className="p-6 md:p-8 border-b bg-gray-50">

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                <div>

                  <p className="text-sm text-gray-500">
                    ORDER ID
                  </p>

                  <h2 className="text-2xl font-bold text-[#0f172a] mt-1 break-all">
                    {order._id}
                  </h2>

                </div>

                <div
                  className={`px-5 py-2 rounded-full text-sm font-semibold w-fit ${
                    order.status ===
                    "Delivered"
                      ? "bg-green-100 text-green-600"
                      : order.status ===
                        "Shipped"
                      ? "bg-blue-100 text-blue-600"
                      : order.status ===
                        "Processing"
                      ? "bg-purple-100 text-purple-600"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.status}
                </div>

              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">

                <div className="bg-white rounded-2xl border p-5">

                  <p className="text-sm text-gray-500">
                    Order Date
                  </p>

                  <p className="font-semibold text-[#0f172a] mt-1">
                    {new Date(
                      order.createdAt
                    ).toLocaleString()}
                  </p>

                </div>

                <div className="bg-white rounded-2xl border p-5">

                  <p className="text-sm text-gray-500">
                    Total Amount
                  </p>

                  <p className="font-semibold text-[#0f172a] mt-1">
                    ₹
                    {Number(
                      order.totalPrice
                    ).toFixed(2)}
                  </p>

                </div>

                <div className="bg-white rounded-2xl border p-5">

                  <p className="text-sm text-gray-500">
                    Items
                  </p>

                  <p className="font-semibold text-[#0f172a] mt-1">
                    {order.items?.length} Product(s)
                  </p>

                </div>

              </div>

            </div>

            {/* TRACKER */}

            <div className="p-6 md:p-10">

              <h3 className="text-xl font-bold text-[#0f172a] mb-10">
                Shipment Progress
              </h3>

              <div className="relative">

                <div className="absolute top-6 left-0 w-full h-1 bg-gray-200 rounded-full"></div>

                <div
                  className="absolute top-6 left-0 h-1 bg-black rounded-full transition-all duration-500"
                  style={{
                    width: `${
                      ((currentStep - 1) / 3) *
                      100
                    }%`,
                  }}
                ></div>

                <div className="grid grid-cols-4 relative z-10">

                  {steps.map(
                    (step, index) => {

                      const active =
                        currentStep >=
                        index + 1;

                      return (
                        <div
                          key={step.label}
                          className="flex flex-col items-center"
                        >

                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center text-lg transition ${
                              active
                                ? "bg-black text-white"
                                : "bg-gray-200 text-gray-500"
                            }`}
                          >
                            {step.icon}
                          </div>

                          <p
                            className={`mt-4 font-medium text-sm ${
                              active
                                ? "text-black"
                                : "text-gray-400"
                            }`}
                          >
                            {step.label}
                          </p>

                        </div>
                      );
                    }
                  )}

                </div>

              </div>

            </div>

            {/* ORDER ITEMS */}

            <div className="border-t p-6 md:p-8">

              <div className="flex items-center gap-3 mb-6">

                <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center">
                  <FaBoxOpen className="text-[#0f172a]" />
                </div>

                <div>

                  <h3 className="font-bold text-lg text-[#0f172a]">
                    Ordered Items
                  </h3>

                  <p className="text-sm text-gray-500">
                    Products included in this order
                  </p>

                </div>

              </div>

              <div className="space-y-4">

                {order.items?.map(
                  (item, index) => (

                    <div
                      key={index}
                      className="flex items-center justify-between border rounded-2xl p-4 hover:shadow-md transition"
                    >

                      <div className="flex items-center gap-4">

                        <div className="w-16 h-16 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center">

                          <img
                            src={
                              item.image?.startsWith(
                                "http"
                              )
                                ? item.image
                                : `${BASE_URL}/${item.image}`
                            }
                            alt={item.name}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              e.target.onerror =
                                null;

                              e.target.src =
                                "https://dummyimage.com/80x80/cccccc/000000&text=No+Image";
                            }}
                          />

                        </div>

                        <div>

                          <h4 className="font-semibold text-[#0f172a]">
                            {item.name}
                          </h4>

                          <p className="text-sm text-gray-500 mt-1">
                            Quantity:{" "}
                            {item.qty ||
                              item.quantity}
                          </p>

                        </div>

                      </div>

                      <div className="font-bold text-[#0f172a]">

                        ₹
                        {(
                          Number(
                            item.price
                          ) *
                          Number(
                            item.qty ||
                              item.quantity
                          )
                        ).toFixed(2)}

                      </div>

                    </div>
                  )
                )}

              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default Track;