"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "q5botjdg",
  dataset: "production",
  useCdn: true,
  apiVersion: "2023-01-01",
});

interface Product {
  _id: string;
  title: string;
  tags: string[];
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      const query = `*[_type == "products"]{ _id, title, tags }`;
      try {
        const result = await client.fetch<Product[]>(query);
        setProducts(result);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const totalItems = cart.reduce(
        (acc: number, item: { quantity: number }) => acc + item.quantity,
        0
      );
      setCartCount(totalItems);
    };

    updateCartCount();
    window.addEventListener("storage", updateCartCount);
    return () => window.removeEventListener("storage", updateCartCount);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const lowerCaseQuery = query.toLowerCase();
    setFilteredProducts(
      products.filter(
        (product) =>
          product.title.toLowerCase().includes(lowerCaseQuery) ||
          product.tags.some((tag) => tag.toLowerCase().includes(lowerCaseQuery))
      )
    );
  };

  return (
    <header className="w-full max-w-full overflow-x-hidden">
      {/* Top Shipping Info */}
      <div className="bg-[#272343] w-full h-[45px] flex items-center justify-between px-4 md:px-12 text-white text-xs sm:text-sm">
      {/* Left Side (Shipping Info) */}
      <p className="text-center w-full md:w-auto">Free Shipping On All Orders Over $50</p>

      {/* Right Side (Links) - Hidden on Small Screens */}
      <div className="hidden md:flex gap-4">
        <span className="cursor-pointer hover:underline">Eng ▼</span>
        <Link href="/faqs" className="hover:underline">FAQs</Link>
        <Link href="/contactus" className="hover:underline">Need Help</Link>
      </div>
    </div>

      {/* Logo, Search, and Cart */}
      <div className="bg-[#F0F2F3] w-full py-3 flex justify-between items-center px-4 md:px-12">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/Logo.png" alt="Comforty Logo" width={40} height={40} />
          <span className="text-lg md:text-2xl font-semibold text-black">Comforty</span>
        </Link>

        {/* Search Bar */}
        <div className="relative hidden md:block w-72 lg:w-96">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            onFocus={() => setIsSearchOpen(true)}
            onBlur={() => setTimeout(() => setIsSearchOpen(false), 200)}
            className="p-2 border rounded-md w-full focus:outline-none pl-10"
          />
          <div className="absolute top-2 left-2">
            <Image src="/search.png" alt="Search Icon" width={16} height={16} />
          </div>
          {isSearchOpen && searchQuery && (
            <div className="absolute top-10 left-0 w-full bg-white shadow-md border rounded-md z-50">
              {filteredProducts.length > 0 ? (
                <ul>
                  {filteredProducts.map((product) => (
                    <li key={product._id} className="p-2 hover:bg-gray-100">
                      <Link href={`/products/${product._id}`}>{product.title}</Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="p-2 text-sm text-gray-500">No products found.</p>
              )}
            </div>
          )}
        </div>

        {/* Cart & Wishlist */}
        <div className="flex items-center space-x-4">
          <Link href="/cart">
            <div className="cursor-pointer bg-white border px-3 py-2 rounded-md flex items-center gap-2 shadow-sm hover:border-[#007580] transition">
              <Image src="/cart.png" alt="Cart Icon" width={20} height={20} />
              <span className="hidden sm:block text-black">Cart</span>
              <span className="bg-[#007580] text-white text-xs px-2 py-1 rounded-full">{cartCount}</span>
            </div>
          </Link>

          <Link href="/wishlist">
            <div className="cursor-pointer bg-white border px-3 py-2 rounded-md flex items-center gap-2 shadow-sm hover:border-[#007580] transition">
              <Image src="/Frame.png" alt="Wishlist Icon" width={20} height={20} />
              <span className="hidden sm:block text-black">Wishlist</span>
            </div>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex flex-col space-y-1 cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-6 h-1 bg-black"></div>
            <div className="w-6 h-1 bg-black"></div>
            <div className="w-6 h-1 bg-black"></div>
          </button>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="bg-white w-full max-w-full md:h-[74px] flex flex-col md:flex-row justify-between items-center px-4 md:px-12">
        {/* Mobile Menu */}
        <ul className={`md:hidden bg-white border-t border-gray-200 shadow-lg transition-all duration-300 ease-in-out ${isMenuOpen ? "block" : "hidden"}`}>
          {["Home", "Shop", "Products", "Pages", "About"].map((item) => (
            <li key={item} className="border-b border-gray-200">
              <Link href={item === "Home" ? "/" : `/${item.toLowerCase()}`} className="block px-4 py-2 text-black hover:bg-gray-100 hover:text-[#007580]" onClick={() => setIsMenuOpen(false)}>
                {item}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          {["Home", "Shop", "Products", "Pages", "About"].map((item) => (
            <li key={item}>
              <Link href={item === "Home" ? "/" : `/${item.toLowerCase()}`} className="text-black hover:text-[#007580] text-base transition">
                {item}
              </Link>
            </li>
          ))}
        </ul>

        {/* Contact Info */}
        <div className="hidden md:block text-black text-base">
          Contact: <span className="font-semibold">(808) 555-0111</span>
        </div>
      </nav>
    </header>
  );
};

export default Header;
