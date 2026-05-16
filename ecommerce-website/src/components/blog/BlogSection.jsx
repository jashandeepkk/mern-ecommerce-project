import React, {
  useEffect,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import {
  Swiper,
  SwiperSlide,
} from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";

import BlogCard from "./BlogCard";

import { getBlogs } from "../../api/blogs";

const BlogSection = () => {

  const [blogs, setBlogs] =
    useState([]);

  const navigate =
    useNavigate();

  useEffect(() => {

    const fetchBlogs = async () => {

      try {

        const data =
          await getBlogs();

        setBlogs(data);

      } catch (error) {

        console.log(
          "BLOG FETCH ERROR:",
          error
        );
      }
    };

    fetchBlogs();

  }, []);

  if (!blogs.length) {

    return (
      <div className="p-6 text-gray-500">
        No blogs found
      </div>
    );
  }

  return (
    <section className="py-8 bg-gray-50 mt-6">

      
      <div className="px-6 mb-6 flex justify-between items-center">

        <h2 className="text-xl font-semibold">
          Latest Articles
        </h2>

        <button
          onClick={() =>
            navigate("/blogs")
          }
          className="text-blue-600 text-sm hover:underline"
        >
          View All
        </button>

      </div>

      <div className="px-6">

        <Swiper
          spaceBetween={20}
          navigation={true}
          modules={[Navigation]}
          breakpoints={{
            320: {
              slidesPerView: 1.2,
            },

            480: {
              slidesPerView: 2,
            },

            768: {
              slidesPerView: 3,
            },

            1024: {
              slidesPerView: 4,
            },
          }}
        >

          {blogs.map((blog) => (
  <SwiperSlide
    key={blog.id}
  >
    <BlogCard
      blog={blog}
    />
  </SwiperSlide>
))}

        </Swiper>

      </div>

    </section>
  );
};

export default BlogSection;