import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};
export const userLoginSlice = createSlice({
  name: "userLogin",
  initialState,
  reducers: {
    getUserLogin: (state, action) => {
      console.log(`getUserLogin ${action.payload}`);
      state.value = action.payload;
    },
  },
});

export const { getUserLogin } = userLoginSlice.actions;
export default userLoginSlice.reducer;
