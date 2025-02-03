import React from "react";
import Image from "next/image"; // Next.js Image component

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        {/* Heading Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Get In Touch With Us</h1>
          <p className="text-gray-600 text-sm">
            For More Information About Our Products & Services, Please Feel Free To Drop Us
            An Email. Our Staff Always Be There To Help You Out. Do Not Hesitate!
          </p>
        </div>

        {/* Contact Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Section */}
          <div className="space-y-8">
            {/* Address */}
            <div className="flex items-start space-x-4">
              <Image
                src="/location.png" // Replace with your address image
                alt="Address Icon"
                width={40}
                height={40}
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Address</h3>
                <p className="text-gray-600 text-sm">
                  236 5th SE Avenue, New York NY10000, United States
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start space-x-4">
              <Image
                src="/phone.png" // Replace with your phone image
                alt="Phone Icon"
                width={40}
                height={40}
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Phone</h3>
                <p className="text-gray-600 text-sm">
                  Mobile: +(+84) 546-6789 <br />
                  Hotline: +(+84) 456-6789
                </p>
              </div>
            </div>

            {/* Working Time */}
            <div className="flex items-start space-x-4">
              <Image
                src="/time.png" // Replace with your working time image
                alt="Working Time Icon"
                width={40}
                height={40}
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Working Time</h3>
                <p className="text-gray-600 text-sm">
                  Monday-Friday: 9:00 - 22:00 <br />
                  Saturday-Sunday: 9:00 - 21:00
                </p>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div>
            <form className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-gray-600 font-medium mb-1">Your Name</label>
                <input
                  type="text"
                  placeholder="Abc"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:ring-teal-500 focus:border-teal-500"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-600 font-medium mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="Abc@def.com"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:ring-teal-500 focus:border-teal-500"
                />
              </div>

              {/* Subject */}
              <div>
                <label className="block text-gray-600 font-medium mb-1">Subject</label>
                <input
                  type="text"
                  placeholder="This is optional"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:ring-teal-500 focus:border-teal-500"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-gray-600 font-medium mb-1">Message</label>
                <textarea
                  placeholder="Hi! I'd like to ask about..."
                  className="w-full border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:ring-teal-500 focus:border-teal-500"
                  rows={4}
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-teal-500 text-white font-medium py-2 px-4 rounded-md hover:bg-teal-600 transition duration-200"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {/* High Quality */}
          <div>
            <Image
              src="/trophy.png" // Replace with your high-quality image
              alt="High Quality Icon"
              width={64}
              height={64}
              className="mx-auto mb-2"
            />
            <h4 className="font-medium text-gray-800">High Quality</h4>
            <p className="text-gray-600 text-sm">Crafted from top materials</p>
          </div>

          {/* Warranty Protection */}
          <div>
            <Image
              src="/warranty.png" // Replace with your warranty image
              alt="Warranty Protection Icon"
              width={64}
              height={64}
              className="mx-auto mb-2"
            />
            <h4 className="font-medium text-gray-800">Warranty Protection</h4>
            <p className="text-gray-600 text-sm">Over 2 years</p>
          </div>

          {/* 24/7 Support */}
          <div>
            <Image
              src="/support.png" // Replace with your support image
              alt="24/7 Support Icon"
              width={64}
              height={64}
              className="mx-auto mb-2"
            />
            <h4 className="font-medium text-gray-800">24/7 Support</h4>
            <p className="text-gray-600 text-sm">Dedicated support</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
