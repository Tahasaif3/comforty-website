"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "../../../components/productcard";
import NewsletterSubscription from "../../../components/newslettersubscription";
import { client } from "@/sanity/lib/client";

interface Product {
  _id: string;
  title: string;
  price: number;
  oldPrice?: number;
  isNew?: boolean;
  isOnSale?: boolean;
  image_url: string;
}

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Loading state

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
      const fetchedProducts = await client.fetch<Product[]>(query);
      setProducts(fetchedProducts);
      setLoading(false); // Set loading to false after fetching
    };
    
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Our Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {loading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="p-4 bg-gray-300 animate-pulse rounded-lg"
            >
              <div className="h-40 bg-gray-200 mb-4"></div>
              <div className="h-4 bg-gray-200 mb-2"></div>
              <div className="h-4 bg-gray-200"></div>
            </div>
          ))
        ) : products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product._id}
              id={product._id}
              image={product.image_url || "/placeholder.png"}
              alt={product.title}
              title={product.title}
              price={`$${product.price.toFixed(2)}`}
              oldPrice={
                product.oldPrice ? `$${product.oldPrice.toFixed(2)}` : undefined
              }
              isNew={product.isNew}
              isOnSale={product.isOnSale}
            />
          ))
        ) : (
          <p className="text-center col-span-full">No products available.</p>
        )}
      </div>
      <NewsletterSubscription />
    </div>
  );
};

export default ProductsPage;
