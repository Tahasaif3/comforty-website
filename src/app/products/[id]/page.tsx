"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

interface Product {
  _id: string;
  title: string;
  price: number;
  oldPrice?: number;
  image_url: string;
  description: string;
  badge: string;
  tags: string[];
  inventory: number;
}

const ProductDetailPage = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      try {
        const query = `*[_type == "products" && _id == "${id}"][0]{
          _id,
          title,
          price,
          oldPrice,
          "image_url": image.asset->url,
          description,
          badge,
          tags,
          inventory
        }`;

        const fetchedProduct = await client.fetch<Product>(query);

        if (fetchedProduct) {
          setProduct(fetchedProduct);
        } else {
          console.error("Product not found.");
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        _id: product._id,
        title: product.title,
        price: product.price,
        image: product.image_url,
        quantity: 1,
      });

      setSuccessMessage("Product successfully added to cart!");
      setTimeout(() => setSuccessMessage(null), 3000); // Hide message after 3 seconds
    }
  };

  const handleAddToWishlist = () => {
    if (product) {
      addToWishlist({
        _id: product._id,
        title: product.title,
        price: product.price,
        image: product.image_url,
      });

      setSuccessMessage("Product successfully added to wishlist!");
      setTimeout(() => setSuccessMessage(null), 3000); // Hide message after 3 seconds
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {product ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Image */}
          <div className="relative">
            <Image
              src={product.image_url || "/placeholder.png"}
              alt={product.title}
              width={500}
              height={500}
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <p className="text-xl text-gray-700 mt-2">${product.price.toFixed(2)}</p>
            {product.oldPrice && (
              <p className="text-gray-500 line-through">${product.oldPrice.toFixed(2)}</p>
            )}
            <p className="mt-4 text-gray-600">{product.description}</p>

            {/* Badges */}
            {product.badge && (
              <span className="inline-block mt-2 text-sm bg-yellow-500 text-white px-3 py-1 rounded-full">
                {product.badge}
              </span>
            )}

            {/* Tags */}
            <div className="mt-4">
              <p className="font-semibold">Tags:</p>
              <div className="flex flex-wrap space-x-2">
                {product.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Inventory */}
            <p className="mt-4 text-gray-800">
              <strong>Inventory:</strong> {product.inventory} items available
            </p>

            {/* Buttons */}
            <div className="mt-6 flex space-x-4">
              <button
                onClick={handleAddToCart}
                className="bg-teal-500 text-white px-6 py-2 rounded-md hover:bg-teal-600"
              >
                Add to Cart
              </button>
              <button
                onClick={handleAddToWishlist}
                className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600"
              >
                Add to Wishlist
              </button>
            </div>

            {/* Success Message */}
            {successMessage && (
              <div className="mt-4 text-center text-white bg-green-500 p-2 rounded-md">
                {successMessage}
              </div>
            )}
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">Loading product details...</p>
      )}
    </div>
  );
};

export default ProductDetailPage;
