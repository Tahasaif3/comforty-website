"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { client } from "@/sanity/lib/client"; // Import your Sanity client

interface Product {
  _id: string;
  name: string;
  price: number;
  image_url: string;
  width?: number;
  height?: number;
}

// Fetch the first 3 products from Sanity
const getPopularProducts = async (): Promise<Product[]> => {
  const query = `*[_type == "products"][0...3]{
    _id,
    name,
    price,
    "image_url": image.asset->url,
    width,
    height
  }`;

  return await client.fetch<Product[]>(query);
};

// Alt text function for images
const getAltText = (productName: string): string => {
  return `${productName} - High-quality product available in our store`; // Default alt text
};

export default function PopularProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getPopularProducts();
        console.log("Fetched products:", fetchedProducts); // Log the data to debug
        setProducts(fetchedProducts);
        setIsLoading(false); // Stop loading once data is fetched
      } catch (error) {
        console.error("Error fetching products:", error); // Log any errors
        setIsLoading(false); // Stop loading even if there's an error
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="w-full px-4 py-8">
      {/* Heading */}
      <h2 className="text-2xl lg:text-3xl text-gray-900 mb-8 font-semibold text-center">
        Our Popular Products
      </h2>

      {/* Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {isLoading ? (
          // Skeleton loader while fetching data
          Array(3)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="animate-pulse space-y-4 bg-gray-300 rounded-lg p-4"
              >
                <div className="bg-gray-200 h-[375px] w-full rounded-lg"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))
        ) : products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg overflow-hidden shadow-sm flex flex-col"
            >
              {/* Image */}
              <div className="w-full h-96 flex-grow">
                <Image
                  src={product.image_url || "/placeholder.png"}
                  alt={getAltText(product.name)} // Dynamic alt text function
                  width={product.width || 300} // Fallback width if undefined
                  height={product.height || 300} // Fallback height if undefined
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Product Details */}
              <div className="p-4">
                <h3 className="text-base text-gray-800">{product.name}</h3>
                <p className="text-[#007580] font-medium mt-2">{`$${product.price.toFixed(2)}`}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full">No popular products available.</p>
        )}
      </div>
    </section>
  );
}
