import React, { useState, useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../../api/productsApi";

const Search = () => {

  const [query, setQuery] = useState("");

  const [products, setProducts] =
    useState([]);

  const navigate = useNavigate();

  useEffect(() => {

    const fetchData = async () => {

      try {

        const data =
          await getProducts();

        const apiProducts =
          Array.isArray(data)
            ? data
            : data.products || [];

        const localProducts =
          JSON.parse(
            localStorage.getItem(
              "products"
            )
          ) || [];

        const approvedLocal =
          localProducts.filter(
            (p) =>
              p.approved === true
          );

        const merged = [
          ...approvedLocal,
          ...apiProducts,
        ];

        const uniqueProducts =
          merged.filter(
            (
              item,
              index,
              self
            ) =>
              index ===
              self.findIndex(
                (p) =>
                  p._id === item._id
              )
          );

        setProducts(
          uniqueProducts
        );

      } catch (error) {

        console.log(
          "SEARCH FETCH ERROR:",
          error
        );
      }
    };

    fetchData();

  }, []);

  const filtered =
    products.filter((p) =>
      (p.name || "")
        .toLowerCase()
        .includes(
          query
            .trim()
            .toLowerCase()
        )
    );

  const handleSearch = () => {

    if (!query.trim())
      return;

    navigate(
      `/search?q=${encodeURIComponent(
        query
      )}`
    );

    setQuery("");
  };

  const handleKeyDown = (
    e
  ) => {

    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="w-full relative">

      <div
        className="
          flex items-center
          border border-gray-300
          rounded-md overflow-hidden
          bg-gray-100
          focus-within:ring-2
          focus-within:ring-yellow-400
        "
      >

        <input
          type="text"
          placeholder="Search for products..."
          className="
            w-full px-3 py-1.5
            text-sm bg-transparent outline-none
          "
          value={query}
          onChange={(e) =>
            setQuery(
              e.target.value
            )
          }
          onKeyDown={
            handleKeyDown
          }
        />

        {query && (
          <button
            onClick={() =>
              setQuery("")
            }
            className="
              px-2 text-gray-500
              hover:text-black text-sm
            "
          >
            ✕
          </button>
        )}

        <button
          onClick={
            handleSearch
          }
          className="
            px-3 py-1.5
            bg-yellow-400
            hover:bg-yellow-500
          "
        >
          <IoSearch className="text-base text-black" />
        </button>

      </div>

      {query.trim()
        .length > 1 && (

        <div
          className="
            absolute top-full left-0
            w-full bg-white border
            rounded-md shadow-lg mt-1
            z-50 max-h-60 overflow-y-auto
          "
        >

          {filtered.length ===
          0 ? (

            <p className="p-3 text-sm text-gray-500">
              No results found
            </p>

          ) : (

            filtered
              .slice(0, 6)
              .map((item) => (

                <div
                  key={item._id}
                  onClick={() => {

                    navigate(
                      `/product/${item._id}`,
                      {
                        state:
                          item,
                      }
                    );

                    setQuery(
                      ""
                    );
                  }}
                  className="
                    flex items-center gap-3
                    px-4 py-3 text-sm
                    hover:bg-gray-100
                    cursor-pointer border-b
                  "
                >

                  <img
                    src={
                      item
                        .images?.[0]
                        ? item.images[0]
                        : "https://dummyimage.com/60x60/cccccc/000000&text=No+Image"
                    }
                    alt={
                      item.name
                    }
                    className="w-10 h-10 object-cover rounded"
                  />

                  <div className="flex-1">

                    <p className="font-medium text-gray-800">
                      {item.name}
                    </p>

                    <p className="text-yellow-600 font-semibold text-xs">
                      ₹
                      {item.price}
                    </p>

                  </div>

                </div>
              ))
          )}

        </div>
      )}

    </div>
  );
};

export default Search;