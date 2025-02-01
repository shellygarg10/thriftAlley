import { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ShopContext = createContext();

const backendURL = import.meta.env.VITE_BACKEND_URL;

const shopReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const { _id, selectedSize } = action.payload;
      const existingItemIndex = state.cart.findIndex(
        (item) => item._id === _id && item.selectedSize === selectedSize
      );

      if (existingItemIndex !== -1) {
        // Item exists, update quantity
        const updatedCart = state.cart.map((item, index) => {
          if (index === existingItemIndex) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
        return { ...state, cart: updatedCart };
      } else {
        // Add new item
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, quantity: 1 }],
        };
      }
    }

    case "REMOVE_FROM_CART": {
      const { productId, selectedSize } = action.payload;
      const updatedCart = state.cart.filter(
        (item) =>
          !(item._id === productId && item.selectedSize === selectedSize)
      );
      return { ...state, cart: updatedCart };
    }

    case "UPDATE_CART_ITEM_QUANTITY": {
      const { productId, selectedSize, quantity } = action.payload;
      const updatedCart = state.cart.map((item) => {
        if (item._id === productId && item.selectedSize === selectedSize) {
          return { ...item, quantity };
        }
        return item;
      });
      return { ...state, cart: updatedCart };
    }

    case "SET_PRODUCTS": {
      return { ...state, products: action.payload };
    }

    case "SET_LOADING": {
      return { ...state, isLoading: action.payload };
    }

    case "SET_ERROR": {
      return { ...state, error: action.payload };
    }

    case "SET_CURRENT_PRODUCT": {
      return { ...state, currentProduct: action.payload };
    }

    case "UPDATE_CART_TOTALS": {
      return {
        ...state,
        totalAmount: action.payload.totalAmount,
        totalItems: action.payload.totalItems,
      };
    }

    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
      };

    default:
      return state;
  }
};

export const ShopProvider = ({ children }) => {
  const [state, dispatch] = useReducer(shopReducer, {
    cart: [],
    products: [],
    currentProduct: null,
    isLoading: false,
    error: null,
    totalAmount: 0,
    totalItems: 0,
  });

  // Fetch products
  const fetchProducts = async () => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const response = await axios.get(`${backendURL}/api/product/list`);

      if (response.data) {
        dispatch({ type: "SET_PRODUCTS", payload: response.data.products });
      } else {
        toast.error("Error fetching products");
        dispatch({ type: "SET_ERROR", payload: "Failed to fetch products" });
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Error fetching products!");
      dispatch({ type: "SET_ERROR", payload: error.message });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Calculate cart totals
  const updateCartTotals = () => {
    const totalItems = state.cart.reduce(
      (total, item) => total + item.quantity,
      0
    );
    const totalAmount = state.cart.reduce(
      (total, item) => total + item.new_price * item.quantity,
      0
    );
    dispatch({
      type: "UPDATE_CART_TOTALS",
      payload: { totalItems, totalAmount },
    });
  };

  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
    updateCartTotals();
    toast.success("Added to cart!");
  };

  const removeFromCart = (productId, selectedSize) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: { productId, selectedSize },
    });
    updateCartTotals();
    toast.success("Removed from cart!");
  };

  const updateCartItemQuantity = (productId, selectedSize, quantity) => {
    dispatch({
      type: "UPDATE_CART_ITEM_QUANTITY",
      payload: { productId, selectedSize, quantity },
    });
    updateCartTotals();
  };

  const setCurrentProduct = (product) => {
    dispatch({ type: "SET_CURRENT_PRODUCT", payload: product });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const value = {
    ...state,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    setCurrentProduct,
    fetchProducts,
    clearCart,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
};
