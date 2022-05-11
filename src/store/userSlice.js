import { createSlice } from "@reduxjs/toolkit";
import a, { groupBy, values } from "lodash";
import moment from "moment";
const initialState = {
  value: [],
  chart: [],
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
      // console.log(action.payload);
      console.log("updateuser");
      const index = state.value.findIndex(
        (object) => parseFloat(object.id) === parseFloat(action.payload.key)
      );
      console.log(index);
      console.log(action.payload.data);
      const {
        Firstname,
        Lastname,
        Age,
        Medicine,
        Phone,
        Result,
        TotalPrice,
        Gender,
      } = action.payload.data;
      const object = state.value[index];
      // object = {...object,...action.payload.data}
      state.value[index] = {
        ...state.value[index],
        ...action.payload.data,
      };
      // if (index !== -1) {
      //   object.Firstname = Firstname;
      //   object.Lastname = Lastname;
      //   object.Age = Age;
      //   object.Medicine = Medicine;
      //   object.Phone = Phone;
      //   object.Result = Result;
      //   object.TotalPrice = TotalPrice;
      //   object.Gender = Gender;
      // }
      // console.log(index);
      // console.log(action.payload);
    },
    deleteUser: (state, action) => {
      const index = state.value.findIndex(
        (object) => parseFloat(object.id) === action.payload.key
      );
      state.value.splice(index, 1);
    },
    chartUser: (state, action) => {
      state.value.map((item) => {
        item.createdAt = moment(item.createdAt).format("MMMM Do YYYY");
        const grouped = a.groupBy(state.value, "createdAt");
        const ketqua = a.mapValues(grouped, (o) => {
          return o.reduce((prev, current) => prev + current.TotalPrice, 0);
        });
        const value = Object.values(ketqua);
        const key = Object.keys(ketqua);
        // state.chart.value = [...value];
      });
      // state.chart.key = [...action.payload.key];
      // state.chart.value = [...action.payload.value];
    },
  },
});

export const {
  getListUsers,
  postUser,
  detailsUser,
  updateUser,
  deleteUser,
  chartUser,
} = userSlice.actions;
export default userSlice.reducer;
