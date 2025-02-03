"use client";

import BackgroundImage from "../../../components/backgroundimage";
import Companies from "../../../components/companies";
import FeaturedProducts from "../../../components/featuredproducts";
import TopCategories from "../../../components/topcategories";
import Hero from "../../../components/hero";
import ProductGrid from "../../../components/productgrid";

const Home = () => {
  return (
    <div className="relative bg-white flex flex-col items-center">
      <div className="w-full max-w-7xl mx-auto">
        <BackgroundImage />
        <Companies />
        <FeaturedProducts />
        <TopCategories />
        <Hero />
        <ProductGrid />
      </div>
    </div>
  );
};

export default Home;
