import React from "react";
import { useNavigate } from "react-router-dom";
import { categories } from "./categories"; // ✅ FIXED

const CategorySlider = () => {
  const navigate = useNavigate();

  return (
    <section className="mt-4">
      <div className="max-w-[1320px] mx-auto px-6">

        <div className="bg-gray-100 rounded-2xl p-5 flex items-center justify-between gap-4 overflow-x-auto">

          {categories.map((cat) => (
            <div
              key={cat.name}
              onClick={() => navigate(cat.path)}
              className="flex flex-col items-center justify-center 
                         min-w-[110px] cursor-pointer group"
            >

              {/* ICON BOX */}
              <div
                className="w-28 h-28 bg-white rounded-xl flex items-center justify-center 
                           shadow-sm transition-all duration-300
                           group-hover:shadow-md group-hover:-translate-y-1"
              >
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="w-20 h-20 object-contain"
                />
              </div>

              {/* TEXT */}
              <p className="text-sm mt-3 text-gray-700 group-hover:text-black">
                {cat.name}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default CategorySlider;