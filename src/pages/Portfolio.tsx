import React, { useState } from "react";
import { Layout, Typography, Button, Table, Switch, Spin } from "antd";
import { useUserTrades } from "../hooks";

const { Content } = Layout;
const { Title } = Typography;

const activeTrades = [
  {
    key: 1,
    market: "BTC/USDT",
    type: "Buy",
    quantity: 0.5,
    price: 31000,
    pnl: "+2.1%",
  },
  {
    key: 2,
    market: "ETH/USDT",
    type: "Sell",
    quantity: 1.2,
    price: 1950,
    pnl: "+0.9%",
  },
];

const closedTrades = [
  {
    key: 1,
    market: "SOL/USDT",
    type: "Buy",
    quantity: 3,
    price: 150,
    pnl: "-1.5%",
  },
];

const tradeColumns = [
  { title: "Market", dataIndex: "market", key: "market" },
  { title: "Type", dataIndex: "type", key: "type" },
  { title: "Quantity", dataIndex: "quantity", key: "quantity" },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    render: (value: number) => `₹${value}`,
  },
  {
    title: "PnL",
    dataIndex: "pnl",
    key: "pnl",
    render: (text: string) => (
      <span style={{ color: text.startsWith("-") ? "#f87171" : "#4ade80" }}>
        {text}
      </span>
    ),
  },
];

const PortfolioPage = () => {
  const [tab, setTab] = useState<"active" | "closed">("active");

  const { data, isPending } = useUserTrades(tab === "active" ? true : false);

  if (isPending) return <Spin />;

  console.log(data);

  return (
    <Layout
      style={{
        minHeight: "100vh",
        backgroundColor: "rgb(17, 24, 39)",
        padding: "2rem",
      }}
    >
      <Content
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {/* Title + Toggle */}
        <div style={{ marginBottom: "1.5rem" }}>
          <Title level={2} style={{ color: "white", marginBottom: 16 }}>
            Portfolio
          </Title>

          <Switch
            checkedChildren="Active"
            unCheckedChildren="Closed"
            checked={tab === "active"}
            onChange={(checked) => setTab(checked ? "active" : "closed")}
            style={{
              backgroundColor: tab === "active" ? "#2563eb" : "#374151", // blue for active, gray for closed
              color: "white",
              fontWeight: 500,
              padding: " 8px",
              height: 32,
            }}
          />
        </div>

        {/* Table fills remaining space */}
        <div style={{ flexGrow: 1, overflow: "auto" }}>
          <Table
            columns={tradeColumns}
            dataSource={tab === "active" ? activeTrades : closedTrades}
            pagination={false}
            bordered={false}
            style={{ backgroundColor: "transparent" }}
            rowClassName={() => "custom-row"}
            scroll={{ x: "100%", y: "100%" }}
          />
        </div>
      </Content>
    </Layout>
  );
};

export default PortfolioPage;
