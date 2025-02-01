import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import "./CSS/Products.css";
import ProductCard from "../components/ProductCard/ProductCard";

const Products = () => {
  const { products, isLoading } = useShop();
  const [searchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Multiple selection filters
  const [selectedCategories, setSelectedCategories] = useState(
    searchParams.get("category") ? [searchParams.get("category")] : []
  );
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [sortCriteria, setSortCriteria] = useState("");

  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    if (categoryFromUrl) {
      setSelectedCategories([categoryFromUrl]);
    } else {
      setSelectedCategories([]);
    }
  }, [searchParams]);

  const getUniqueValues = (field) => {
    return [
      ...new Set(
        products.flatMap((product) =>
          Array.isArray(product[field]) ? product[field] : [product[field]]
        )
      ),
    ];
  };

  useEffect(() => {
    let result = [...products];

    if (selectedCategories.length > 0) {
      result = result.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    if (selectedBrands.length > 0) {
      result = result.filter((product) =>
        selectedBrands.includes(product.brand)
      );
    }

    if (selectedColors.length > 0) {
      result = result.filter((product) =>
        product.color.some((color) => selectedColors.includes(color))
      );
    }

    if (selectedSizes.length > 0) {
      result = result.filter((product) =>
        product.sizes.some((size) => selectedSizes.includes(size))
      );
    }

    if (sortCriteria) {
      switch (sortCriteria) {
        case "price-low-high":
          result.sort((a, b) => a.new_price - b.new_price);
          break;
        case "price-high-low":
          result.sort((a, b) => b.new_price - a.new_price);
          break;
        case "name-asc":
          result.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "name-desc":
          result.sort((a, b) => b.name.localeCompare(a.name));
          break;
        default:
          break;
      }
    }

    setFilteredProducts(result);
  }, [
    products,
    selectedCategories,
    selectedBrands,
    selectedColors,
    selectedSizes,
    sortCriteria,
  ]);

  const handleCheckboxChange = (setter, value) => {
    setter((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  if (isLoading) {
    return <div className="products-loading">Loading...</div>;
  }

  return (
    <div className="products">
      <div className="products-layout">
        <div className="filters-sidebar">
          <div className="filter-section">
            <h3>Categories</h3>
            <div className="filter-options">
              {getUniqueValues("category").map((category) => (
                <label key={category} className="filter-option">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() =>
                      handleCheckboxChange(setSelectedCategories, category)
                    }
                  />
                  {category}
                </label>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h3>Brands</h3>
            <div className="filter-options">
              {getUniqueValues("brand").map((brand) => (
                <label key={brand} className="filter-option">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() =>
                      handleCheckboxChange(setSelectedBrands, brand)
                    }
                  />
                  {brand}
                </label>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h3>Colors</h3>
            <div className="filter-options">
              {getUniqueValues("color").map((color) => (
                <label key={color} className="filter-option">
                  <input
                    type="checkbox"
                    checked={selectedColors.includes(color)}
                    onChange={() =>
                      handleCheckboxChange(setSelectedColors, color)
                    }
                  />
                  {color}
                </label>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h3>Sizes</h3>
            <div className="filter-options">
              {getUniqueValues("sizes").map((size) => (
                <label key={size} className="filter-option">
                  <input
                    type="checkbox"
                    checked={selectedSizes.includes(size)}
                    onChange={() =>
                      handleCheckboxChange(setSelectedSizes, size)
                    }
                  />
                  {size}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="products-content">
          <div className="sort-section">
            <select
              value={sortCriteria}
              onChange={(e) => setSortCriteria(e.target.value)}
            >
              <option value="">Sort By</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>
          </div>

          <div className="products-grid">
            {filteredProducts.length === 0 ? (
              <div className="no-products">No products found</div>
            ) : (
              filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
