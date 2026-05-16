import React, { useState } from "react";
import HomeSlider from "../components/slider/HomeSlider";
import CategorySlider from "../components/categories/CategorySlider";
import AdsBanner from "../components/adsbannerslider/AdsBanner";
import ProductGrid from "../components/product/ProductGrid";
import useProducts from "../hooks/useProducts";
import { LiaShippingFastSolid } from "react-icons/lia";
import PromoBanners from "../components/promoBanners/PromoBanners";
import BlogSection from "../components/blog/BlogSection";
import Footer from "../components/footer/Footer";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const Home = () => {
  const { products, loading } = useProducts();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  
  const allProducts = products;
 const categories = [
  "All",
  "Fashion",
  "Electronics",
  "Beauty",
  "Groceries",
  "Jewellery",
  "Footwear",
  "Bags",
];
const selectedCategory =
  categories[value]?.toLowerCase();

const filteredProducts =
  value === 0
    ? allProducts
    : allProducts.filter(
        (p) =>
          p.category
            ?.toLowerCase()
            .includes(selectedCategory)
      );

  return (
    <div className="bg-[#f8fafc] min-h-screen">

      <HomeSlider />

      <CategorySlider />

      <section className="bg-white py-6 mt-6">

        <div className="px-6 mb-4 flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-[18px] font-semibold">
              Popular Products
            </h2>
            <p className="text-sm text-gray-500">
              Do not miss the current offers
            </p>
          </div>

          <div className="w-full md:w-[60%]">
        <Tabs
  value={value}
  onChange={handleChange}
  variant="scrollable"
  scrollButtons
  allowScrollButtonsMobile
>
  {categories.map((cat, index) => (
    <Tab
      key={index}
      label={cat}
    />
  ))}
</Tabs>
          </div>
        </div>

        {loading ? (
          <p className="px-6">Loading...</p>
        ) : (
          <ProductGrid products={filteredProducts} />
        )}

      </section>

      <section className="mt-6">
        <div className="max-w-[1320px] mx-auto px-6">
          <div className="bg-white border rounded-xl px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <LiaShippingFastSolid />
              <span className="font-semibold">Free Shipping</span>
            </div>
            <p>Free Delivery On First Order</p>
            <div className="font-bold">₹2000*</div>
          </div>
        </div>
      </section>

      <section className="mt-6">
        <AdsBanner />
      </section>

      <section className="bg-white py-8 mt-6">
        <div className="px-6 mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            Latest Products
          </h2>
        </div>

        <ProductGrid products={allProducts.slice(0, 10)} />
      </section>

      <section className="mt-6">
        <PromoBanners />
      </section>

      <section className="bg-white py-8 mt-6">

  <div className="px-6 mb-4 flex justify-between items-center">

    <h2 className="text-xl font-bold text-gray-800">
      New Arrivals
    </h2>

    <button className="text-sm text-gray-600 hover:text-black">
      View All
    </button>

  </div>

  {loading ? (

    <p className="px-6">Loading...</p>

  ) : (

    <ProductGrid
      products={[...allProducts].reverse().slice(0, 10)}
    />

  )}

</section>
    
      <section className="mt-6">
        <AdsBanner />
      </section>

      
      <BlogSection />

    
      <Footer />

    </div>
  );
};

export default Home;