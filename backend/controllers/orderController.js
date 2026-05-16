import Order from "../models/Order.js";

/* ================= CREATE ORDER ================= */

export const createOrder = async (
  req,
  res
) => {
  try {
    const {
      orderItems,
      totalPrice,
      shippingAddress,
    } = req.body;

    if (
      !orderItems ||
      orderItems.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "No order items",
      });
    }

    const order = await Order.create({
      user: req.user?.id,

      items: orderItems.map((item) => ({
        product:
          item.product?._id ||
          item.product ||
          item._id,

        name:
          item.name ||
          item.product?.name ||
          "",

        image:
          item.images?.[0] ||
          item.image ||
          "",

        quantity:
          item.quantity ||
          item.qty ||
          1,

        price:
          item.price || 0,

        vendor:
          item.vendor?._id ||
          item.vendor ||
          null,
      })),

      totalPrice,

      shippingAddress,

      status: "Pending",
    });

    /* AUTO STATUS UPDATE */

    setTimeout(async () => {
      await Order.findByIdAndUpdate(
        order._id,
        {
          status: "Processing",
        }
      );
    }, 30000);

    setTimeout(async () => {
      await Order.findByIdAndUpdate(
        order._id,
        {
          status: "Shipped",
        }
      );
    }, 60000);

    setTimeout(async () => {
      await Order.findByIdAndUpdate(
        order._id,
        {
          status: "Delivered",
        }
      );
    }, 90000);

    res.status(201).json({
      success: true,
      message:
        "Order placed successfully",
      order,
    });

  } catch (error) {

    console.log(
      "CREATE ORDER ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= GET ALL ORDERS ================= */

export const getOrders = async (
  req,
  res
) => {
  try {

    const orders = await Order.find()
      .populate("user", "name email")
      .populate(
        "items.product",
        "name title image thumbnail images"
      )
      .populate(
        "items.vendor",
        "name email storeName"
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });

  } catch (error) {

    console.log(
      "GET ORDERS ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= VENDOR ORDERS ================= */

export const getVendorOrders = async (
  req,
  res
) => {
  try {

    const orders = await Order.find({
      "items.vendor": req.user._id,
    })
      .populate("user", "name email")
      .populate(
        "items.product",
        "name title image thumbnail images"
      )
      .populate(
        "items.vendor",
        "name email storeName"
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });

  } catch (error) {

    console.log(
      "GET VENDOR ORDERS ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= GET SINGLE ORDER ================= */

export const getSingleOrder = async (
  req,
  res
) => {
  try {

    const order = await Order.findById(
      req.params.id
    )
      .populate("user", "name email")
      .populate(
        "items.product",
        "name title image thumbnail images"
      )
      .populate(
        "items.vendor",
        "name email storeName"
      );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });

  } catch (error) {

    console.log(
      "GET SINGLE ORDER ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= UPDATE ORDER STATUS ================= */

export const updateOrderStatus = async (
  req,
  res
) => {
  try {

    const order = await Order.findById(
      req.params.id
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.status =
      req.body.status || order.status;

    const updatedOrder =
      await order.save();

    res.status(200).json({
      success: true,
      message:
        "Order updated successfully",
      order: updatedOrder,
    });

  } catch (error) {

    console.log(
      "UPDATE ORDER ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= DELETE ORDER ================= */

export const deleteOrder = async (
  req,
  res
) => {
  try {

    const order = await Order.findById(
      req.params.id
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    await order.deleteOne();

    res.status(200).json({
      success: true,
      message:
        "Order deleted successfully",
    });

  } catch (error) {

    console.log(
      "DELETE ORDER ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};