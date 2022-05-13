import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  value: [],
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    getListUsers: (state, action) => {
      console.log(action.payload);
      state.value = [...action.payload];
    },
    postUser: (state, action) => {
      console.log("postuser");
      console.log(action.payload);
      const data = {
        id: `${action.payload.id_new}`,
        ...action.payload.data,
      };
      state.value.push(data);
      console.log(state.value);
    },
    detailsUser: (state, action) => {},
    updateUser: (state, action) => {
      console.log("updateuser");
      const index = state.value.findIndex(
        (object) => object.id === action.payload.key
      );
      console.log(index);
      console.log(action.payload.data);
      state.value[index] = {
        ...state.value[index],
        ...action.payload.data,
      };
    },
    deleteUser: (state, action) => {
      const index = state.value.findIndex(
        (object) => object.id === action.payload.key
      );
      console.log(index);
      state.value.splice(index, 1);
    },
  },
});

export const { getListUsers, postUser, detailsUser, updateUser, deleteUser } =
  userSlice.actions;
export default userSlice.reducer;
