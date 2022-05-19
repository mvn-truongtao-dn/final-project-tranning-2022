import { configureStore } from "@reduxjs/toolkit";
import userLoginSlice from "./userLoginSlice";
import userSlice from "./userSlice";
import { getDefaultMiddleware } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    users: userSlice,
    userLogin: userLoginSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),

})
