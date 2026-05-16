import User from "../models/User.js";

export const getUsers = async (
  req,
  res
) => {
  try {
    const users = await User.find().select(
      "-password"
    );

    res.json(users);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getSingleUser = async (
  req,
  res
) => {
  try {
    const user = await User.findById(
      req.params.id
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(user);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateUser = async (
  req,
  res
) => {
  try {
    const user = await User.findById(
      req.params.id
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.name =
      req.body.name || user.name;

    user.email =
      req.body.email || user.email;

    user.role =
      req.body.role || user.role;

    user.storeName =
      req.body.storeName ||
      user.storeName;

    const updatedUser =
      await user.save();

    res.json(updatedUser);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteUser = async (
  req,
  res
) => {
  try {
    const user = await User.findById(
      req.params.id
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    await user.deleteOne();

    res.json({
      message: "User deleted",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};