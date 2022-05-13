import { Spin } from "antd";
import Layout, { Content, Footer } from "antd/lib/layout/layout";
import React from "react";
import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import HeaderCustom from "../../components/layouts/HeaderCustom/index.js";
import SidebarMenu from "../../components/layouts/SidebarMenu.js";
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
          <Suspense fallback={<Spin />}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/users" element={<Users />} />
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
