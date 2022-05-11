import { Dropdown, Menu, Space } from "antd";
import Layout, { Content, Header } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import React from "react";
import { Link } from "react-router-dom";
import style from"../../../assets/scss/styles.scss";

export default function HeaderCustom() {
  const menu = (
    <Menu
      items={[
        {
          label: <Link to="https://www.antgroup.com">LogOut</Link>,
        },
      ]}
    />
  );
  return (
    <Header className="site-layout-background page-header">
      <Layout>
        <Content></Content>
        <Sider className={style.headerRigtht}>
          {/* <Dropdown overlay={menu}>
            <Link to="/" onClick={(e) => e.preventDefault()}>
              <Space >Admin</Space>
            </Link>
          </Dropdown> */}
        </Sider>
      </Layout>
    </Header>
  );
}
