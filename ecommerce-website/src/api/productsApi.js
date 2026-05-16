const API_URL = "http://localhost:5000/api/products";

export const getProducts = async () => {
  try {
    const res = await fetch(API_URL);

    const data = await res.json();

    return data.products || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getProductsByCategory = async (
  category
) => {
  try {
    const res = await fetch(API_URL);

    const data = await res.json();

    const products = data.products || [];

    return products.filter(
      (product) =>
        product.category?.toLowerCase() ===
        category?.toLowerCase()
    );
  } catch (error) {
    console.log(error);
    return [];
  }
};