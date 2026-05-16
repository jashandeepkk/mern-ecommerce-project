import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../components/context/CartContext";

const Cart = () => {

  const navigate = useNavigate();

  const {
    cart,
    removeFromCart,
    updateQty,
    totalPrice,
  } = useCart();

  const totalItems = cart.reduce(
    (acc, item) =>
      acc + Number(item.qty || 1),
    0
  );

  return (
    <div className="max-w-7xl mx-auto p-5">

      <h2 className="text-3xl font-bold mb-6">
        Shopping Cart
      </h2>

      {cart.length === 0 ? (

        <div className="text-center mt-20">

          <p className="text-xl text-gray-500">
            Your cart is empty 🛒
          </p>

          <button
            onClick={() => navigate("/")}
            className="mt-5 px-6 py-3 bg-black text-white rounded-lg"
          >
            Continue Shopping
          </button>

        </div>

      ) : (

        <div className="flex flex-col lg:flex-row gap-6">

          {/* LEFT */}
          <div className="flex-1 space-y-4">

            {cart.map((item) => (

              <div
                key={item.productId}
                className="flex flex-col sm:flex-row items-center gap-4 border rounded-2xl p-4 shadow-sm bg-white"
              >

                {/* IMAGE */}
                <img
                  src={
                    item.image
                      ? item.image.startsWith(
                          "data:image"
                        )
                        ? item.image
                        : `http://localhost:5000/${item.image}`
                      : "https://dummyimage.com/300x300/cccccc/000000&text=No+Image"
                  }
                  alt={item.title}
                  onError={(e) => {
                    e.target.src =
                      "https://dummyimage.com/300x300/cccccc/000000&text=No+Image";
                  }}
                  className="w-24 h-24 object-cover rounded-xl"
                />

                {/* DETAILS */}
                <div className="flex-1 w-full">

                  <h3 className="font-semibold text-lg">
                    {item.title}
                  </h3>

                  <p className="text-gray-500 mt-1">
                    ₹
                    {Number(
                      item.price || 0
                    ).toLocaleString("en-IN")}
                  </p>

                  {/* QTY */}
                  <div className="flex items-center gap-3 mt-3">

                    <button
                      onClick={() =>
                        updateQty(
                          item.productId,
                          "dec"
                        )
                      }
                      className="w-8 h-8 border rounded-lg hover:bg-gray-100"
                    >
                      -
                    </button>

                    <span className="font-medium">
                      {item.qty || 1}
                    </span>

                    <button
                      onClick={() =>
                        updateQty(
                          item.productId,
                          "inc"
                        )
                      }
                      className="w-8 h-8 border rounded-lg hover:bg-gray-100"
                    >
                      +
                    </button>

                  </div>

                </div>

                {/* PRICE */}
                <div className="text-right">

                  <p className="font-bold text-lg">
                    ₹
                    {(
                      Number(item.price || 0) *
                      Number(item.qty || 1)
                    ).toLocaleString("en-IN")}
                  </p>

                  <button
                    onClick={() =>
                      removeFromCart(
                        item.productId
                      )
                    }
                    className="text-red-500 text-sm mt-2 hover:underline"
                  >
                    Remove
                  </button>

                </div>

              </div>

            ))}

          </div>

          {/* RIGHT */}
          <div className="w-full lg:w-[320px]">

            <div className="border rounded-2xl p-5 shadow-sm bg-white sticky top-5">

              <h3 className="text-xl font-semibold mb-5">
                Order Summary
              </h3>

              <div className="flex justify-between mb-3">
                <span>Total Items</span>
                <span>{totalItems}</span>
              </div>

              <div className="flex justify-between mb-3">
                <span>Shipping</span>
                <span>Free</span>
              </div>

              <div className="border-t pt-4 mt-4 flex justify-between font-bold text-lg">

                <span>Total</span>

                <span>
                  ₹
                  {Number(
                    totalPrice || 0
                  ).toLocaleString("en-IN")}
                </span>

              </div>

              <button
                type="button"
                onClick={() =>
                  navigate("/checkout")
                }
                className="mt-6 w-full bg-black hover:bg-gray-800 text-white py-3 rounded-xl transition"
              >
                Proceed To Checkout
              </button>

            </div>

          </div>

        </div>

      )}
    </div>
  );
};

export default Cart;