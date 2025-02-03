"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { client } from "@/sanity/lib/client";

interface Category {
  _id: string;
  title: string;
  productCount: number;
  imageUrl: string;
}

const TopCategories = () => {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const query = `*[_type == "categories"]{
          _id,
          title,
          "productCount": count(*[_type == "products" && references(^._id)]),
          "imageUrl": image.asset->url
        }`;

        const fetchedCategories = await client.fetch<Category[]>(query);
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryTitle: string) => {
    router.push(`/category/${encodeURIComponent(categoryTitle)}`);
  };

  if (!isMounted) return null;

  return (
    <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-8 md:px-16 py-8 sm:py-16">
      <h2 className="text-2xl font-bold mb-4 sm:mb-6 text-[#272343]">Top Categories</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {isLoading ? (
          Array(3)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="animate-pulse bg-gray-300 h-[250px] sm:h-[300px] rounded-lg"></div>
            ))
        ) : categories.length > 0 ? (
          categories.map((category) => (
            <div
              key={category._id}
              onClick={() => handleCategoryClick(category.title)}
              className="relative group cursor-pointer overflow-hidden rounded-lg"
            >
              <Image
                src={category.imageUrl || "/placeholder.png"}
                alt={category.title}
                width={400}
                height={300}
                className="object-cover w-full h-[250px] sm:h-[300px] group-hover:scale-105 transition-transform"
              />
              <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 p-4 text-white">
                <p className="text-lg font-medium">{category.title}</p>
                <p className="text-sm">{category.productCount.toLocaleString()} Products</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full">No categories available.</p>
        )}
      </div>
    </section>
  );
};

export default TopCategories;
