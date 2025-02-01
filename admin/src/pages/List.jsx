import React, { useState, useEffect } from "react";
import { backendURL } from "../App";
import axios from "axios";
import { toast } from "react-toastify";
import "./CSS/List.css";

const List = ({ token }) => {
  const [list, setList] = useState([]);

  // Fetch product list from backend
  const fetchList = async () => {
    try {
      const response = await axios.get(backendURL + "/api/product/list", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error fetching products!");
    }
  };

  const handleRemoveProduct = async (id) => {
    try {
      const response = await axios.delete(backendURL + "/api/product/remove", {
        data: { id },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data) {
        toast.success("Product removed successfully!");
        setList(list.filter((product) => product._id !== id));
      } else {
        console.log(error);
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error removing product!");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list-container">
      <h2>Product List</h2>
      <table className="product-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Brand</th>
            <th>Price</th>
            <th>Old Price</th>
            <th>Colors</th>
            <th>Sizes</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {list.map((product) => (
            <tr key={product._id}>
              <td>
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
              </td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.brand}</td>
              <td>{product.new_price}</td>
              <td>{product.old_price}</td>
              <td>{product.color.join(", ")}</td>
              <td>{product.sizes.join(", ")}</td>
              <td>
                <button
                  className="remove-btn"
                  onClick={() => handleRemoveProduct(product._id)}
                >
                  &times;
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;
