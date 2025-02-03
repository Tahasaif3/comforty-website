"use client";

import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import the router

interface Product {
  _id: string;
  title: string;
  price: number;
  oldPrice?: number;
  isNew?: boolean;
  isOnSale?: boolean;
  image_url: string;
}

// Fetch Products from Sanity
const getProducts = async (): Promise<Product[]> => {
  const query = `*[_type == "products"]{
    _id,
    title,
    price,
    oldPrice,
    isNew,
    isOnSale,
    "image_url": image.asset->url
  }[0...8]`; // Limit to 8 products

  return await client.fetch<Product[]>(query);
};

const ProductGrid = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter(); // Initialize router

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
      setIsLoading(false); // Stop loading once the data is fetched
    };

    fetchProducts();
  }, []);

  // Click handler to navigate to product details page
  const handleProductClick = (id: string) => {
    router.push(`/products/${id}`); // Route to the product details page
  };

  return (
    <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-8 md:px-16 py-8 sm:py-16">
      <h2 className="text-2xl font-bold mb-4 sm:mb-6 text-[#272343] text-center">Our Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {isLoading ? (
          // Skeleton loader when data is still loading
          Array(4)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="animate-pulse space-y-4 bg-gray-300 rounded-lg p-4"
              >
                <div className="bg-gray-200 h-[250px] sm:h-[300px] rounded-lg"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))
        ) : products.length > 0 ? (
          // Display products when they are available
          products.map((product) => (
            <div
              key={product._id}
              className="relative group rounded-lg overflow-hidden border border-gray-200 shadow-md hover:shadow-lg transition"
              onClick={() => handleProductClick(product._id)} // Add click handler
            >
              {/* Badge */}
              {product.isNew && (
                <div className="absolute top-2 left-2 text-white text-xs px-2 py-1 rounded-md font-medium bg-[#1DBF73]">
                  New
                </div>
              )}
              {product.isOnSale && (
                <div className="absolute top-2 left-2 text-white text-xs px-2 py-1 rounded-md font-medium bg-[#F97316]">
                  Sale
                </div>
              )}

              {/* Product Image */}
              <Image
                src={product.image_url || "/placeholder.png"}
                alt={product.title}
                width={300}
                height={300}
                className="object-cover w-full h-[250px] sm:h-[300px] transition-transform group-hover:scale-105"
              />

              {/* Product Info */}
              <div className="flex justify-between items-center px-4 py-3 bg-white">
                <div>
                  <p className="text-sm text-gray-700 group-hover:text-[#029FAE] transition cursor-pointer">
                    {product.title}
                  </p>
                  <p className="text-lg font-bold mt-1 group-hover:text-[#029FAE] transition cursor-pointer">
                    {`$${product.price.toFixed(2)}`}
                  </p>
                </div>
                <div className="hover:bg-[#029FAE] bg-gray-200 p-2 rounded-full transition">
                  <Image
                    src="/cart.png"
                    alt="Cart Icon"
                    width={20}
                    height={20}
                    className="text-white"
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full">No products available.</p>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;
