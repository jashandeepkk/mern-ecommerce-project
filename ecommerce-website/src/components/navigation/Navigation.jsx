import React from "react";
import { Link } from "react-router-dom";

import { categories } from "./categories";
import { iconMap } from "./iconMap";

const Navigation = () => {
  return (
    <nav className="bg-gray-900 text-white shadow-md hidden md:block">
      <div className="max-w-[1320px] mx-auto px-4 py-3 flex items-center gap-8">

        {/* HOME */}
        <Link to="/" className="hover:text-yellow-400 text-sm font-medium">
          Home
        </Link>

        {categories.map((cat) => {
          const Icon = iconMap[cat.icon];

          return (
            <div key={cat.name} className="relative group">

              {/* MAIN CATEGORY */}
              <Link
                to={cat.path}
                className="hover:text-yellow-400 flex items-center gap-1 text-sm font-medium"
              >
                {Icon && <Icon />}
                {cat.name}
                {cat.sub && <span className="text-xs">▼</span>}
              </Link>

              {/* SUBMENU */}
              {cat.sub && (
                <div
                  className="absolute top-full left-0 bg-white text-black shadow-md rounded-md min-w-[180px]
                  opacity-0 invisible group-hover:opacity-100 group-hover:visible
                  transition-all duration-300 z-50"
                >
                  {cat.sub.map((item, i) => {
                    const slug = item
                      .toLowerCase()
                      .replace(/\s+/g, "-")
                      .replace(/'/g, "");

                    return (
                      <Link
                        key={i}
                        to={`${cat.path}/${slug}`}
                        className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-yellow-500"
                      >
                        {item}
                      </Link>
                    );
                  })}
                </div>
              )}

            </div>
          );
        })}

        {/* RIGHT TEXT */}
        <div className="ml-auto text-sm font-semibold text-green-400">
          🚚 Free International Shipping
        </div>

      </div>
    </nav>
  );
};

export default Navigation;