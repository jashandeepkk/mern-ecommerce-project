import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";


import ad1 from "../../assets/ad1.png";
import ad2 from "../../assets/ad2.png";
import ad3 from "../../assets/ad3.png";
import ad4 from "../../assets/ad4.png";
import ad5 from "../../assets/ad5.png";


const banners = [
  { img: ad1, category: "mobiles" },
  { img: ad2, category: "laptops" },
  { img: ad3, category: "groceries" },
  { img: ad4, category: "electronics" },
  { img: ad5, category: "electronics" },
];

const AdsBanner = () => {
  return (
    <div className="w-full mt-4">

      <Swiper
        spaceBetween={16}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        breakpoints={{
          320: { slidesPerView: 1.2 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        
       {banners.map((banner, index) => (
          <SwiperSlide key={index}>

           <Link to={`/category/${banner.category}`}>
              
              <div className="relative group rounded-xl overflow-hidden 
                              shadow-sm transition-all duration-300 
                              hover:shadow-lg hover:-translate-y-1">

                <img
                  src={banner.img}
                  alt="ad"
                  className="w-full h-[180px] object-cover 
                             transition-transform duration-300 
                             group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/40 opacity-0 
                                group-hover:opacity-100 
                                flex items-center justify-center 
                                transition">

                  <span className="text-white font-semibold text-sm md:text-base">
                    Shop Now
                  </span>

                </div>

              </div>

            </Link>

          </SwiperSlide>
        ))}

      </Swiper>

    </div>
  );
};

export default AdsBanner;