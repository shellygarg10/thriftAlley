import { useState } from "react";
import axios from "axios";
import upload_area from "../assets/upload_area.png";
import "./CSS/Add.css";
import { backendURL } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image, setImage] = useState(null);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("Tops");
  const [currentPrice, setCurrentPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [brand, setBrand] = useState("");

  const [colors, setColors] = useState([]);
  const [colorInput, setColorInput] = useState("");

  const [selectedSizes, setSelectedSizes] = useState([]);
  const sizes = ["S", "M", "L", "XL", "XXL"];

  const handleAddColor = () => {
    const color = colorInput.trim();
    if (color && !colors.includes(color)) {
      setColors((prevColors) => [...prevColors, color]);
      setColorInput("");
    }
  };

  const handleRemoveColor = (colorToRemove) => {
    setColors((prevColors) =>
      prevColors.filter((color) => color !== colorToRemove)
    );
  };

  const handleSizeChange = (e) => {
    const value = e.target.value;
    setSelectedSizes((prev) =>
      prev.includes(value)
        ? prev.filter((size) => size !== value)
        : [...prev, value]
    );
  };

  const resetForm = () => {
    setImage(null);
    setName("");
    setCategory("Tops");
    setCurrentPrice("");
    setOldPrice("");
    setBrand("");
    setColors([]);
    setColorInput("");
    setSelectedSizes([]);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!image) {
      toast.error("Image is required!");
      return;
    }
    if (!currentPrice || isNaN(currentPrice) || parseFloat(currentPrice) <= 0) {
      toast.error("Current price must be a valid positive number!");
      return;
    }
    if (!oldPrice || isNaN(oldPrice) || parseFloat(oldPrice) <= 0) {
      toast.error("Old price/MRP must be a valid positive number!");
      return;
    }
    if (selectedSizes.length === 0) {
      toast.error("At least one size is required!");
      return;
    }
    if (colors.length === 0) {
      toast.error("At least one colour is required!");
      return;
    }
    if (!brand.trim()) {
      toast.error("Brand is required!");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("new_price", parseFloat(currentPrice));
    formData.append("old_price", parseFloat(oldPrice));
    formData.append("image", image);
    formData.append("color", JSON.stringify(colors));
    formData.append("sizes", JSON.stringify(selectedSizes));
    formData.append("brand", brand);
    try {
      const response = await axios.post(
        backendURL + "/api/product/add",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data) {
        toast.success("Product added successfully!");
        resetForm();
      }
    } catch (error) {
      console.log(error);
      toast.error("There was an error adding the product.");
    }
  };

  return (
    <form className="add-form" onSubmit={onSubmitHandler}>
      <div className="form-group">
        <p>Upload Image</p>
        <label htmlFor="image">
          <img
            src={!image ? upload_area : URL.createObjectURL(image)}
            alt="Click to upload"
          />
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
          />
        </label>
      </div>

      <div className="form-group">
        <p>Product Name</p>
        <input
          type="text"
          placeholder="Type Here"
          required
          className="tall-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="form-group">
        <p>Product Category</p>
        <select
          className="tall-input"
          required
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Tops">Tops</option>
          <option value="Bottoms">Bottoms</option>
          <option value="Dresses">Dresses</option>
        </select>
      </div>

      <div className="form-group-inline">
        <div className="form-group">
          <p>Product Current Price</p>
          <input
            type="number"
            placeholder="100"
            required
            className="tall-input"
            value={currentPrice}
            onChange={(e) => setCurrentPrice(e.target.value)}
          />
        </div>
        <div className="form-group">
          <p>Product Old Price / MRP</p>
          <input
            type="number"
            placeholder="200"
            required
            className="tall-input"
            value={oldPrice}
            onChange={(e) => setOldPrice(e.target.value)}
          />
        </div>
      </div>

      <div className="form-group">
        <p>Available Sizes</p>
        <div className="size-checkboxes">
          {sizes.map((size) => (
            <label key={size}>
              <input
                type="checkbox"
                value={size}
                onChange={handleSizeChange}
                checked={selectedSizes.includes(size)}
              />
              {size}
            </label>
          ))}
        </div>
      </div>

      <div className="form-group">
        <p>Available Colors</p>
        <div className="color-input-wrapper">
          <input
            type="text"
            value={colorInput}
            onChange={(e) => setColorInput(e.target.value)}
            placeholder="Enter color"
            className="tall-input"
          />
          <button
            type="button"
            onClick={handleAddColor}
            className="add-color-button"
          >
            +
          </button>
        </div>
        <div className="color-tags">
          {colors.map((color, index) => (
            <span key={index} className="color-tag">
              {color}{" "}
              <button
                type="button"
                className="remove-color"
                onClick={() => handleRemoveColor(color)}
              >
                x
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="form-group">
        <p>Product Brand</p>
        <input
          type="text"
          placeholder="Type Brand Name"
          required
          className="tall-input"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
      </div>

      <button type="submit">ADD</button>
    </form>
  );
};

export default Add;
