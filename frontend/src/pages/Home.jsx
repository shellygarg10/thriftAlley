import Hero from "../components/Hero/Hero";
import Brands from "../components/Brands/Brands";
import Popular from "../components/Popular/Popular";
import WhyShop from "../components/WhyShop/WhyShop";
import Resell from "../components/Resell/Resell";

const Home = () => {
  return (
    <div>
      <Hero />
      <Brands />
      <Popular />
      <WhyShop />
      <Resell />
    </div>
  );
};

export default Home;
