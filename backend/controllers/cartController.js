import Cart from "../models/Cart.js";

/* GET CART */
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      userId: req.user._id,
    });

    if (!cart) {
      return res.json({
        items: [],
      });
    }

    res.json(cart);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Error fetching cart",
    });
  }
};

/* ADD TO CART */
export const addToCart = async (req, res) => {

  try {

    const { product } = req.body;

    const userId = req.user._id;

    let cart = await Cart.findOne({
      userId,
    });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [],
      });
    }

    const productId =
      product._id || product.id;

    const existingItem =
      cart.items.find(
        (item) =>
          item.productId.toString() ===
          productId.toString()
      );

    if (existingItem) {

      existingItem.qty += 1;

    } else {

      cart.items.push({
        productId,
        title: product.name,
        price: product.price,
        image:
          product.images?.[0] || "",
        qty: 1,
      });
    }

    await cart.save();

    const updatedCart = await Cart.findOne({
      userId,
    });

    res.json(updatedCart);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Add to cart failed",
    });
  }
};

/* REMOVE FROM CART */
export const removeFromCart = async (
  req,
  res
) => {

  try {

    const { productId } = req.body;

    const userId = req.user._id;

    const cart = await Cart.findOne({
      userId,
    });

    if (!cart) {
      return res.json({
        items: [],
      });
    }

    cart.items = cart.items.filter(
      (item) =>
        item.productId.toString() !==
        productId.toString()
    );

    await cart.save();

    const updatedCart = await Cart.findOne({
      userId,
    });

    res.json(updatedCart);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Remove failed",
    });
  }
};

/* UPDATE QUANTITY */
export const updateQty = async (
  req,
  res
) => {

  try {

    const {
      productId,
      type,
    } = req.body;

    const userId = req.user._id;

    const cart = await Cart.findOne({
      userId,
    });

    if (!cart) {
      return res.json({
        items: [],
      });
    }

    cart.items = cart.items.map(
      (item) => {

        if (
          item.productId.toString() ===
          productId.toString()
        ) {

          return {
            ...item._doc,
            qty:
              type === "inc"
                ? item.qty + 1
                : Math.max(
                    1,
                    item.qty - 1
                  ),
          };
        }

        return item;
      }
    );

    await cart.save();

    const updatedCart = await Cart.findOne({
      userId,
    });

    res.json(updatedCart);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Update failed",
    });

  }
};

/* CLEAR CART */
export const clearCart = async (
  req,
  res
) => {

  try {

    const userId =
      req.user._id;

    await Cart.findOneAndUpdate(
      { userId },
      { items: [] }
    );

    res.json({
      message:
        "Cart cleared",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        "Clear cart failed",
    });
  }
};