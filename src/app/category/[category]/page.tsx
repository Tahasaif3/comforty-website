"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import ProductCard from "../../../../components/productcard";

interface Product {
  _id: string;
  title: string;
  price: number;
  oldPrice?: number;
  isNew?: boolean;
  isOnSale?: boolean;
  image_url: string;
}

export default function CategoryPage() {
  const { category } = useParams();
  const router = useRouter();
  const decodedCategory = decodeURIComponent(category as string);

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!decodedCategory) return;

      const query = `*[_type == "products" && category->title == $category]{
        _id,
        title,
        price,
        oldPrice,
        isNew,
        isOnSale,
        "image_url": image.asset->url
      }`;

      try {
        const fetchedProducts = await client.fetch<Product[]>(query, { category: decodedCategory });
        setProducts(fetchedProducts);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [decodedCategory]);

  const handleProductClick = (productId: string) => {
    router.push(`/products/${productId}`);
  };

  return (
    <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-8 md:px-16 py-8 sm:py-16">
      <h2 className="text-2xl font-bold mb-4 sm:mb-6 text-[#272343]">
        {decodedCategory ? `Products in ${decodedCategory}` : "Products"}
      </h2>

      {isLoading ? (
        <p className="text-center">Loading products...</p>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="cursor-pointer"
              onClick={() => handleProductClick(product._id)}
            >
              <ProductCard
                id={product._id}
                image={product.image_url || "/placeholder.png"}
                alt={product.title}
                title={product.title}
                price={`$${product.price.toFixed(2)}`}
                oldPrice={product.oldPrice ? `$${product.oldPrice.toFixed(2)}` : undefined}
                isNew={product.isNew}
                isOnSale={product.isOnSale}
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No products available in this category.</p>
      )}
    </section>
  );
}
