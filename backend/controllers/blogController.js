import Blog from "../models/Blog.js";
/* GET ALL BLOGS */
export const getBlogs = async (
  req,
  res
) => {
  try {
    const blogs = await Blog.find();

    res.json(blogs);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getSingleBlog = async (
  req,
  res
) => {
  try {
    const blog = await Blog.findById(
      req.params.id
    );

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    res.json(blog);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const createBlog = async (
  req,
  res
) => {
  try {

    console.log(req.file);

    const blog = await Blog.create({
      title: req.body.title,
      content: req.body.content,
      category: req.body.category,

      image: req.file
        ? req.file.path.replace(/\\/g, "/")
        : "",
    });

    res.status(201).json(blog);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};


export const updateBlog = async (
  req,
  res
) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(blog);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const deleteBlog = async (
  req,
  res
) => {
  try {
    await Blog.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Blog deleted",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};