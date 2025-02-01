import React from "react";
import "./Popular.css";
import { useShop } from "../../context/ShopContext";
import ProductCard from "../ProductCard/ProductCard";

const Popular = () => {
  const { products } = useShop();

  // popular based on higher discount
  const getPopularProducts = () => {
    if (!products?.length) return [];

    const productsWithDiscount = products.map((product) => ({
      ...product,
      discountPercent:
        ((product.old_price - product.new_price) / product.old_price) * 100,
    }));

    const sortedProducts = productsWithDiscount.sort(
      (a, b) => b.discountPercent - a.discountPercent
    );

    return sortedProducts.slice(0, 4);
  };

  const popularProducts = getPopularProducts();

  return (
    <div className="popular">
      <h1>POPULAR IN WOMEN</h1>
      <div className="popular-item">
        {popularProducts.map((item) => (
          <ProductCard key={item._id} product={item} />
        ))}
      </div>
    </div>
  );
};

export default Popular;
