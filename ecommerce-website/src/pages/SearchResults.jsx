import { useLocation, Link } from "react-router-dom";
import { categories } from "../components/navigation/categories";
const SearchResults = () => {
  const query = new URLSearchParams(useLocation().search);
  const searchTerm = query.get("q")?.toLowerCase() || "";

  const filtered = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="bg-[#f8fafc] min-h-screen py-6">
      <div className="max-w-[1320px] mx-auto px-6">

        
        <h1 className="text-xl font-semibold mb-6 text-[#0f172a]">
          Results for: "{searchTerm}"
        </h1>
    
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            No results found 😕
          </div>
        ) : (

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">

            {filtered.map((cat, index) => (
              <Link to={cat.path} key={index}>

                <div className="bg-white border border-[#e5e7eb] rounded-lg p-4 flex flex-col items-center hover:shadow-md transition">

                  
                  <img
                    src={cat.img}
                    alt={cat.name}
                    className="w-12 h-12 mb-2"
                  />

                 
                  <p className="text-sm font-medium text-gray-700">
                    {cat.name}
                  </p>

                </div>

              </Link>
            ))}

          </div>

        )}

      </div>
    </div>
  );
};

export default SearchResults;