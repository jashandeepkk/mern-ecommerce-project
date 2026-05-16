const BLOG_API = "http://localhost:5000/api/blogs";

export const getBlogs = async () => {
  const res = await fetch(BLOG_API);

  const data = await res.json();

  return data.map((item) => ({
    id: item._id,

    title: item.title,
    category: item.category,
    content: item.content,

    image: `http://localhost:5000/${item.image}`,

    date: "Latest",
  }));
};

export const getBlogById = async (id) => {
  const res = await fetch(`${BLOG_API}/${id}`);

  const item = await res.json();

  return {
    id: item._id,
    title: item.title,
    category: item.category,
    content: item.content,

    image: `http://localhost:5000/${item.image}`,

    date: "Latest",

    products: [
      {
        id: item._id,
        title: item.title,
        price: 999,
        thumbnail: `http://localhost:5000/${item.image}`,
      },
    ],

    author: {
      name: "Cartify Team",
      bio: "Helping you shop smarter 🛒",
      avatar: "https://i.pravatar.cc/100?img=3",
    },
  };
};