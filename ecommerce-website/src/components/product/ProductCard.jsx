import { IoGitCompareOutline } from "react-icons/io5";
import { FaHeart, FaEye } from "react-icons/fa";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { getPricing } from "../../utils/pricing";
import { getStorage, setStorage } from "../../utils/storage";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const { wishlist, toggleWishlist } =
    useWishlist();

  const navigate = useNavigate();

  if (!product) return null;

  const { price, oldPrice, discount } =
    getPricing(product);

  const handleCompare = () => {
    const existing = getStorage("compare");

    if (
      existing.find(
        (p) => p._id === product._id
      )
    ) {
      toast.error(
        "Already added to compare ❌"
      );
      return;
    }

    setStorage(
      "compare",
      [...existing, product],
      "compareUpdated"
    );

    toast.success("Added to compare ✅");
  };

  const isWishlisted =
    wishlist?.find(
      (p) => p.productId === product._id
    );

  const handleWishlist = async () => {
    await toggleWishlist(product);

    toast.success(
      isWishlisted
        ? "Removed from wishlist 💔"
        : "Added to wishlist ❤️"
    );
  };

 return (
  <div
    onClick={() =>
      navigate(`/product/${product._id}`, {
        state: product,
      })
    }
   className="group relative bg-white rounded-2xl
border border-gray-200
hover:shadow-xl hover:-translate-y-1
transition-all duration-300
flex flex-col overflow-hidden cursor-pointer"
  >

    
    {discount > 0 && (
      <span
        className="absolute top-3 left-3 z-50
        bg-red-500 text-white text-xs font-semibold
        px-3 py-1 rounded-md shadow"
      >
        -{Math.round(discount)}%
      </span>
    )}

    
    <div className="absolute top-3 right-3 flex flex-col gap-2 z-40">

      <button
        onClick={async (e) => {
          e.stopPropagation();
          await handleWishlist();
        }}
        className={`p-2 rounded-full shadow-md transition
          ${
            isWishlisted
              ? "bg-red-500 text-white"
              : "bg-white text-black"
          }`}
      >
        <FaHeart size={14} />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();

          navigate(`/product/${product._id}`, {
            state: product,
          });
        }}
        className="p-2 bg-white rounded-full shadow-md"
      >
        <FaEye size={14} />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          handleCompare();
        }}
        className="p-2 bg-white rounded-full shadow-md"
      >
        <IoGitCompareOutline size={16} />
      </button>
    </div>

    
<div
  className="h-[210px] bg-white flex items-center justify-center overflow-hidden p-2"
>
  <img
   loading="lazy"
    src={
      product.images?.[0]
        ? product.images[0].startsWith("data:image")
          ? product.images[0]
          : `https://mern-ecommerce-project-rtjp.onrender.com/${product.images[0]}`
        : "https://dummyimage.com/300x300/cccccc/000000&text=No+Image"
    }
    alt={product.name}
    onError={(e) => {
      e.target.onerror = null;

      e.target.src =
        "https://dummyimage.com/300x300/cccccc/000000&text=No+Image";
    }}
 className="
  h-full
  w-full
  object-contain
  transition-transform
  duration-300
  group-hover:scale-105
"
  />
</div>
     
    
    <div className="flex flex-col flex-grow p-3">

     
      <p className="text-xs uppercase tracking-wide text-gray-400 mb-2">
        {product.category}
      </p>

      
      <h3
       className="text-[15px] font-semibold text-gray-800
line-clamp-2 min-h-[44px]"
      >
        {product.name}
      </h3>

      
      {product.brand && (
        <p className="text-sm text-gray-500 mt-1">
          {product.brand}
        </p>
      )}
  
   
<div className="mt-auto pt-3">
  <div className="flex items-center gap-2">

    <span className="font-bold text-black text-xl">
      ₹{price.toFixed(2)}
    </span>

    {discount > 0 && (
      <span className="text-gray-400 line-through text-sm">
        ₹{oldPrice.toFixed(2)}
      </span>
    )}

  </div>
</div>

      
      <p
        className={`text-sm mt-2 font-medium
          ${
            (
              product.countInStock ||
              product.stock
            ) > 0
              ? "text-green-600"
              : "text-red-500"
          }`}
      >
        {(
          product.countInStock ||
          product.stock
        ) > 0
          ? `In Stock (${
              product.countInStock ||
              product.stock
            })`
          : "Out of Stock"}
      </p>

      
      <button
        onClick={(e) => {
          e.stopPropagation();

          addToCart(product);

          toast.success("Added to cart 🛒");
        }}
        className="mt-4 w-full bg-black text-white py-2.5 rounded-xl
        hover:bg-gray-800 transition font-medium"
      >
        Add to Cart
      </button>

    </div>
</div>
  
);
};

export default ProductCard;