import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [cart, setCart] = useState([]);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });
const [paymentMethod, setPaymentMethod] =
  useState("COD");
  const navigate = useNavigate();

useEffect(() => {

  const fetchCart = async () => {

    try {

      const token =
        localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch(
       "https://mern-ecommerce-project-rtjp.onrender.com/api/cart",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data =
        await response.json();

      console.log(
        "CART DATA:",
        data
      );

      if (
        data.items &&
        data.items.length > 0
      ) {
        setCart(data.items);
      } else {
        setCart([]);
      }

    } catch (error) {

      console.log(error);

    }
  };

  fetchCart();

}, [navigate]);

  const total = cart.reduce(
  (acc, item) =>
    acc +
    Number(item.price || 0) *
      Number(item.qty || 1),
  0
);

  const discount = total * 0.1;

  const finalTotal =
    total - discount;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };
const handleOnlinePayment = async () => {
  try {
    if (cart.length === 0) {
  return alert("Cart is empty");
}
    if (
      !form.name ||
      !form.phone ||
      !form.address ||
      !form.city ||
      !form.pincode
    ) {
      return alert("Please fill all fields");
    }

    const token = localStorage.getItem("token");
console.log("FINAL TOTAL:", finalTotal);
console.log("RAZORPAY AMOUNT:", finalTotal * 100);
   // 1. Create Razorpay order from backend
const res = await fetch(
  "https://mern-ecommerce-project-rtjp.onrender.com/api/payments/create-order",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
   
 body: JSON.stringify({
  amount: Math.round(finalTotal * 100)
}),
}),
  

    const orderData = await res.json();

    if (!res.ok) {
      return alert(orderData.message || "Failed to create payment order");
    }

    // 2. Razorpay options
    const options = {
      key: "rzp_test_SttRhgeNwpCSZL",
      amount: orderData.amount,
      currency: orderData.currency,
      name: "MERN Ecommerce Project",
      order_id: orderData.id,

      handler: async function (response) {
        try {
          // 3. Save order AFTER payment success
          const orderPayload = {
            orderItems: cart.map((item) => ({
              product: item.productId,
              name: item.title,
              image: item.image,
              price: Number(item.price),
              qty: Number(item.qty),
            })),
            shippingAddress: {
              fullName: form.name,
              phone: form.phone,
              address: form.address,
              city: form.city,
              pincode: form.pincode,
            },
            totalPrice: Number(finalTotal),
            paymentMethod: "Razorpay",
            paymentResult: {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              status: "Paid",
            },
          };

          const orderRes = await fetch(
            "https://mern-ecommerce-project-rtjp.onrender.com/api/orders",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(orderPayload),
            }
          );

          const order = await orderRes.json();

          localStorage.setItem("latestOrderId", order._id);

          // 4. Clear cart
          await fetch(
            "https://mern-ecommerce-project-rtjp.onrender.com/api/cart/clear",
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          alert("Payment Successful");
          navigate("/success");
        } catch (err) {
          console.log(err);
          alert("Order saving failed");
        }
      },

      prefill: {
        name: form.name,
        contact: form.phone,
      },

      theme: {
        color: "#000000",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  } catch (error) {
    console.log(error);
    alert("Payment Failed");
  }
};
  const handleOrder = async () => {
    if (
      !form.name ||
      !form.phone ||
      !form.address ||
      !form.city ||
      !form.pincode
    ) {
      alert(
        "Please fill all fields"
      );
      return;
    }
    if (
      !/^[0-9]{10}$/.test(
        form.phone
      )
    ) {
      alert(
        "Enter valid 10-digit phone"
      );
      return;
    }
    if (
      !/^[0-9]{6}$/.test(
        form.pincode
      )
    ) {
      alert(
        "Enter valid pincode"
      );
      return;
    }
    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    try {
      const token =
        localStorage.getItem(
          "token"
        );

      const orderData = {
        orderItems: cart.map(
  (item) => ({
    product: item.productId,

    name: item.title,

    image: item.image,

    price: Number(item.price),

    qty: Number(item.qty),

    vendor: null,
  })
),
        shippingAddress: {
          fullName: form.name,
          phone: form.phone,
          address:
            form.address,
          city: form.city,
          pincode:
            form.pincode,
        },

        totalPrice: Number(
          finalTotal
        ),

        paymentMethod:
          "Cash on Delivery",
      };

      const response = await fetch(
        "https://mern-ecommerce-project-rtjp.onrender.com/api/orders",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          body: JSON.stringify(
            orderData
          ),
        }
      );

      const data =
        await response.json();

      
      if (!response.ok) {
        alert(
          data.message ||
            "Order failed"
        );
        return;
      }

      localStorage.setItem(
        "latestOrderId",
        data._id
      );

      await fetch(
       "https://mern-ecommerce-project-rtjp.onrender.com/api/cart/clear",
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/success");
    } catch (error) {
      console.log(error);

      alert(
        "Something went wrong"
      );
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">
        Checkout
      </h2>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">
            Shipping Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="name"
              placeholder="Full Name"
              className="border p-2 rounded"
              onChange={
                handleChange
              }
            />

            <input
              name="phone"
              placeholder="Phone Number"
              className="border p-2 rounded"
              onChange={
                handleChange
              }
            />

            <input
              name="city"
              placeholder="City"
              className="border p-2 rounded"
              onChange={
                handleChange
              }
            />

            <input
              name="pincode"
              placeholder="Pincode"
              className="border p-2 rounded"
              onChange={
                handleChange
              }
            />
          </div>

          <textarea
            name="address"
            placeholder="Full Address"
            className="border p-2 rounded w-full mt-4"
            rows="4"
            onChange={handleChange}
          />

          <div className="mt-4">
  <h4 className="font-medium mb-2">
    Payment Method
  </h4>

  <label className="flex items-center gap-2">
    <input
      type="radio"
      name="payment"
      checked={paymentMethod === "COD"}
      onChange={() =>
        setPaymentMethod("COD")
      }
    />

    Cash on Delivery
  </label>

  <label className="flex items-center gap-2 mt-2">
    <input
      type="radio"
      name="payment"
      checked={
        paymentMethod === "ONLINE"
      }
      onChange={() =>
        setPaymentMethod("ONLINE")
      }
    />

    Razorpay / UPI / Card
  </label>
</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border h-fit">
          <h3 className="font-semibold mb-4">
            Order Summary
          </h3>

          <div className="space-y-3 max-h-[250px] overflow-y-auto">
            {cart.map((item) => (
  <div
    key={item.productId}
    className="flex justify-between text-sm"
  >
    <span>
      {item.title} × {item.qty}
    </span>

    <span>
      ₹
      {(
        Number(item.price || 0) *
        Number(item.qty || 1)
      ).toFixed(2)}
    </span>
  </div>
))}
          </div>

          <hr className="my-4" />

          <div className="flex justify-between text-sm">
            <span>Subtotal</span>

            <span>
              ₹
              {total.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between text-sm text-green-600">
            <span>
              Discount (10%)
            </span>

            <span>
              -₹
              {discount.toFixed(
                2
              )}
            </span>
          </div>

          <div className="flex justify-between font-semibold text-lg mt-2">
            <span>Total</span>

            <span>
              ₹
              {finalTotal.toFixed(
                2
              )}
            </span>
          </div>

         <button
  type="button"
  onClick={() => {
    if (
      paymentMethod === "ONLINE"
    ) {
      handleOnlinePayment();
    } else {
      handleOrder();
    }
  }}
  className="mt-5 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800"
>
  {paymentMethod === "ONLINE"
    ? "Pay Now"
    : "Place Order"}
</button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;