import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: string = '';

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setAuthToken: (state: string, action: PayloadAction<string>) => {
      return action.payload;
    },
    deleteAuthToken: () => {
      return '';
    },
  },
});

export const { setAuthToken, deleteAuthToken } = authSlice.actions;
export default authSlice.reducer;
