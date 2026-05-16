import { useState } from "react";
import {
  FaSearch,
  FaBoxOpen,
  FaTruck,
  FaUndo,
  FaHeadset,
  FaCreditCard,
} from "react-icons/fa";

const Help = () => {
  const [query, setQuery] = useState("");

  const faqs = [
    {
      icon: <FaBoxOpen />,
      title: "How to place an order?",
      answer:
        "Browse products, add items to cart, and complete checkout securely.",
    },
    {
      icon: <FaTruck />,
      title: "How to track my order?",
      answer:
        "Visit the Track Order page and enter your Order ID to see live status updates.",
    },
    {
      icon: <FaUndo />,
      title: "What is the return policy?",
      answer:
        "Products can be returned within 7 days after delivery if eligible.",
    },
    {
      icon: <FaHeadset />,
      title: "How to contact support?",
      answer:
        "Reach us anytime at support@cartify.com for quick assistance.",
    },
    {
      icon: <FaCreditCard />,
      title: "Which payment methods are supported?",
      answer:
        "We support Cash on Delivery, UPI, Debit/Credit Cards, and Wallets.",
    },
    {
      icon: <FaTruck />,
      title: "How long does shipping take?",
      answer:
        "Orders are usually delivered within 3–7 business days.",
    },
    {
      icon: <FaUndo />,
      title: "Can I cancel my order?",
      answer:
        "Yes, orders can be cancelled before they are shipped.",
    },
    {
      icon: <FaCreditCard />,
      title: "Is online payment secure?",
      answer:
        "Yes, all online payments are protected with secure encryption.",
    },
  ];

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.title.toLowerCase().includes(query.toLowerCase()) ||
      faq.answer.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] py-10">

      <div className="max-w-7xl mx-auto px-4 md:px-6">

        <div className="bg-gradient-to-r from-[#0f172a] to-[#1e293b] rounded-3xl p-8 md:p-12 text-white mb-10 relative overflow-hidden">

          <div className="relative z-10">

            <p className="uppercase tracking-[3px] text-sm text-yellow-400 mb-3">
              Support Center
            </p>

            <h1 className="text-3xl md:text-5xl font-bold leading-tight max-w-2xl">
              How can we help you today?
            </h1>

            <p className="text-gray-300 mt-4 max-w-xl">
              Search FAQs, track orders, understand returns,
              payments, shipping, and more.
            </p>

            <div className="mt-8 max-w-2xl relative">

              <FaSearch className="absolute left-4 top-5 text-gray-400 text-sm z-10" />

              <input
                type="text"
                placeholder="Search help topics..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-white text-black rounded-xl pl-11 pr-4 py-4 outline-none border border-transparent focus:border-yellow-400 shadow-lg"
              />

              {query && (
                <div className="absolute top-full left-0 w-full bg-white rounded-xl shadow-2xl border mt-2 overflow-hidden z-50">

                  {filteredFaqs.length > 0 ? (

                    filteredFaqs.slice(0, 5).map((faq, index) => (
                      <div
                        key={index}
                        onClick={() => setQuery(faq.title)}
                        className="px-5 py-4 border-b last:border-b-0 hover:bg-gray-50 cursor-pointer transition"
                      >

                        <div className="flex items-start gap-3">

                          <div className="mt-1 text-gray-500">
                            {faq.icon}
                          </div>

                          <div>

                            <h4 className="font-medium text-[#0f172a]">
                              {faq.title}
                            </h4>

                            <p className="text-sm text-gray-500 line-clamp-1 mt-1">
                              {faq.answer}
                            </p>

                          </div>

                        </div>

                      </div>
                    ))

                  ) : (

                    <div className="p-5 text-center">

                      <div className="text-4xl mb-2">😕</div>

                      <p className="font-medium text-[#0f172a]">
                        No help topic found
                      </p>

                      <p className="text-sm text-gray-500 mt-1">
                        Try another keyword
                      </p>

                    </div>

                  )}

                </div>
              )}

            </div>

          </div>

          <div className="absolute -right-20 -top-20 w-72 h-72 bg-yellow-400/10 rounded-full"></div>
          <div className="absolute right-20 bottom-0 w-52 h-52 bg-white/5 rounded-full"></div>

        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">

          <div className="bg-white rounded-2xl p-5 border hover:shadow-lg transition cursor-pointer">

            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-xl mb-4">
              <FaTruck />
            </div>

            <h3 className="font-semibold text-[#0f172a]">
              Track Orders
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Real-time order tracking
            </p>

          </div>

          <div className="bg-white rounded-2xl p-5 border hover:shadow-lg transition cursor-pointer">

            <div className="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center text-xl mb-4">
              <FaUndo />
            </div>

            <h3 className="font-semibold text-[#0f172a]">
              Returns
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Easy return process
            </p>

          </div>

          <div className="bg-white rounded-2xl p-5 border hover:shadow-lg transition cursor-pointer">

            <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center text-xl mb-4">
              <FaCreditCard />
            </div>

            <h3 className="font-semibold text-[#0f172a]">
              Payments
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Secure checkout help
            </p>

          </div>

          <div className="bg-white rounded-2xl p-5 border hover:shadow-lg transition cursor-pointer">

            <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center text-xl mb-4">
              <FaHeadset />
            </div>

            <h3 className="font-semibold text-[#0f172a]">
              Support
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              24/7 customer care
            </p>

          </div>

        </div>

        <div className="mb-6 flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold text-[#0f172a]">
              Frequently Asked Questions
            </h2>

            <p className="text-gray-500 mt-1">
              Popular topics customers search for
            </p>

          </div>

          <span className="text-sm bg-black text-white px-4 py-2 rounded-full">
            {filteredFaqs.length} Topics
          </span>

        </div>

        {filteredFaqs.length === 0 ? (

          <div className="bg-white border rounded-2xl p-10 text-center shadow-sm">

            <div className="text-5xl mb-4">🔍</div>

            <h3 className="text-xl font-semibold text-[#0f172a]">
              No results found
            </h3>

            <p className="text-gray-500 mt-2">
              Try searching with another keyword.
            </p>

          </div>

        ) : (

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

            {filteredFaqs.map((faq, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >

                <div className="w-12 h-12 rounded-xl bg-[#f8fafc] flex items-center justify-center text-[#0f172a] text-xl mb-5 group-hover:bg-black group-hover:text-white transition">

                  {faq.icon}

                </div>

                <h3 className="text-lg font-semibold text-[#0f172a] mb-3">
                  {faq.title}
                </h3>

                <p className="text-sm leading-7 text-gray-600">
                  {faq.answer}
                </p>

              </div>
            ))}

          </div>

        )}

      </div>
    </div>
  );
};

export default Help;