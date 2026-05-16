import { useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import "./App.css";

import Header from "./components/header/Header";
import Navigation from "./components/navigation/Navigation";


import Home from "./Pages/Home";
import Help from "./Pages/Help";
import Track from "./Pages/Track";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import SearchResults from "./Pages/SearchResults";
import CategoryPage from "./Pages/CategoryPage";
import Compare from "./Pages/Compare";
import Wishlist from "./Pages/Wishlist";
import Cart from "./Pages/Cart";
import ProductDetails from "./components/product/ProductDetails";
import BlogDetails from "./pages/BlogDetails";
import Checkout from "./Pages/Checkout";
import Success from "./Pages/Success";
import Orders from "./Pages/Orders";
import Vendor from "./Pages/Vendor";
import Admin from "./Pages/Admin";


import { Toaster } from "react-hot-toast";



const ProtectedAdmin = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (!user || user.role !== "admin") {
    return <Navigate to="/login" />;
  }

  return children;
};


const ProtectedVendor = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (!user || user.role !== "vendor") {
    return <Navigate to="/login" />;
  }

  return children;
};


function App() {
  
  const location = useLocation();

  
  const hideLayout =
    location.pathname === "/checkout" ||
    location.pathname === "/success";

  return (
    <div className="flex flex-col min-h-screen">

      <Toaster position="top-right" />

     
      {!hideLayout &&<Header /> }
      {!hideLayout && <Navigation />}

      <main className="flex-grow">
        <Routes>

          
          <Route path="/" element={<Home />} />
          <Route path="/help" element={<Help />} />
          <Route path="/track" element={<Track />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search" element={<SearchResults />} />

          <Route path="/category/:name" element={<CategoryPage />} />
          <Route path="/category/:name/:sub" element={<CategoryPage />} />

          <Route path="/compare" element={<Compare />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />

          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path="/product/:id" element={<ProductDetails />} />

          <Route path="/checkout" element={<Checkout />} />
          <Route path="/success" element={<Success />} />
          <Route path="/orders" element={<Orders />} />

          

         
          <Route
            path="/admin"
            element={
              <ProtectedAdmin>
                <Admin />
              </ProtectedAdmin>
            }
          />

         
          <Route
            path="/vendor"
            element={
              <ProtectedVendor>
                <Vendor />
              </ProtectedVendor>
            }
          />

        </Routes>
      </main>

     

    </div>
  );
}

export default App;