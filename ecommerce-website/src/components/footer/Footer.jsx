import React from "react";
import {
  LiaShippingFastSolid,
  LiaUndoSolid,
  LiaWalletSolid,
  LiaGiftSolid,
  LiaHeadsetSolid,
} from "react-icons/lia";

import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  const features = [
    {
      icon: <LiaShippingFastSolid />,
      title: "Free Shipping",
      desc: "On orders above ₹100",
    },
    {
      icon: <LiaUndoSolid />,
      title: "Easy Returns",
      desc: "30 Days Return Policy",
    },
    {
      icon: <LiaWalletSolid />,
      title: "Secure Payment",
      desc: "100% Safe Checkout",
    },
    {
      icon: <LiaGiftSolid />,
      title: "Special Offers",
      desc: "Exclusive Deals",
    },
    {
      icon: <LiaHeadsetSolid />,
      title: "24/7 Support",
      desc: "We’re here to help",
    },
  ];

  return (
    <>
      
      <div className="bg-white border-t py-10">
        <div className="max-w-[1300px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-center">
            {features.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center group"
              >
                <div className="text-[40px] text-gray-500 mb-3 transition duration-300 group-hover:text-blue-600 group-hover:scale-110">
                  {item.icon}
                </div>

                <h4 className="text-sm font-semibold text-gray-800">
                  {item.title}
                </h4>

                <p className="text-xs text-gray-500 mt-1">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      
      <footer className="bg-gray-50 py-12 border-t">
        <div className="max-w-[1300px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          
          <div>
            <h3 className="font-semibold text-lg mb-4 text-gray-800">
              Contact Us
            </h3>

            <p className="text-sm text-gray-500 leading-6">
              Cartify Mega Store <br />
              507-Union Trade Centre <br />
              India
            </p>

            <p className="text-sm text-gray-500 mt-3">
              support@cartify.com
            </p>

            <p className="text-lg font-semibold text-red-500 mt-2">
              (+91) 9876-543-210
            </p>

            <div className="flex gap-3 mt-4">
              {[FaFacebookF, FaTwitter, FaInstagram, FaYoutube].map(
                (Icon, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow hover:bg-blue-600 hover:text-white cursor-pointer transition"
                  >
                    <Icon size={14} />
                  </div>
                )
              )}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-gray-800">
              Products
            </h3>

            <ul className="space-y-2 text-sm text-gray-500">
              {[
                "Prices Drop",
                "New Products",
                "Best Sales",
                "Contact Us",
                "Stores",
              ].map((item, i) => (
                <li
                  key={i}
                  className="hover:text-blue-600 hover:translate-x-1 transition cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-gray-800">
              Company
            </h3>

            <ul className="space-y-2 text-sm text-gray-500">
              {[
                "About Us",
                "Delivery Info",
                "Privacy Policy",
                "Terms & Conditions",
                "Secure Payment",
                "Login",
              ].map((item, i) => (
                <li
                  key={i}
                  className="hover:text-blue-600 hover:translate-x-1 transition cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-gray-800">
              Newsletter
            </h3>

            <p className="text-sm text-gray-500 mb-4">
              Subscribe to get latest deals & offers.
            </p>

            <div className="flex border rounded-md overflow-hidden">
              <input
                type="email"
                placeholder="Enter email"
                className="flex-1 px-3 py-2 text-sm outline-none"
              />
              <button className="bg-blue-600 text-white px-4 text-sm hover:bg-blue-700 transition">
                Join
              </button>
            </div>

            <div className="flex items-start gap-2 mt-3 text-xs text-gray-500">
              <input type="checkbox" />
              <p>I agree to terms & privacy policy</p>
            </div>
          </div>

        </div>

        <div className="mt-10 border-t pt-6 px-6 max-w-[1300px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">

         
          <div className="flex gap-3 text-xs text-gray-500">
            <span>We Accept:</span>
            <span className="bg-white px-2 py-1 rounded shadow">VISA</span>
            <span className="bg-white px-2 py-1 rounded shadow">Mastercard</span>
            <span className="bg-white px-2 py-1 rounded shadow">UPI</span>
            <span className="bg-white px-2 py-1 rounded shadow">PayPal</span>
          </div>

        
          <p className="text-xs text-gray-400">
            © 2025 Cartify. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;