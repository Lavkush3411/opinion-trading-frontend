import React, { useMemo, useState } from "react";
import { Layout, Typography, Button, Table, Switch, Spin } from "antd";
import { useUserTrades } from "../hooks";
import { useGlobalStore } from "../state/useGlobalStore";
import { useNavigate } from "react-router-dom";

const { Content } = Layout;
const { Title } = Typography;

const PortfolioPage = () => {
  const [tab, setTab] = useState<"active" | "closed">("active");

  const { data, isPending } = useUserTrades(tab === "active" ? true : false);
  const { userId } = useGlobalStore();
  const navigate = useNavigate();
  const tradeColumns = useMemo(() => {
    return [
      {
        title: "Market",
        dataIndex: "opinionId",
        key: "price",
        render: (value: string) => (
          <span
            className="cursor-pointer"
            onClick={() => navigate(`/trade/${value}`)}
          >
            {value}
          </span>
        ),
      },
      { title: "Quantity", dataIndex: "quantity", key: "price" },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
      },
      {
        title: "Opinion",
        dataIndex: "side",
        key: "price",
      },
    ];
  }, [userId]);

  if (isPending) return <Spin />;

  console.log(data?.unfulfilled);
  const dataSource = [
    ...(data?.unfulfilled ?? []).flatMap((order) => ({
      ...order,
      price: `₹${order.price / 100}`,
      side: order.side === "favour" ? "Yes" : "No",
    })),
    ...(data?.fulfilled ?? []).flatMap((trade) => ({
      userId,
      quantity: trade.quantity,
      opinionId: trade.opinionId,
      price:
        trade.favourUserId === userId
          ? `₹${trade.favourPrice / 100}`
          : `₹${trade.againstPrice / 100}`,
      side: trade.favourUserId === userId ? "Yes" : "No",
    })),
  ];

  console.log(data, userId);

  return (
    <Layout
      style={{
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
            dataSource={dataSource}
            pagination={false}
            bordered={false}
            style={{ backgroundColor: "transparent" }}
            rowClassName={() => "custom-row"}
          />
        </div>
      </Content>
    </Layout>
  );
};

export default PortfolioPage;
