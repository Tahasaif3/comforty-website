import AboutUs from '../../../components/aboutus';
import BrandFeatures from '../../../components/brandfeature';
import PopularProducts from '../../../components/popularproduct';

export default function Home() {
  return (
    <main className="flex flex-col items-center gap-16 px-4 py-10 lg:px-20">
      <AboutUs />
      <BrandFeatures />
      <PopularProducts />
    </main>
  );
}
