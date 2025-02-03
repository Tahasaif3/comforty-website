'use client';

import React, { useState, useEffect } from 'react';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { WishlistItem } from '@/context/WishlistContext'; // Make sure to import WishlistItem type

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart(); // Cart context to add items to the cart

  const [wishlistMessage, setWishlistMessage] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensures rendering happens only on the client
  }, []);

  // Function to handle adding item to cart
  const handleAddToCart = (item: WishlistItem) => {
    // Add the necessary quantity field to match CartItem
    const cartItem = { ...item, quantity: 1 }; // Adding quantity to WishlistItem
    addToCart(cartItem); // Add to cart using cart context
    setWishlistMessage(`Added ${item.title} to your cart!`); // Success message
    setTimeout(() => setWishlistMessage(null), 3000); // Hide message after 3 seconds
  };

  // Function to handle removing item from wishlist
  const handleRemoveFromWishlist = (id: string) => {
    removeFromWishlist(id);
    setWishlistMessage(`Removed from wishlist!`); // Success message
    setTimeout(() => setWishlistMessage(null), 3000); // Hide message after 3 seconds
  };

  if (!isClient) return null; // Avoids rendering during SSR

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 max-w-screen-lg">
      {/* Left - Wishlist Items */}
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-6">Wishlist</h1>

        {/* Wishlist success message */}
        {wishlistMessage && (
          <div className="bg-green-100 text-green-800 p-2 mb-4 rounded">
            {wishlistMessage}
          </div>
        )}

        {wishlist.length === 0 ? (
          <p className="text-gray-500">
            Your wishlist is empty.{" "}
            <Link href="/" className="text-blue-600">
              Continue Shopping
            </Link>
          </p>
        ) : (
          <div className="bg-white shadow-md rounded-lg p-6">
            {wishlist.map((item) => (
              <div key={item._id} className="flex flex-col sm:flex-row items-center border-b pb-4 mb-4 sm:mb-6">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={80}
                  height={80}
                  className="rounded mb-4 sm:mb-0 sm:mr-4"
                />

                {/* Product Details */}
                <div className="flex-1 text-center sm:text-left">
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="text-gray-500">Price: ${item.price}</p>
                </div>

                {/* Add to Cart & Remove Buttons */}
                <div className="flex gap-3 mt-4 sm:mt-0 sm:ml-4 justify-center sm:justify-start">
                  <button
                    className="text-gray-500 hover:text-teal-500"
                    onClick={() => handleAddToCart(item)}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="text-gray-500 hover:text-red-500"
                    onClick={() => handleRemoveFromWishlist(item._id)}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
