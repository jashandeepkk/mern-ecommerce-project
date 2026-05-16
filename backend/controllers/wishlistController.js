import Wishlist from "../models/Wishlist.js";
export const getWishlist = async (
  req,
  res
) => {

  try {

    const wishlist =
      await Wishlist.findOne({
        userId: req.params.userId,
      });

    if (!wishlist) {

      return res.json({
        items: [],
      });
    }

    res.json(wishlist);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

export const toggleWishlist = async (
  req,
  res
) => {

  try {

    const { userId, product } =
      req.body;

    let wishlist =
      await Wishlist.findOne({
        userId,
      });

    if (!wishlist) {

      wishlist = new Wishlist({
        userId,
        items: [],
      });
    }

    const exists =
      wishlist.items.find(
        (item) =>
          item.productId.toString() ===
          product._id.toString()
      );

    if (exists) {

      wishlist.items =
        wishlist.items.filter(
          (item) =>
            item.productId.toString() !==
            product._id.toString()
        );

    } else {

      wishlist.items.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        images: product.images,
        brand: product.brand,
        category: product.category,
      });
    }

    await wishlist.save();

    res.json(wishlist);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};