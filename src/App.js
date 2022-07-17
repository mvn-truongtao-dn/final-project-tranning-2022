import { Layout } from "antd";

import React, { useEffect } from "react";

import { Route, Routes } from "react-router-dom";

import "./assets/scss/styles.scss";

import { apiUserGetList } from "./api/user/user.api.js";
import { getListUsers } from "./store/userSlice.js";
import { useDispatch } from "react-redux";
import PrivateRoute from "./core/guards/PrivateRoute.js";
import Login from "./pages/auth/Login";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    apiUserGetList().then((e) => {
      dispatch(getListUsers(e.data));
      console.log(e.data);
    });
    console.log(process.env.REACT_APP_TEST);
  }, []);
  return (
    <>
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Routes>
          <Route exact path="/*" element={<PrivateRoute />} />
          <Route path="login" element={<Login />}>
          </Route>
        </Routes>
      </Layout>
    </>
  );
}

export default App;
