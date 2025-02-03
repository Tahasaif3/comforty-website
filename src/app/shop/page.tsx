"use client";

import { client } from "@/sanity/lib/client";
import ProductCard from "../../../components/productcard";
import { useState, useEffect } from "react";

interface Product {
  _id: string;
  title: string;
  price: number;
  oldPrice?: number;
  isNew?: boolean;
  isOnSale?: boolean;
  image_url: string;
}

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const query = `*[_type == "products"]{
        _id,
        title,
        price,
        oldPrice,
        isNew,
        isOnSale,
        "image_url": image.asset->url
      }`;

      try {
        const fetchedProducts = await client.fetch<Product[]>(query);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false); // Stop loading once the data is fetched
      }
    };

    fetchProducts();
  }, []);

  return (
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
          <ProductCard
            key={product._id}
            id={product._id}
            image={product.image_url || "/placeholder.png"}
            alt={product.title} // Use alt text for accessibility
            title={product.title}
            price={`$${product.price.toFixed(2)}`}
            oldPrice={product.oldPrice ? `$${product.oldPrice.toFixed(2)}` : undefined}
            isNew={product.isNew}
            isOnSale={product.isOnSale}
          />
        ))
      ) : (
        <p className="text-center col-span-full">No products available.</p>
      )}
    </div>
  );
}
