import { useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import "./App.css";

import Header from "./components/header/Header";
import Navigation from "./components/navigation/Navigation";


import Home from "./pages/Home";
import Help from "./pages/Help";
import Track from "./pages/Track";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SearchResults from "./pages/SearchResults";
import CategoryPage from "./pages/CategoryPage";
import Compare from "./pages/Compare";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import Orders from "./pages/Orders";
import Vendor from "./pages/Vendor";
import Admin from "./pages/Admin";

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