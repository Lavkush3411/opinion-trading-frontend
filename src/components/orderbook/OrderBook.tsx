import React, { useMemo } from "react";
import { Card, Col, Row, Typography } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  LabelList,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const { Title } = Typography;

const yesData = [
  { price: "₹0.30", count: 10 },
  { price: "₹0.35", count: 20 },
  { price: "₹0.40", count: 30 },
  { price: "₹0.45", count: 40 },
];

const noData = [
  { price: "₹0.30", count: 10 },
  { price: "₹0.35", count: 20 },
  { price: "₹0.40", count: 30 },
  { price: "₹0.45", count: 40 },
];

function OrderBook() {
  // Calculate total quantities for scaling
  const yesTotal = useMemo(
    () => yesData.reduce((sum, item) => sum + item.count, 0),
    []
  );
  const noTotal = useMemo(
    () => noData.reduce((sum, item) => sum + item.count, 0),
    []
  );

  // Sort and prepare data
  const sortedYesData = useMemo(
    () =>
      [...yesData].sort(
        (a, b) => parseFloat(a.price.slice(1)) - parseFloat(b.price.slice(1))
      ),
    []
  );
  const sortedNoData = useMemo(
    () =>
      [...noData].sort(
        (a, b) => parseFloat(b.price.slice(1)) - parseFloat(a.price.slice(1))
      ),
    []
  );

  return (
    <Card
      title={
        <Title level={4} className="m-0 text-white">
          Order Book
        </Title>
      }
      className="bg-gray-800 border-gray-700"
      style={{ width: "100%" }}
    >
      <Row gutter={[24, 24]}>
        {/* YES Chart */}
        <Chart
          data={sortedYesData}
          color="#22c55e"
          title="YES"
          total={yesTotal}
        />
        {/* NO Chart */}
        <Chart data={sortedNoData} color="#ef4444" title="NO" total={noTotal} />
      </Row>
    </Card>
  );
}

const Chart = ({
  data,
  color,
  title,
  total,
}: {
  data: any[];
  color: string;
  title: string;
  total: number;
}) => {
  return (
    <Col span={12}>
      <div className="mb-4">
        <Title level={5} style={{ color, margin: 0, textAlign: "center" }}>
          {title}
        </Title>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart
          layout="vertical"
          data={data}
          margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
        >
          <XAxis type="number" reversed hide domain={[0, total]} />
          <YAxis type="category" dataKey="price" hide />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "1px solid #374151",
              borderRadius: "6px",
              color: "#fff",
            }}
            labelStyle={{ color: "#9ca3af" }}
            cursor={{ fill: "rgba(255, 255, 255, 0.1)" }}
            formatter={(value: number) => [`${value} orders`, "Quantity"]}
          />
          <Bar
            dataKey="count"
            fill={color}
            radius={[0, 4, 4, 0]}
            background={{ fill: "rgba(255, 255, 255, 0.05)" }}
          >
            {/* Price label at the very left inside the filled bar */}
            <LabelList
              dataKey="price"
              position="insideLeft"
              style={{ fill: "#fff", fontWeight: 700, fontSize: 12 }}
              formatter={(price: string) => price}
            />
            {/* Quantity label at the end of the bar */}
            <LabelList
              dataKey="count"
              position="right"
              style={{ fill: "#9ca3af" }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Col>
  );
};

export default OrderBook;
