import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function Admin() {

  const user = JSON.parse(
    localStorage.getItem("currentUser")
  );

  const [loading, setLoading] =
    useState(true);

  const [dashboardData, setDashboardData] =
    useState({
      totalOrders: 0,
      totalRevenue: 0,
      totalProducts: 0,
      totalUsers: 0,
      users: [],
      vendors: [],
      products: [],
      recentOrders: [],
      monthlySales: [],
      orderStatus: [],
    });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/admin/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data =
        await response.json();

      console.log(data);

      setDashboardData(data);

      setLoading(false);

    } catch (error) {

      console.log(error);

    }
  };

  const deleteUserHandler = async (
    id
  ) => {

    const token =
      localStorage.getItem("token");

    await fetch(
      `http://localhost:5000/api/admin/user/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchDashboard();
  };

  const approveVendorHandler = async (
    id
  ) => {

    const token =
  localStorage.getItem("token");

const response = await fetch(
  `http://localhost:5000/api/admin/vendor/approve/${id}`,
  {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }
);

const updatedVendor =
  await response.json();

console.log(updatedVendor);

setDashboardData((prev) => ({
  ...prev,
  vendors: prev.vendors.map((vendor) =>
    vendor._id === id
      ? {
          ...vendor,
          isApproved: true,
        }
      : vendor
  ),
}));
      
  };

  const stats = [
    {
      title: "Orders",
      value: dashboardData.totalOrders,
      icon: "📦",
    },
    {
      title: "Revenue",
      value: `₹${Number(
        dashboardData.totalRevenue
      ).toFixed(2)}`,
      icon: "💰",
    },
    {
      title: "Products",
      value: dashboardData.totalProducts,
      icon: "🛍️",
    },
    {
      title: "Users",
      value: dashboardData.totalUsers,
      icon: "👥",
    },
  ];

  const COLORS = [
    "#22c55e",
    "#facc15",
    "#ef4444",
  ];

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-3xl font-bold">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">

      {/* HEADER */}

      <div className="bg-gray-900 text-white px-8 py-6 flex justify-between items-center">

        <div>

          <h1 className="text-4xl font-bold text-yellow-400">
            Admin Panel
          </h1>

          <p className="mt-2 text-gray-300">
            Welcome {user?.name}
          </p>

        </div>

        <button
          onClick={() => {

            localStorage.removeItem(
              "token"
            );

            localStorage.removeItem(
              "currentUser"
            );

            window.location.href =
              "/login";

          }}
          className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-lg"
        >
          Logout
        </button>

      </div>

      <div className="p-8">

        {/* STATS */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

          {stats.map((item, index) => (

            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-6"
            >

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-gray-500">
                    {item.title}
                  </p>

                  <h2 className="text-3xl xl:text-4xl font-bold mt-2 break-words">
                    {item.value}
                  </h2>

                </div>

                <span className="text-5xl">
                  {item.icon}
                </span>

              </div>

            </div>

          ))}

        </div>

        {/* CHARTS */}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-10">

          {/* BAR CHART */}

          <div className="bg-white rounded-2xl shadow-md p-6 min-h-[400px]">

            <h2 className="text-2xl font-bold mb-5">
              Monthly Sales
            </h2>

            <ResponsiveContainer
              width="100%"
              height={300}
            >

              <BarChart
                data={
                  dashboardData.monthlySales
                }
              >

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="sales"
                  fill="#facc15"
                  radius={[10, 10, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

          {/* PIE CHART */}

          <div className="bg-white rounded-2xl shadow-md p-6 min-h-[400px]">

            <h2 className="text-2xl font-bold mb-5 text-center">
              Order Status
            </h2>

            <ResponsiveContainer
              width="100%"
              height={300}
            >

              <PieChart>

                <Pie
                  data={
                    dashboardData.orderStatus
                  }
                  dataKey="value"
                  outerRadius={120}
                  label
                >

                  {dashboardData.orderStatus?.map(
                    (entry, index) => (

                      <Cell
                        key={index}
                        fill={
                          COLORS[
                            index %
                              COLORS.length
                          ]
                        }
                      />

                    )
                  )}

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* USERS */}

        <div className="bg-white rounded-2xl shadow-md p-6 mb-10 overflow-x-auto">

          <h2 className="text-3xl font-bold mb-6">
            Users
          </h2>

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="py-3 text-left">
                  Name
                </th>

                <th className="text-left">
                  Email
                </th>

                <th className="text-left">
                  Role
                </th>

                <th className="text-left">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {dashboardData.users
                ?.filter(
                  (user) =>
                    user.role === "user"
                )
                .map((user) => (

                  <tr
                    key={user._id}
                    className="border-b"
                  >

                    <td className="py-4">
                      {user.name}
                    </td>

                    <td>
                      {user.email}
                    </td>

                    <td>

                      <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                        {user.role}
                      </span>

                    </td>

                    <td>

                      <button
                        onClick={() =>
                          deleteUserHandler(
                            user._id
                          )
                        }
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))}

            </tbody>

          </table>

        </div>

        {/* VENDORS */}

        <div className="bg-white rounded-2xl shadow-md p-6 mb-10 overflow-x-auto">

          <h2 className="text-3xl font-bold mb-6">
            Vendors
          </h2>

          <table className="w-full">

            <thead>
  <tr className="border-b">

    <th className="py-3 text-left">
      Name
    </th>

    <th className="text-left">
      Email
    </th>

    <th className="text-left">
      Store
    </th>

    <th className="text-left">
      Actions
    </th>
    <th className="text-left">
  Status
</th>

  </tr>
</thead>
            <tbody>
  {dashboardData.vendors?.map((vendor) => {

  console.log(vendor);

   return (

      <tr
        key={vendor._id}
        className="border-b"
      >

        <td className="py-4">
          {vendor.name}
        </td>

        <td>
          {vendor.email}
        </td>

        <td>
          {vendor.storeName ||
            "No Store"}
        </td>

        <td className="flex gap-3 py-4">

  {!vendor.isApproved && (
    <button
      onClick={() =>
        approveVendorHandler(
          vendor._id
        )
      }
      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
    >
      Approve
    </button>
  )}

  <button
    onClick={() =>
      deleteUserHandler(
        vendor._id
      )
    }
    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
  >
    Delete
  </button>

</td>

<td>

  {vendor.isApproved ? (

    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
      Approved
    </span>

  ) : (

    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
      Pending
    </span>

  )}

</td>

      </tr>

    );
})}
</tbody>

          </table>

        </div>

        {/* PRODUCTS */}

        <div className="bg-white rounded-2xl shadow-md p-6 mb-10 overflow-x-auto">

          <h2 className="text-3xl font-bold mb-6">
            Products
          </h2>

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="py-3 text-left">
                  Product
                </th>

                <th className="text-left">
                  Price
                </th>

                <th className="text-left">
                  Vendor
                </th>

                <th className="text-left">
                  Stock
                </th>

              </tr>

            </thead>

            <tbody>

              {dashboardData.products?.map(
                (product) => (

                  <tr
                    key={product._id}
                    className="border-b"
                  >

                    <td className="py-4">
                      {product.name}
                    </td>

                    <td>
                      ₹{product.price}
                    </td>

                    <td>
                      {
                        product?.vendor
                          ?.name
                      }
                    </td>

                    <td>
                      {
                        product.countInStock
                      }
                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

        {/* ORDERS */}

        <div className="bg-white rounded-2xl shadow-md p-6 overflow-x-auto">

          <h2 className="text-3xl font-bold mb-6">
            Recent Orders
          </h2>

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="py-3 text-left">
                  Customer
                </th>

                <th className="text-left">
                  Amount
                </th>

                <th className="text-left">
                  Status
                </th>

                <th className="text-left">
                  Date
                </th>

              </tr>

            </thead>

            <tbody>

              {dashboardData.recentOrders?.map(
                (order) => (

                  <tr
                    key={order._id}
                    className="border-b"
                  >

                    <td className="py-4">

                      {order
                        ?.shippingAddress
                        ?.fullName ||
                        order?.user?.name}

                    </td>

                    <td>

                      ₹
                      {Number(
                        order.totalPrice
                      ).toFixed(2)}

                    </td>

                    <td>

                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                        {order.status}
                      </span>

                    </td>

                    <td>

                      {new Date(
                        order.createdAt
                      ).toLocaleDateString()}
                      </td>
                  </tr>
                      )
  )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
     );
}   