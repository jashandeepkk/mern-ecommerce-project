import Product from "../models/Product.js";
export const addProduct = async (
  req,
  res
) => {
  try {

    const {
      name,
      description,
      price,
      category,
      subCategory,
      brand,
      stock,
      images,
      discountPercentage,
      featured,
    } = req.body;
 
    if (
      !name ||
      !description ||
      !price ||
      !category
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please fill required fields",
      });
    }

    let productImages = [];
 
    if (
      images &&
      Array.isArray(images) &&
      images.length > 0
    ) {
      productImages = images;
    }

    else if (
      req.files &&
      req.files.length > 0
    ) {
      productImages = req.files.map(
        (file) =>
          file.path.replace(/\\/g, "/")
      );
    }
 
    const product = await Product.create({
      name,
      description,
      price,
      category,
      subCategory,

      brand:
        brand || "Vendor Product",

      stock: stock || 10,

      images: productImages,

      thumbnail:
        productImages[0] || "",

      discountPercentage:
        discountPercentage || 0,

      featured: featured || false,

      vendor: req.user?._id,
    });

    res.status(201).json({
      success: true,
      message:
        "Product added successfully",
      product,
    });

  } catch (error) {

    console.log(
      "ADD PRODUCT ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getVendorProducts = async (
  req,
  res
) => {
  try {

    const products = await Product.find({
      vendor: req.user._id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json(products);

  } catch (error) {

    console.log(
      "GET VENDOR PRODUCTS ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getProducts = async (
  req,
  res
) => {
  try {

    const products =
      await Product.find()
        .populate(
          "vendor",
          "name email"
        )
        .sort({
          createdAt: -1,
        });

    res.status(200).json({
      success: true,
      products,
    });

  } catch (error) {

    console.log(
      "GET PRODUCTS ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getSingleProduct =
  async (req, res) => {
    try {

      const product =
        await Product.findById(
          req.params.id
        ).populate(
          "vendor",
          "name email"
        );

      if (!product) {
        return res.status(404).json({
          success: false,
          message:
            "Product not found",
        });
      }

      res.status(200).json({
        success: true,
        product,
      });

    } catch (error) {

      console.log(
        "GET SINGLE PRODUCT ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

export const updateProduct =
  async (req, res) => {
    try {

      const product =
        await Product.findById(
          req.params.id
        );

      if (!product) {
        return res.status(404).json({
          success: false,
          message:
            "Product not found",
        });
      }
   
      if (
        product.vendor &&
        product.vendor.toString() !==
          req.user?._id?.toString()
      ) {
        return res.status(403).json({
          success: false,
          message:
            "Not authorized",
        });
      }

      const {
        name,
        description,
        price,
        category,
        subCategory,
        brand,
        stock,
        images,
        discountPercentage,
        featured,
      } = req.body;
   
      let updatedImages =
        product.images;

      if (
        images &&
        Array.isArray(images) &&
        images.length > 0
      ) {
        updatedImages = images;
      }

      else if (
        req.files &&
        req.files.length > 0
      ) {
        updatedImages = req.files.map(
          (file) =>
            file.path.replace(/\\/g, "/")
        );
      }

      product.name =
        name || product.name;

      product.description =
        description ||
        product.description;

      product.price =
        price || product.price;

      product.category =
        category ||
        product.category;

      product.subCategory =
        subCategory ||
        product.subCategory;

      product.brand =
        brand || product.brand;

      product.stock =
        stock || product.stock;

      product.images =
        updatedImages;

      product.thumbnail =
        updatedImages[0] ||
        product.thumbnail;

      product.discountPercentage =
        discountPercentage ||
        product.discountPercentage;

      product.featured =
        featured ??
        product.featured;

      const updatedProduct =
        await product.save();

      res.status(200).json({
        success: true,
        message:
          "Product updated successfully",
        product: updatedProduct,
      });

    } catch (error) {

      console.log(
        "UPDATE PRODUCT ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

export const deleteProduct =
  async (req, res) => {
    try {

      const product =
        await Product.findById(
          req.params.id
        );

      if (!product) {
        return res.status(404).json({
          success: false,
          message:
            "Product not found",
        });
      }
  
      if (
        product.vendor &&
        product.vendor.toString() !==
          req.user?._id?.toString()
      ) {
        return res.status(403).json({
          success: false,
          message:
            "Not authorized",
        });
      }

      await product.deleteOne();

      res.status(200).json({
        success: true,
        message:
          "Product deleted successfully",
      });

    } catch (error) {

      console.log(
        "DELETE PRODUCT ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };