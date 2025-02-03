"use client";

import React, { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import Image from "next/image";
import Link from "next/link";
import { CartItem } from "@/context/CartContext";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const { addToWishlist } = useWishlist();

  const [wishlistMessage, setWishlistMessage] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensures rendering happens only on the client
  }, []);

  // Function to handle adding item to wishlist
  const handleAddToWishlist = (item: CartItem) => {
    addToWishlist(item); // Add to wishlist
    setWishlistMessage(`Added ${item.title} to wishlist!`); // Success message
    setTimeout(() => setWishlistMessage(null), 3000); // Hide message after 3 seconds
  };

  if (!isClient) return null; // Avoids rendering during SSR

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 overflow-hidden">
      {/* Left - Cart Items */}
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-6">Bag</h1>

        {/* Wishlist success message */}
        {wishlistMessage && (
          <div className="bg-green-100 text-green-800 p-2 mb-4 rounded">
            {wishlistMessage}
          </div>
        )}

        {/* Skeleton Loader for Cart */}
        {cart.length === 0 ? (
          <div className="space-y-4">
            <div className="h-40 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
          </div>
        ) : (
          <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
            {cart.map((item) => (
              <div key={item._id} className="flex flex-col md:flex-row items-center border-b pb-4 mb-4">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={80}
                  height={80}
                  className="rounded"
                />
                
                {/* Product Details */}
                <div className="ml-4 flex-1 text-center md:text-left">
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="text-gray-500">Ashen Slate/Cobalt Bliss</p>
                  <p className="text-gray-500">Size: L</p>
                  
                  {/* Quantity Controls */}
                  <div className="flex items-center justify-center md:justify-start mt-2">
                    <button
                      className="bg-gray-300 text-gray-700 px-2 py-1 rounded"
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="mx-3">{item.quantity}</span>
                    <button
                      className="bg-gray-300 text-gray-700 px-2 py-1 rounded"
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <p className="text-lg font-semibold">MRP: ${item.price * item.quantity}</p>

                {/* Wishlist & Remove Buttons */}
                <div className="ml-4 flex gap-3">
                  <button
                    className="text-gray-500 hover:text-red-500"
                    onClick={() => handleAddToWishlist(item)}
                  >
                    ❤️
                  </button>
                  <button
                    className="text-gray-500 hover:text-red-500"
                    onClick={() => removeFromCart(item._id)}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right - Summary Section */}
      {cart.length > 0 && (
        <div className="w-full md:w-1/3 bg-white shadow-md rounded-lg p-6 mt-6 md:mt-0">
          <h2 className="text-2xl font-bold mb-4">Summary</h2>
          <div className="flex justify-between text-gray-500 mb-2">
            <p>Subtotal</p>
            <p>${cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</p>
          </div>
          <div className="flex justify-between text-gray-500 mb-4">
            <p>Estimated Delivery & Handling</p>
            <p>Free</p>
          </div>
          <hr />
          <div className="flex justify-between text-lg font-bold mt-4">
            <p>Total</p>
            <p>${cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</p>
          </div>
          <Link href="/checkout">
            <button className="mt-6 bg-teal-700 text-white px-6 py-3 rounded-md w-full">
              Member Checkout
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;
