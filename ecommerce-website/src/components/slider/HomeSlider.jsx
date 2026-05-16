import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Autoplay, Pagination } from "swiper/modules";

import img1 from "../../assets/slide1.png";
import img2 from "../../assets/slide2.png";
import img3 from "../../assets/slide3.png";
import img4 from "../../assets/slide4.png";
import img5 from "../../assets/slide5.png";
import img6 from "../../assets/slide6.png";
import img7 from "../../assets/slide7.png";
import img8 from "../../assets/slide8.png";


const HomeSlider = () => {
  const images = [img1, img2, img3, img4, img5, img6, img7, img8];

  return (
    <div className="w-full px-1 sm:px-2 md:px-4 mt-1"> {/* small space from navbar */}

      <div className="w-full h-[220px] sm:h-[300px] md:h-[380px] 
                      rounded-xl overflow-hidden">

        <Swiper
          modules={[Autoplay, Pagination]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop
          className="w-full h-full"
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img}
                alt={`slide-${index}`}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </div>
  );
};


export default HomeSlider;