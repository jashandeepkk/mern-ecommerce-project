import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBlogById, getBlogs } from "../api/blogs";

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [related, setRelated] = useState([]);
  const [comments, setComments] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const loadBlog = async () => {
      try {
        const blogData = await getBlogById(id);
        setBlog(blogData);

        const blogs = await getBlogs();
        setRelated(
          blogs
            .filter((b) => b.id !== id)
            .slice(0, 4)
        );

      } catch (error) {
        console.log(error);
      }
    };

    loadBlog();
  }, [id]);

  const addComment = () => {
    if (!input.trim()) return;

    const newComment = {
      id: Date.now(),
      text: input,
      user: "You",
      avatar: "https://i.pravatar.cc/100",
    };

    setComments([newComment, ...comments]);

    setInput("");
  };

  if (!blog) return <Skeleton />;
  return (
    <div className="bg-gray-50 min-h-screen">

      <div className="relative">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-[300px] md:h-[420px] object-cover"
        />

        <div className="absolute inset-0 bg-black/40 flex items-end">
          <div className="p-6 md:p-10 text-white max-w-4xl">

            <span className="text-xs bg-white/20 px-3 py-1 rounded-full">
              {blog.category}
            </span>

            <h1 className="text-3xl md:text-5xl font-bold mt-3 leading-tight">
              {blog.title}
            </h1>

            <p className="text-sm opacity-80 mt-2">
              {blog.date || "Latest Article"}
            </p>

          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 grid md:grid-cols-3 gap-8 py-8">

        <div className="md:col-span-2">

          <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm mb-6">

            <img
              src={
                blog.author?.avatar ||
                "https://i.pravatar.cc/100"
              }
              alt=""
              className="w-11 h-11 rounded-full"
            />

            <div>
              <p className="font-semibold text-sm">
                {blog.author?.name ||
                  "Cartify Team"}
              </p>

              <p className="text-xs text-gray-500">
                {blog.author?.bio ||
                  "Ecommerce Experts"}
              </p>
            </div>

          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 leading-relaxed text-gray-700 text-[15px] md:text-[16px] whitespace-pre-line">
            {blog.content}
          </div>

          {blog.products?.length > 0 && (
            <div className="mt-8">

              <h3 className="text-lg font-semibold mb-4">
                🔥 Recommended Products
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                {blog.products.map((p) => (
                  <div
                    key={p.id}
                    onClick={() =>
                      navigate(`/product/${p.id}`)
                    }
                    className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer"
                  >

                    <img
                      src={p.thumbnail}
                      alt={p.title}
                      className="h-28 w-full object-cover"
                    />

                    <div className="p-2">

                      <p className="text-xs line-clamp-2">
                        {p.title}
                      </p>

                      <p className="text-sm font-bold text-green-600">
                        ₹{p.price}
                      </p>

                    </div>

                  </div>
                ))}

              </div>

            </div>
          )}

          <div className="mt-10 bg-white rounded-2xl shadow-sm p-6">

            <h3 className="font-semibold mb-4">
              Comments
            </h3>

            <div className="flex gap-2 mb-5">

              <input
                value={input}
                onChange={(e) =>
                  setInput(e.target.value)
                }
                placeholder="Write a comment..."
                className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              <button
                onClick={addComment}
                className="bg-blue-600 text-white px-4 rounded-lg text-sm hover:bg-blue-700"
              >
                Post
              </button>

            </div>

            {comments.length === 0 ? (
              <p className="text-xs text-gray-400">
                No comments yet
              </p>
            ) : (
              <div className="space-y-3">

                {comments.map((c) => (
                  <div
                    key={c.id}
                    className="flex gap-3 bg-gray-50 p-3 rounded-xl"
                  >

                    <img
                      src={c.avatar}
                      alt=""
                      className="w-8 h-8 rounded-full"
                    />

                    <div>

                      <p className="text-xs font-semibold">
                        {c.user}
                      </p>

                      <p className="text-sm text-gray-700">
                        {c.text}
                      </p>

                    </div>

                  </div>
                ))}

              </div>
            )}

          </div>

        </div>

        <div className="space-y-6 sticky top-6 h-fit">

          <div className="bg-white p-4 rounded-2xl shadow-sm">

            <h3 className="text-sm font-semibold mb-3">
              Share Article
            </h3>

            <div className="flex flex-col gap-2">

              <button
                onClick={() =>
                  navigator.share?.({
                    title: blog.title,
                    url: window.location.href,
                  })
                }
                className="bg-blue-100 text-blue-700 text-sm py-2 rounded-lg"
              >
                Share
              </button>

              <button
                onClick={() =>
                  window.open(
                    `https://wa.me/?text=${encodeURIComponent(
                      blog.title +
                        " " +
                        window.location.href
                    )}`
                  )
                }
                className="bg-green-100 text-green-700 text-sm py-2 rounded-lg"
              >
                WhatsApp
              </button>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    window.location.href
                  );
                }}
                className="bg-gray-100 text-gray-700 text-sm py-2 rounded-lg"
              >
                Copy Link
              </button>

            </div>

          </div>

          <div className="bg-white p-4 rounded-2xl shadow-sm">

            <h3 className="text-sm font-semibold mb-3">
              Related Articles
            </h3>

            <div className="space-y-3">

              {related.map((r) => (
  <div
    key={r.id}
    onClick={() =>
      navigate(`/blog/${r.id}`)
    }
    className="flex gap-3 cursor-pointer group"
  >

    <img
      src={r.image}
      alt={r.title}
      className="w-16 h-14 object-cover rounded-lg"
    />

    <p className="text-xs line-clamp-2 group-hover:text-blue-600">
      {r.title}
    </p>

  </div>
))}
              

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

const Skeleton = () => {
  return (
    <div className="animate-pulse p-6">

      <div className="h-[300px] bg-gray-300 rounded-xl mb-6"></div>

      <div className="h-6 bg-gray-300 w-1/2 mb-3"></div>

      <div className="h-4 bg-gray-200 w-1/3 mb-6"></div>

      <div className="h-40 bg-gray-200 rounded-xl"></div>

    </div>
  );
};

export default BlogDetails;