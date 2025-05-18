import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getContentBlocks } from "./contentBlock.api";

export const fetchContentBlocks = createAsyncThunk(
  "contentBlock/fetchProducts",
  async (query, { rejectWithValue }) => {
    try {
      const res = await getContentBlocks(query);
      return res;
    } catch (err) {
      return rejectWithValue(err.message || "Failed to fetch contentBlock");
    }
  }
);
const initialState = {
  data: [],
  loading: false,
  error: null,
};
const contentBlockSlice = createSlice({
  name: "contentBlock",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContentBlocks.pending, (state) => {
        (state.loading = true), (state.err = null);
      })
      .addCase(fetchContentBlocks.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchContentBlocks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default contentBlockSlice.reducer;
