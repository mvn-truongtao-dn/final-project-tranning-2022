import { Layout, Menu } from "antd";
import {
  DesktopOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";
import { useState } from "react";
import { Link } from "react-router-dom";
const { Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem(<Link to="/">Dashboard</Link>, "1", <DesktopOutlined />),
  getItem(<Link to="/users">Users</Link>, "2", <UserOutlined />),
  // getItem("Team", "sub2", <TeamOutlined />, [
  //   getItem("Team 1", "6"),
  //   getItem("Team 2", "8"),
  // ]),
];

function SidebarMenu() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={() => setCollapsed(!collapsed)}
    >
      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={items}
      />
    </Sider>
  );
}

export default SidebarMenu;
