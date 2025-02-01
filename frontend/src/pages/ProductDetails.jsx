import { useParams } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import ProductDisplay from "../components/ProductDisplay/ProductDisplay";
import RelatedProducts from "../components/RelatedProducts/RelatedProducts";
import "./CSS/ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const { products, isLoading } = useShop();

  if (isLoading)
    return <div className="product-details-container">Loading...</div>;

  const product = products.find((p) => p._id === id);
  if (!product)
    return <div className="product-details-container">Product not found</div>;

  const relatedProducts = products
    .filter((p) => p.category === product.category && p._id !== id)
    .slice(0, 4);

  return (
    <div className="product-details-container">
      <div className="product-details">
        <ProductDisplay product={product} />
        {relatedProducts.length > 0 && (
          <div className="related-products-section">
            <h2>You may also like</h2>
            <RelatedProducts products={relatedProducts} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
