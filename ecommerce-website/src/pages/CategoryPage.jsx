import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductsByCategory } from "../api/productsApi";

import ProductCard from "../components/product/ProductCard";

const CategoryPage = () => {
  const { name, sub } = useParams();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data =
          await getProductsByCategory(name);

        const apiProducts =
          data.products || data || [];

        const filteredProducts = sub
          ? apiProducts.filter((p) => {
              return (
                p.subCategory
                  ?.toLowerCase()
                  .replace(/\s/g, "") ===
                sub
                  .toLowerCase()
                  .replace(/\s/g, "")
              );
            })
          : apiProducts;

        const unique =
          filteredProducts.filter(
            (item, index, self) =>
              index ===
              self.findIndex(
                (p) => p._id === item._id
              )
          );

        setProducts(unique);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [name, sub]);

  return (
    <div className="bg-[#f8fafc] min-h-screen py-6">
      <div className="max-w-[1320px] mx-auto px-6">

        <h1 className="text-[24px] font-bold mb-6 capitalize">
          {name}
          {sub && ` / ${sub}`}
        </h1>

        {products.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            No products found 😕
          </div>
        ) : (
          <div
            className="
              grid
              grid-cols-2
              sm:grid-cols-3
              md:grid-cols-4
              lg:grid-cols-5
              gap-6
            "
          >
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default CategoryPage;