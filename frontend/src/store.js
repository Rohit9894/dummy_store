import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "@/features/auth/auth.slice";
import ContentBlockReducer from "@/features/contentBlock/contentBlock.slice";
import TagProductReducer from "@/features/tagProduct/tagProduct.slice";

import { allApiReducers, allApiMiddleware } from "./rootApi";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    contentBlocks: ContentBlockReducer,
    tagProducts: TagProductReducer,
    ...allApiReducers,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(...allApiMiddleware),
});
