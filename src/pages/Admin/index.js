import { Spin } from "antd";
import Layout, { Content, Footer } from "antd/lib/layout/layout";
import React from "react";
import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import HeaderCustom from "../../components/layouts/HeaderCustom/index.js";
import SidebarMenu from "../../components/layouts/SidebarMenu.js";
import FormUser from "../../components/modules/FormUser.js/index.js";
import CreateUser from "./Users/CreateUser/inedx.js";
import UpdateUser from "./Users/UpdateUser/index.js";
// import Dashboard from "./Dashboard";
// import Users from "./Users";

const Dashboard = React.lazy(() => import("./Dashboard"));
const Users = React.lazy(() => import("./Users"));

export default function Admin() {
  return (
    <>
      <SidebarMenu></SidebarMenu>
      <Layout className="site-layout">
        <HeaderCustom />
        <Content className="page-main">
          <Suspense fallback={<Spin className="loading"/>}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="users" element={<Users />} />
              <Route path="users">
                <Route path=":userId">
                  <Route path="edit" element={<UpdateUser />} />
                </Route>
                <Route path="create" element={<CreateUser />} />
              </Route>
            </Routes>
          </Suspense>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Copy ©2022 Created by Truong
        </Footer>
      </Layout>
    </>
  );
}
