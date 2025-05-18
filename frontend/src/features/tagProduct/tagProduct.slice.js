import { getTagProducts } from "./tag-product.api";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const fetchTagProducts = createAsyncThunk(
  "tagProducts/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getTagProducts();
      return res;
    } catch (err) {
      return rejectWithValue(err.message || "Failed to fetch tagProducts");
    }
  }
);
const initialState = {
  tagItems: {},
  loading: false,
  error: null,
};
const tagProductSlice = createSlice({
  name: "tag-products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTagProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTagProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.tagItems = action.payload.data;
      })
      .addCase(fetchTagProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default tagProductSlice.reducer;
