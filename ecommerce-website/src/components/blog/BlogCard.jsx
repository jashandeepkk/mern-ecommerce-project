import React from "react";

import { useNavigate } from "react-router-dom";

const BlogCard = ({ blog }) => {

  const navigate =
    useNavigate();

  return (
    <div
      onClick={() =>
  navigate(`/blog/${blog.id}`)
}
      className="group cursor-pointer bg-white rounded-2xl border border-gray-100 hover:shadow-lg transition duration-300 overflow-hidden"
    >

      {/* IMAGE */}
      <div className="relative h-[250px] bg-gray-100 flex items-center justify-center overflow-hidden">

  <img
    src={blog.image}
    alt={blog.title}
    onError={(e) => {
      e.target.src =
        "https://via.placeholder.com/400x250?text=No+Image";
    }}
    className="w-full h-full object-contain group-hover:scale-105 transition duration-500"
  />

  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition"></div>

  <span className="absolute top-3 left-3 text-[11px] bg-white/90 px-2 py-1 rounded-md shadow-sm">
    {blog.category}
  </span>

</div>

      {/* CONTENT */}
      <div className="p-4">

        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
          {blog.title}
        </h3>

        <p className="text-xs text-gray-400 mt-1">
          {blog.date}
        </p>

        <div className="h-[1px] bg-gray-100 my-3"></div>

        <span className="text-blue-600 text-xs font-medium group-hover:underline">
          Read More →
        </span>

      </div>

    </div>
  );
};

export default BlogCard;

