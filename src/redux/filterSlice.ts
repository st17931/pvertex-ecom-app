import { createSlice } from '@reduxjs/toolkit';

type AnyObject = {
  [key: string]: any;
};

const initialState: AnyObject = {};

const filterSlice = createSlice({
  name: 'filterSlice',
  initialState,
  reducers: {
    addFilter: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { addFilter } = filterSlice.actions;
export default filterSlice.reducer;
