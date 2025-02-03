"use client";

import { client } from "@/sanity/lib/client";
import ProductCard from "../components/productcard";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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
export const getProducts = async (): Promise<Product[]> => {
  const query = `*[_type == "products"][0...4]{
    _id,
    title,
    price,
    oldPrice,
    isNew,
    isOnSale,
    "image_url": image.asset->url
  }`;

  return await client.fetch<Product[]>(query);
};

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
      setIsLoading(false); // Stop loading once the data is fetched
    };

    fetchProducts();
  }, []);

  const handleProductClick = (id: string) => {
    router.push(`/products/${id}`);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
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
              onClick={() => handleProductClick(product._id)}
              className="cursor-pointer"
            >
              <ProductCard
                id={product._id}
                image={product.image_url || "/placeholder.png"}
                alt={product.title} // Use alt text for accessibility
                title={product.title}
                price={`$${product.price.toFixed(2)}`}
                oldPrice={
                  product.oldPrice ? `$${product.oldPrice.toFixed(2)}` : undefined
                }
                isNew={product.isNew}
                isOnSale={product.isOnSale}
              />
            </div>
          ))
        ) : (
          <p className="text-center col-span-full">No products available.</p>
        )}
      </div>
    </div>
  );
}
