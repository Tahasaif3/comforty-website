"use client";

import Image from "next/image";

const Companies = () => {
  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-8 md:px-16 py-8 sm:py-16">
      <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6">
        {[...Array(6)].map((_, index) => (
          <Image
            key={index}
            src={`/Logo (${index + 1}).png`}
            alt={`Logo ${index + 1}`}
            width={100}
            height={50}
            className="h-[60px] sm:h-[80px] object-contain"
          />
        ))}
      </div>
    </div>
  );
};

export default Companies;
