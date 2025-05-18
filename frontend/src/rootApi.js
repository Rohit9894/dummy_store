import { cartApi } from "@/features/api/cart.api";
import { productApi } from "@/features/api/product.api";

export const allApis = [cartApi, productApi];

export const allApiReducers = allApis.reduce((acc, api) => {
  acc[api.reducerPath] = api.reducer;
  return acc;
}, {});

export const allApiMiddleware = allApis.map((api) => api.middleware);
