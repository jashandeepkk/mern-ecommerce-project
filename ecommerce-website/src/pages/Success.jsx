import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();
  const orderId = localStorage.getItem("latestOrderId");

  return (
    <div className="h-screen flex flex-col justify-center items-center">

    <h2 className="text-3xl font-bold text-green-600 mb-4">
  🎉 Order Placed Successfully!
</h2>

<p className="text-gray-500 mb-2">
  Thank you for your purchase
</p>

<p className="text-sm text-gray-700 mb-6">
  Order ID:
  <span className="font-semibold ml-1">
    {orderId}
  </span>
</p>

<button
  onClick={() => navigate("/")}
  className="bg-black text-white px-6 py-2 rounded"
>
  Continue Shopping
</button>
    </div>
  );
};

export default Success;