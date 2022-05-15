import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Col, Dropdown, Menu, Row, Space } from "antd";
import Layout, { Content, Header } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import { concat, slice } from "lodash";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import style from "../../../assets/scss/styles.scss";
import useAuth from "../../../hooks/userAuth";

export default function HeaderCustom() {
  // const user = useSelector((state) => state.userLogin.value);
  // console.log(user);
  const user = localStorage.getItem("user");
  console.log(parseFloat(user));
  console.log();
  // userAfterReload = user;
  const { logout } = useAuth();
  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  };
  const menu = (
    <Menu
      items={[
        {
          label: (
            <Link to="https://www.antgroup.com">
              <span className="name-user">{user}</span>
            </Link>
          ),
        },
        {
          label: (
            <Link
              to="https://www.antgroup.com"
              className="btn-logout"
              onClick={handleLogout}
            >
              LogOut
            </Link>
          ),
        },
      ]}
    />
  );
  return (
    <Header className="site-layout-background page-header">
      <Layout>
        {/* <Content></Content>
        <Sider className={style.headerRigtht}></Sider> */}
        <Row>
        {/* span={6} offset={2} */}
          <Col span={22}  >
            <h1 className="title-admin">Wellcome to Admin</h1>
          </Col>
          {/* span={2} offset={14} */}
          <Col span={2}>
            <div className="info-user">
              <Dropdown overlay={menu} placement="bottomRight">
                <Button>
                  <UserOutlined />
                </Button>
              </Dropdown>
            </div>
          </Col>
        </Row>
      </Layout>
    </Header>
  );
}
