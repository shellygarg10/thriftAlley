import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import "./RelatedProducts.css";

const RelatedProducts = ({ products }) => {
  return (
    <div className="related-products">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default RelatedProducts;
