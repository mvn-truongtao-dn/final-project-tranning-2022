import { configureStore } from "@reduxjs/toolkit";
import userLoginSlice from "./userLoginSlice";
import userSlice from "./userSlice";

export const store = configureStore({
  reducer: {
    users: userSlice,
    userLogin: userLoginSlice
  },
})
