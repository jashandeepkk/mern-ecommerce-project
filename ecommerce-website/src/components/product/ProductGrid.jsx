import React from "react";
import {
  Swiper,
  SwiperSlide,
} from "swiper/react";

import { Navigation } from "swiper/modules";

import ProductCard from "./ProductCard";

import "swiper/css";
import "swiper/css/navigation";

const ProductGrid = ({
  products,
}) => {
  if (!products?.length) {
    return (
      <p className="px-6">
        Loading...
      </p>
    );
  }

  return (
    <div className="w-full">

      <Swiper
        slidesPerView={5}
        spaceBetween={16}
        navigation
        modules={[Navigation]}
        breakpoints={{
          320: {
            slidesPerView: 1,
          },

          640: {
            slidesPerView: 2,
          },

          768: {
            slidesPerView: 3,
          },

          1024: {
            slidesPerView: 4,
          },

          1280: {
            slidesPerView: 5,
          },
        }}
      >

        {products.map((product) => (
          <SwiperSlide
            key={product._id}
            className="overflow-visible"
          >

            <ProductCard
              product={product}
            />

          </SwiperSlide>
        ))}

      </Swiper>

    </div>
  );
};

export default ProductGrid;