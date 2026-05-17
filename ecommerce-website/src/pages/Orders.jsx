import React, {
  useEffect,
  useState,
} from "react";

const Orders = () => {

  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const fetchOrders = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response = await fetch(
       "https://mern-ecommerce-project-rtjp.onrender.com/api/orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data =
        await response.json();

      if (data.success) {
        setOrders(data.orders);
      }

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {

    fetchOrders();

    const interval =
      setInterval(() => {
        fetchOrders();
      }, 5000);

    return () =>
      clearInterval(interval);

  }, []);

  const steps = [
    "Pending",
    "Processing",
    "Shipped",
    "Delivered",
  ];

  const getStep = (status) => {

    switch (status) {

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

  if (loading) {

    return (
      <div className="text-center py-20 text-lg font-semibold">
        Loading orders...
      </div>
    );
  }

  return (

    <div className="max-w-6xl mx-auto px-4 py-6">

      {/* PAGE TITLE */}

      <h2 className="text-4xl font-bold text-[#0B1A3A]">
        My Orders
      </h2>

      <p className="text-gray-500 mt-2 mb-8 text-base">
        Track all your recent purchases
      </p>

      {orders.length === 0 ? (

        <div className="bg-white rounded-2xl shadow-md p-10 text-center">

          <p className="text-gray-500 text-lg">
            No orders yet
          </p>

        </div>

      ) : (

        <div className="space-y-5">

          {orders.map((order) => {

            const currentStep =
              getStep(order.status);

            return (

              <div
                key={order._id}
                className="
                bg-white rounded-2xl
                border border-gray-200
                shadow-sm hover:shadow-lg
                transition-all duration-300
                p-5
              "
              >

                {/* HEADER */}

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                  <div>

                    <p className="text-sm text-gray-500">

                      {new Date(
                        order.createdAt
                      ).toLocaleString()}

                    </p>

                    <p className="text-sm mt-1 text-gray-700">

                      Order ID:

                      <span className="font-semibold ml-2">

                        {order._id}

                      </span>

                    </p>

                  </div>

                  <span
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold w-fit ${
                      order.status ===
                      "Delivered"
                        ? "bg-green-100 text-green-700"
                        : order.status ===
                          "Shipped"
                        ? "bg-blue-100 text-blue-700"
                        : order.status ===
                          "Processing"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >

                    {order.status}

                  </span>

                </div>

                {/* TRACKER */}

                <div className="mt-8 mb-8 px-2">

                  <div className="relative flex items-center justify-between">

                    {/* BACKGROUND LINE */}

                    <div className="absolute top-5 left-0 w-full h-[4px] bg-gray-200 rounded-full"></div>

                    {/* ACTIVE LINE */}

                    <div
                      className="absolute top-5 left-0 h-[4px] bg-indigo-500 rounded-full transition-all duration-700"
                      style={{
                        width:
                          currentStep === 1
                            ? "0%"
                            : currentStep === 2
                            ? "33%"
                            : currentStep === 3
                            ? "66%"
                            : "100%",
                      }}
                    ></div>

                    {steps.map(
                      (step, index) => {

                        const active =
                          index + 1 <=
                          currentStep;

                        return (

                          <div
                            key={step}
                            className="relative z-10 flex flex-col items-center flex-1"
                          >

                            {/* STEP CIRCLE */}

                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-[4px] transition-all duration-500 ${
                                active
                                  ? "bg-indigo-500 border-indigo-500 text-white shadow-lg shadow-indigo-200"
                                  : "bg-white border-gray-300 text-gray-400"
                              }`}
                            >

                              {index + 1}

                            </div>

                            {/* STEP LABEL */}

                            <p
                              className={`mt-3 text-sm font-semibold ${
                                active
                                  ? "text-[#0B1A3A]"
                                  : "text-gray-400"
                              }`}
                            >

                              {step}

                            </p>

                          </div>
                        );
                      }
                    )}

                  </div>

                </div>

                {/* ITEMS */}

                <div className="space-y-4">

                  {order.items?.map(
                    (item, index) => (

                      <div
                        key={index}
                        className="flex items-center justify-between border-b border-gray-100 pb-4"
                      >

                        {/* LEFT */}

                        <div className="flex items-center gap-4">

                          <img
                            loading="lazy"

                            src={
                              item.product
                                ?.images?.[0] ||
                              item.image ||
                              "https://dummyimage.com/80x80/cccccc/000000&text=No+Image"
                            }

                            alt={
                              item.product
                                ?.name ||
                              item.name
                            }

                            onError={(e) => {

                              e.target.src =
                                "https://dummyimage.com/80x80/cccccc/000000&text=No+Image";
                            }}

                            className="
                            w-16 h-16
                            rounded-xl
                            object-contain
                            border border-gray-200
                            bg-white
                            p-1
                          "
                          />

                          <div>

                            <p className="font-semibold text-[14px] text-[#0B1A3A] leading-6 max-w-[700px]">

                              {item.product
                                ?.name ||
                                item.name}

                            </p>

                            <p className="text-gray-500 text-sm mt-1">

                              Quantity:{" "}
                              {item.qty ||
                                item.quantity}

                            </p>

                          </div>

                        </div>

                        {/* PRICE */}

                        <div className="text-xl font-bold text-[#0B1A3A] whitespace-nowrap">

                          ₹
                          {Number(
                            item.price *
                              (item.qty ||
                                item.quantity)
                          ).toLocaleString(
                            "en-IN"
                          )}

                        </div>

                      </div>
                    )
                  )}

                </div>

                {/* TOTAL */}

                <div className="flex justify-end mt-5">

                  <div
                    className="
                    bg-gray-50
                    border border-gray-200
                    rounded-xl
                    px-4 py-3
                    text-right
                    min-w-[150px]
                  "
                  >

                    <p className="text-gray-500 text-xs">

                      Total Amount

                    </p>

                    <h3 className="text-xl font-bold text-[#0B1A3A] mt-1">

                      ₹
                      {Number(
                        order.totalPrice
                      ).toLocaleString(
                        "en-IN"
                      )}

                    </h3>

                  </div>

                </div>

              </div>
            );
          })}

        </div>
      )}
    </div>
  );
};

export default Orders;