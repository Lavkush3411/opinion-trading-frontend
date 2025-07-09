import React, { useMemo, useState } from "react";
import { Layout, Typography, Button, Table, Switch, Spin } from "antd";
import { useUserTrades } from "../hooks";
import { useGlobalStore } from "../state/useGlobalStore";

const { Content } = Layout;
const { Title } = Typography;

const PortfolioPage = () => {
  const [tab, setTab] = useState<"active" | "closed">("active");

  const { data, isPending } = useUserTrades(tab === "active" ? true : false);
  const { userId } = useGlobalStore();
  const tradeColumns = useMemo(() => {
    return [
      // { title: "Market", dataIndex: "market", key: "market" },
      // { title: "Type", dataIndex: "type", key: "type" },
      { title: "Quantity", dataIndex: "quantity", key: "quantity" },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
        render: (value: number, data) => {
          return data.favour_user_id === userId
            ? `₹${data.favour_price}`
            : `₹${data.against_price}`;
        },
      },
      // {
      //   title: "PnL",
      //   dataIndex: "pnl",
      //   key: "pnl",
      //   render: (text: string) => (
      //     <span style={{ color: text.startsWith("-") ? "#f87171" : "#4ade80" }}>
      //       {text}
      //     </span>
      //   ),
      // },
    ];
  }, [userId]);

  if (isPending) return <Spin />;

  const dataSource = data?.fulfilled;

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
