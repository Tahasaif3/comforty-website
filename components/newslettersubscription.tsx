import Image from "next/image";

const NewsletterSubscription = () => {
  return (
    <div className="bg-gray-50 py-10">
      {/* Subscribe Section */}
      <div className="flex flex-col items-center justify-center px-4">
        <h2 className="text-3xl font-bold text-center mb-6">
          Or Subscribe To The Newsletter
        </h2>
        <div className="flex items-center w-full max-w-2xl">
          {/* Email Input Field */}
          <input
            type="email"
            placeholder="Email Address..."
            className="w-full bg-gray-50 text-gray-500 text-sm py-3 px-1 border-b-2 border-black outline-none placeholder-gray-400"
          />
          {/* Submit Button */}
          <button className="text-sm text-gray-700 font-medium py-3 px-4 ml-4 border-b-2 border-black">
            SUBMIT
          </button>
        </div>
      </div>

      {/* Instagram Section */}
      <div className="text-center mt-16 px-4">
        <h2 className="text-3xl font-bold mb-6">
          Follow Products And Discounts On Instagram
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 max-w-6xl mx-auto">
          {/* Image 1 */}
          <div className="relative w-full h-48">
            <Image
              src="/wooden-chair.png"
              alt="Chair 1"
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </div>
          {/* Image 2 */}
          <div className="relative w-full h-48">
            <Image
              src="/brown-chair.png"
              alt="Chair 2"
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </div>
          {/* Image 3 */}
          <div className="relative w-full h-48">
            <Image
              src="/Image (1).png"
              alt="Chair 3"
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </div>
          {/* Image 4 */}
          <div className="relative w-full h-48">
            <Image
              src="/Image (3).png"
              alt="Chair 4"
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </div>
          {/* Image 5 */}
          <div className="relative w-full h-48">
            <Image
              src="/green-chair.png"
              alt="Chair 5"
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </div>
          {/* Image 6 */}
          <div className="relative w-full h-48">
            <Image
              src="/desk-chair.png"
              alt="Chair 6"
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSubscription;
