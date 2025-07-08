import React from "react";
import { Layout, Avatar, Typography, Table, Tag, Divider } from "antd";
import {
  MailOutlined,
  WalletOutlined,
  TrophyOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Trade, UserType } from "../../types/api.types";

const { Content } = Layout;
const { Title, Text } = Typography;

const tradeColumns = [
  {
    title: "Opinion",
    dataIndex: "side",
    key: "side",
    render: (side: "favour" | "against") => (
      <Tag color={side === "favour" ? "green" : "red"}>
        {side === "favour" ? "Yes" : "No"}
      </Tag>
    ),
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    render: (price: number) => `₹${(price / 100).toFixed(2)}`,
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "createdAt",
  },
];

const UserProfilePage = ({ user }: { user: UserType }) => {
  const trades: Trade[] = [];

  return (
    <Layout
      style={{
        backgroundColor: "rgb(17, 24, 39)",
        padding: "2rem",
        width: "100%",
        height: "100%",
        color: "white",
        overflow: "auto",
      }}
    >
      <Content
        style={{
          margin: "0 auto",
          width: "100%",
        }}
      >
        {/* Profile Section */}
        <div style={{ textAlign: "center" }}>
          <Avatar
            size={100}
            src={"https://i.pravatar.cc/150?img=12"}
            style={{ marginBottom: 16 }}
          >
            {user.name[0]}
          </Avatar>
          <Title level={3} style={{ color: "white" }}>
            {user.name}
          </Title>
          <span className="flex justify-center gap-2 mb-4">
            <MailOutlined className="cursor-pointer" />
            <div style={{ fontWeight: 600, fontSize: 14 }}>{user.email}</div>
          </span>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            {/* Leaderboard Box */}
            <Box>
              <PlusOutlined
                style={{ fontSize: 36, color: "#9ca3af", cursor: "pointer" }}
              />
              <Text style={{ color: "#9ca3af", fontSize: 12 }}>Add Funds</Text>
            </Box>

            {/* Balance Box */}

            <Box>
              <WalletOutlined style={{ fontSize: 24, color: "#9ca3af" }} />
              <div style={{ fontWeight: 600, fontSize: 14 }}>
                ₹{(user.balance / 100).toFixed(2)}
              </div>
              <Text style={{ color: "#9ca3af", fontSize: 12 }}>Balance</Text>
            </Box>

            {/* Leaderboard Box */}
            <Box>
              <TrophyOutlined style={{ fontSize: 24, color: "#9ca3af" }} />
              <div style={{ fontWeight: 600, fontSize: 14, color: "#c084fc" }}>
                #23
              </div>
              <Text style={{ color: "#9ca3af", fontSize: 12 }}>
                Leaderboard Rank
              </Text>
            </Box>
          </div>

          <Divider style={{ borderColor: "#374151" }} />
        </div>

        {/* Trades Section */}
        <div>
          <Title level={5} style={{ color: "white", marginBottom: 16 }}>
            Transaction History
          </Title>
          <Table
            columns={tradeColumns}
            dataSource={trades.map((t, i) => ({ ...t, key: i }))}
            pagination={{ pageSize: 5 }}
            bordered
            rowClassName={() => "custom-row"}
          />
        </div>
      </Content>
    </Layout>
  );
};

export default UserProfilePage;

const Box = ({ children }) => {
  return (
    <div
      style={{
        backgroundColor: "#1f2937",
        padding: "1rem 1.5rem",
        borderRadius: 12,
        minWidth: 200,
        textAlign: "center",
        color: "white",
        display: "flex",
        gap: "8px",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {children}
    </div>
  );
};
