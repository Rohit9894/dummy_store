import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login, signup } from "./auth.api";
import { toast } from "@/hooks/use-toast";
import axiosInstance from "@/services/axiosInstance";

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (credentials) => {
    try {
      const res = await signup(credentials);
      if (res?.msg == "Register sucessfully") {
        toast({
          title: "✅ Registered successfully!",
          duration: 3000,
        });
      } else {
        toast({
          variant: "destructive",
          title: res?.msg || "Invalid credentials",
          duration: 3000,
        });
        return rejectWithValue(res?.msg || "Signup failed");
      }
    } catch (err) {
      if (err?.msg == "User already exists") {
        toast({
          variant: "destructive",
          title: "User already exist",
          duration: 3000,
        });
      }
      return rejectWithValue(err?.msg || "Signup error");
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await login(credentials);
      if (res?.msg == "Login successfully") {
        toast({
          title: "✅ Login successfully!",
          duration: 3000,
        });
      }
      return res.data;
    } catch (err) {
      console.log(err);
      if (err?.msg == "Invalid credetials") {
        toast({
          variant: "destructive",
          title: "Your username or password may be incorrect!",
          duration: 3000,
        });
      }
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const validateToken = createAsyncThunk(
  "auth/validateToken",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/auth/validate-token");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Session expired");
    }
  }
);

const initialState = {
  user: null,
  loading: true,
  error: null,
  isAuthenticated: false,
  cartCount: 0,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    incrementCartCount: (state) => {
      state.cartCount += 1;
    },
    decrementCartCount: (state) => {
      if (state.cartCount > 0) state.cartCount -= 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        (state.loading = false), (state.isAuthenticated = true);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(validateToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(validateToken.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload?.user?.user;
        state.cartCount = action.payload?.cartCount;
      })
      .addCase(validateToken.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});
export const { incrementCartCount, decrementCartCount } = authSlice.actions;
export default authSlice.reducer;
