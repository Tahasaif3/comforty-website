"use client";

import Link from "next/link";

const BackgroundImage = () => {
  return (
    <div
      className="relative w-full max-w-[1400px] mx-auto min-h-[350px] sm:min-h-[500px] xl:min-h-[600px] bg-cover bg-center flex items-center justify-between pt-12 sm:pt-16 xl:pt-20 2xl:pt-24 px-4 sm:px-8 md:px-16 mb-8 sm:mb-16"
      style={{ backgroundImage: "url('/BG.png')" }}
    >
      {/* Left Side: Text */}
      <div className="max-w-lg text-left">
        {/* Small Heading */}
        <div className="text-[12px] sm:text-[14px] tracking-[12%] text-[#272343] uppercase font-medium">
          <h1>Welcome to Chairy</h1>
        </div>

        {/* Main Heading */}
        <div className="text-[24px] sm:text-[40px] md:text-[50px] lg:text-[60px] font-bold text-[#272343] mt-4 leading-[1.2]">
          <h2>
            Best Furniture<br />
            Collection For Your<br />
            Interior.
          </h2>
        </div>

        {/* Button */}
        <div className="mt-6 sm:mt-8">
          <Link href="/shop">
            <button className="bg-[#029FAE] text-white px-6 py-3 text-sm sm:text-lg font-semibold rounded-full flex items-center gap-2 hover:bg-[#027F84] transition">
              Shop Now
              <span className="text-xl">→</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BackgroundImage;
