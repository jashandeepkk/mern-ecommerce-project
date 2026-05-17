const BASE_URL =
  "https://mern-ecommerce-project-rtjp.onrender.com";

const BLOG_API = `${BASE_URL}/api/blogs`;

export const getBlogs = async () => {
  try {
    const res = await fetch(BLOG_API);

    if (!res.ok) {
      throw new Error("Failed to fetch blogs");
    }

    const data = await res.json();

    return data.map((item) => ({
      id: item._id,

      title: item.title,
      category: item.category,
      content: item.content,

      image: item.image?.startsWith("http")
        ? item.image
        : `${BASE_URL}/${item.image.replace(/^\/+/, "")}`,

      date: item.createdAt
        ? new Date(item.createdAt).toLocaleDateString()
        : "Latest",
    }));
  } catch (error) {
    console.log("BLOG FETCH ERROR:", error);
    return [];
  }
};

export const getBlogById = async (id) => {
  try {
    const res = await fetch(`${BLOG_API}/${id}`);

    if (!res.ok) {
      throw new Error("Failed to fetch blog");
    }

    const item = await res.json();

    return {
      id: item._id,

      title: item.title,
      category: item.category,
      content: item.content,

      image: item.image?.startsWith("http")
        ? item.image
        : `${BASE_URL}/${item.image.replace(/^\/+/, "")}`,

      date: item.createdAt
        ? new Date(item.createdAt).toLocaleDateString()
        : "Latest",

      products: [
        {
          id: item._id,
          title: item.title,
          price: 999,

          thumbnail: item.image?.startsWith("http")
            ? item.image
            : `${BASE_URL}/${item.image.replace(/^\/+/, "")}`,
        },
      ],

      author: {
        name: "Cartify Team",
        bio: "Helping you shop smarter 🛒",
        avatar: "https://i.pravatar.cc/100?img=3",
      },
    };
  } catch (error) {
    console.log("BLOG BY ID ERROR:", error);

    return null;
  }
};