import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Actions
    addToCart: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeFromCart: (state, action) => {
      const index = state.items.findIndex(
        (cartItem) => cartItem._id === action.payload
      );

      let newCart = [...state.items];

      if (index >= 0) {
        // Item found in the bag..remove it
        newCart.splice(index, 1);
      } else {
        console.warn(
          `Can't remove product (id: ${action.payload}) as it is not in the bag`
        );
      }
      state.items = newCart;
    },
    emptyCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, emptyCart } = cartSlice.actions;

// Selectors- This is how we pull information from the global store slice
export const selectItems = (state) => state.cart.items;
export const selectTotal = (state) =>
  state.cart.items.reduce((total, item) => total + item.price, 0);

export default cartSlice.reducer;
