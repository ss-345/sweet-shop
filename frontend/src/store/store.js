import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice.js";
import sweetsSlice from "./slices/sweetsSlice.js";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    sweets: sweetsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

// TypeScript types would go here if using TypeScript
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
