import React from "react";
import { Link } from "react-router-dom";

import banner1 from "../../assets/bannerWide1.png";
import banner2 from "../../assets/bannerWide2.png";

const PromoBanners = () => {
  const banners = [
    { img: banner1, category: "furniture" },
    { img: banner2, category: "skincare" },
  ];

  return (
    <div className="w-full px-4 mt-6">
      <div className="grid md:grid-cols-2 gap-6">

        {banners.map((banner, i) => (
          <Link key={i} to={`/category/${banner.category}`}>
            
            <div className="rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-lg transition">

              <img
                src={banner.img}
                alt="banner"
                className="w-full h-[200px] md:h-[260px] object-cover"
              />

            </div>

          </Link>

        ))}

      </div>
    </div>
  );
};

export default PromoBanners;