import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import Search from "../search/Search";

import { IoGitCompareOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { RiMenu2Fill } from "react-icons/ri";

import CategoryPanel from "../categories/CategoryPanel";
import Tooltip from "@mui/material/Tooltip";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

// badge style
const StyledBadge = styled(Badge)(() => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 10,
    border: "2px solid white",
    padding: "0 4px",
  },
}));

const Header = () => {
  const { cart } = useCart();
  const { wishlist } = useWishlist();
 const cartCount = (cart || []).reduce(
  (acc, item) => acc + (item.qty || 1),
  0
);
const wishlistCount = wishlist?.length || 0;
  const [open, setOpen] = useState(false);

  const [compareCount, setCompareCount] = useState(0);
  
  useEffect(() => {
  const loadCompare = () => {
    const data =
      JSON.parse(localStorage.getItem("compare")) || [];

    setCompareCount(data.length);
  };

  loadCompare();
  
  window.addEventListener(
    "compareUpdated",
    loadCompare
  );

  window.addEventListener("storage", () => {
    loadCompare();
    
  });

  return () => {
    window.removeEventListener(
      "compareUpdated",
      loadCompare
    ); 
  };
}, []);


  return (
  <header className="w-full bg-white shadow-md">

    {/* TOP STRIP */}
    <div className="w-full bg-gray-900 text-white text-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <p>
          Get up to <span className="text-yellow-400 font-semibold">50% OFF</span>
        </p>

        <ul className="flex gap-4 text-xs">
          <li>
            <Link to="/help" className="hover:text-yellow-400">
              Help Center
            </Link>
          </li>
          <li>
            <Link to="/track" className="hover:text-yellow-400">
              Track Order
            </Link>
          </li>
        </ul>
      </div>
    </div>

    {/* MAIN HEADER */}
    <div className="border-b">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">

        {/* MENU */}
        <button className="md:hidden text-2xl" onClick={() => setOpen(true)}>
          <RiMenu2Fill />
        </button>

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} className="h-10 w-10" alt="logo" />
          <h1 className="font-bold text-lg">Cartify</h1>
        </Link>

        {/* SEARCH */}
        <div className="flex-1 hidden md:block">
          <Search />
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">
          {/* LOGIN / REGISTER */}
<div className="hidden sm:flex items-center gap-1 font-medium">
  <Link to="/register" className="hover:text-yellow-600">
    Register
  </Link>
  <span>/</span>
  <Link to="/login" className="hover:text-yellow-600">
    Login
  </Link>
</div>

          {/* ORDERS */}
          <Link to="/orders">
            <Tooltip title="Orders">
              <IconButton size="small">📦</IconButton>
            </Tooltip>
          </Link>

          {/* COMPARE */}
          <Link to="/compare">
            <Tooltip title="Compare">
              <IconButton size="small">
                <StyledBadge badgeContent={compareCount} color="secondary">
                  <IoGitCompareOutline size={20} />
                </StyledBadge>
              </IconButton>
            </Tooltip>
          </Link>

          {/* WISHLIST */}
          <Link to="/wishlist">
            <Tooltip title="Wishlist">
              <IconButton size="small">
                <StyledBadge badgeContent={wishlistCount} color="secondary">
                  <FaRegHeart size={18} />
                </StyledBadge>
              </IconButton>
            </Tooltip>
          </Link>

          {/* CART */}
          <Link to="/cart">
            <Tooltip title="Cart">
              <IconButton size="small">
                <StyledBadge badgeContent={cartCount} color="secondary">
                  <ShoppingCartIcon />
                </StyledBadge>
              </IconButton>
            </Tooltip>
          </Link>

        </div>
      </div>

      {/* MOBILE SEARCH */}
      <div className="md:hidden px-4 pb-3">
        <Search />
      </div>
    </div>

    {/* CATEGORY PANEL */}
    <CategoryPanel open={open} setOpen={setOpen} />

  </header>
);
};
export default Header