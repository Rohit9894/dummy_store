import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
let url = import.meta.env.VITE_BASEURL;

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: url, credentials: "include" }),
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (query) => ({
        url: "products",
        params: query,
      }),
      providesTags: ["Products"],
    }),
    searchProducts: builder.query({
      query: ({ search, page = 1, limit = 10 }) => ({
        url: "products",
        params: { page, limit, search, sortBy, order },
      }),
    }),
  }),
});

export const { useGetProductsQuery, useSearchProductsQuery } = productApi;
