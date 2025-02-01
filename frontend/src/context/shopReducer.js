export const shopReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingCartItem = state.cart.find(
        (item) => item.id === action.payload.id
      );

      if (existingCartItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };
    }
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };

    case "UPDATE_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case "SET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };

    case "SET_CURRENT_PRODUCT":
      return {
        ...state,
        currentProduct: action.payload,
      };

    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };

    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };

    case "UPDATE_CART_TOTALS":
      return {
        ...state,
        totalItems: action.payload.totalItems,
        totalAmount: action.payload.totalAmount,
      };

    default:
      return state;
  }
};
