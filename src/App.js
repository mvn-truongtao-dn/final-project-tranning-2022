import { Layout } from "antd";

import React, { useEffect } from "react";

import SidebarMenu from "./components/layouts/SidebarMenu.js";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Admin from "./pages/Admin/index.js";
import HeaderCustom from "./components/layouts/HeaderCustom/index.js";
import "./assets/scss/styles.scss";
import { apiUserGetList } from "./api/user/user.api.js";
import { getListUsers } from "./store/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
const { Header, Content, Footer, Sider } = Layout;

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    apiUserGetList().then((e) => {
      dispatch(getListUsers(e.data));
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
        <SidebarMenu></SidebarMenu>
        <Layout className="site-layout">
          <HeaderCustom />
          <Content className="page-main">
            <Routes>
              <Route path="/*" element={<Admin />} />
            </Routes>
          </Content>
          <Footer
            style={{
              textAlign: "center",
            }}
          >
            Copy ©2022 Created by Truong
          </Footer>
        </Layout>
      </Layout>
    </>
  );
}

export default App;
