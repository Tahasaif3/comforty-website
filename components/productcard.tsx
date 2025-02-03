"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  id: string;
  image: string;
  title: string;
  price: string;
  oldPrice?: string;
  isNew?: boolean;
  isOnSale?: boolean;
  alt: string; // Add alt prop here
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  image,
  title,
  price,
  oldPrice,
  isNew,
  isOnSale,
  alt, // Destructure alt here
}) => {
  return (
    <div className="relative group rounded-lg overflow-hidden border border-gray-200 shadow-md hover:shadow-lg transition">
      {/* Label for New or Sale */}
      {(isNew || isOnSale) && (
        <div
          className={`absolute top-2 left-2 text-white text-xs px-2 py-1 rounded-md font-medium ${
            isNew ? "bg-[#1DBF73]" : "bg-[#F97316]"
          }`}
        >
          {isNew ? "New" : "Sale"}
        </div>
      )}

      {/* Image Section */}
      <Link href={`/products/${id}`}>
        <Image
          src={image}
          alt={alt} // Use the alt prop here
          width={300}
          height={300}
          className="object-cover w-full h-[250px] sm:h-[300px] transition-transform group-hover:scale-105"
        />
      </Link>

      {/* Product Info Section */}
      <div className="flex justify-between items-center px-4 py-3 bg-white">
        <div>
          <p className="text-sm text-gray-700 group-hover:text-[#029FAE] transition cursor-pointer">
            {title}
          </p>
          <p className="text-lg font-bold mt-1 group-hover:text-[#029FAE] transition cursor-pointer">
            {price}
            {oldPrice && (
              <span className="line-through text-gray-400 ml-2 text-sm">
                {oldPrice}
              </span>
            )}
          </p>
        </div>
        <Link href="/cart">
          <div className="hover:bg-[#029FAE] bg-gray-200 p-2 rounded-full transition">
            <Image
              src="/cart.png"
              alt="Cart Icon"
              width={20}
              height={20}
              className="text-white"
            />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
