import Image from 'next/image';

export default function AboutUs() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center w-full px-4 py-8">
      {/* Text Section */}
      <div className="bg-[#007580] text-white p-8 rounded-lg flex flex-col h-full relative">
        <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold leading-none">
          About Us - Comforty
        </h2>
        <p className="text-sm lg:text-base mt-2 xl:text-lg">
          At Comforty, we believe that the right chair can transform your space and elevate your comfort. Specializing in ergonomic design, premium materials, and modern aesthetics, we craft chairs that seamlessly blend style with functionality.
        </p>
        <button
          className="absolute bottom-8 left-8 bg-[#1a7f88] text-white font-semibold shadow-md hover:bg-gray-100 transition-all duration-300"
          style={{
            width: '179px',
            height: '54px',
            borderRadius: '0px', // Removes rounded corners
          }}
        >
          View collection
        </button>
      </div>

      {/* Image Section */}
      <div className="rounded-lg overflow-hidden h-full">
        <Image
          src="/Image (3).png" // Replace with actual path or public folder image
          alt="Chair"
          width={500}
          height={500}
          className="w-full h-auto object-cover"
        />
      </div>
    </section>
  );
}
