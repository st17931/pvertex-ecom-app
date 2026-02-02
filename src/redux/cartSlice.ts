import { createSlice } from '@reduxjs/toolkit';

interface itemType {
  id: number;
  title: string;
  price: number;
  image: string;
  size: string;
  color: string;
  qty: number;
}

const initialState: itemType[] = [];

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    addProductToCart: (state, action) => {
      const isItemAlreadyPresent = state.find(item => {
        return item.id === action.payload.id;
      });
      if (isItemAlreadyPresent) {
        let newArrayState = state.map(item => {
          if (item.id === action.payload.id) {
            const newItem = { ...item };
            newItem.qty = newItem.qty + 1;
            return newItem;
          }
          return item;
        });
        return newArrayState;
      } else {
        return [...state, action.payload];
      }
    },
    incQuantity: (state, action) => {
      let newArrayState = state.map(item => {
        if (item.id === action.payload) {
          const newItem = { ...item };
          newItem.qty = newItem.qty + 1;
          return newItem;
        }
        return item;
      });
      return newArrayState;
    },
    decQuantity: (state, action) => {
      let newArrayState = state
        .map(item => {
          if (item.id === action.payload) {
            if (item.qty === 1) {
              return null;
            }

            const newItem = { ...item };
            newItem.qty = newItem.qty - 1;
            return newItem;
          }
          return item;
        })
        .filter(item => item !== null);

      return newArrayState;
    },
  },
});

export const { addProductToCart, incQuantity, decQuantity } = cartSlice.actions;
export default cartSlice.reducer;
