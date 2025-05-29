import React, { useState } from "react";
import { Layout, Menu, Button, Avatar, Dropdown } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  LineChartOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useUserProfile } from "../../hooks";
import { ItemType } from "antd/es/menu/interface";
import { useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const { data: userProfile } = useUserProfile();

  const menuItems = [
    {
      key: "home",
      icon: <HomeOutlined />,
      label: "Home",
      onClick: () => {
        navigate("/");
      },
    },
    {
      key: "markets",
      icon: <LineChartOutlined />,
      label: "Markets",
      onClick: () => {
        navigate("/markets");
      },
    },
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Profile",
      onClick: () => {
        navigate("/profile");
      },
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Settings",
      onClick: () => {
        navigate("/settings");
      },
    },
  ];

  const userMenuItems = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Profile",
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Settings",
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
    },
  ];

  return (
    <Layout className="min-h-screen w-full">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="bg-gray-800"
      >
        <div className="h-16 flex items-center justify-center">
          <h1 className="text-xl font-bold text-blue-400">
            {collapsed ? "OT" : "Opinion Trading"}
          </h1>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["home"]}
          items={menuItems}
          className="border-r-0 bg-gray-800"
        />
      </Sider>
      <Layout className="w-full">
        <Header className="bg-gray-800 px-4 flex w-full items-center justify-between">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="text-lg"
          />
          <div className="flex items-center space-x-4">
            <Dropdown
              menu={{ items: userMenuItems as ItemType[] }}
              placement="bottomRight"
            >
              <div className="flex items-center space-x-2 cursor-pointer">
                <Avatar icon={<UserOutlined />} />
                {!collapsed && (
                  <span className="text-sm font-medium text-white">
                    {userProfile?.username || "User"}
                  </span>
                )}
              </div>
            </Dropdown>
          </div>
        </Header>
        <Content className="bg-gray-900 flex rounded-lg h-full w-full">
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
