import React from "react";
import { Card, Col, Row } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  LabelList,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
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
  return (
    <Card title="Order Book" style={{ width: "100%" }}>
      <Row gutter={16}>
        {/* YES Chart */}
        <Chart data={yesData} color="green" title="YES" />
        {/* NO Chart */}
        <Chart data={noData} color="red" title="NO" />
      </Row>
    </Card>
  );
}

const Chart = ({
  data,
  color,
  title,
}: {
  data: any;
  color: string;
  title: string;
  reverse?: boolean;
}) => {
  return (
    <Col span={12}>
      <h4 style={{ textAlign: "center", color: color }}>{title}</h4>
      <ResponsiveContainer width="100%" height={100}>
        <BarChart
          layout="vertical"
          data={data}
          margin={{ left: 10, right: 10 }}
        >
          <XAxis type="number" hide reversed />
          <YAxis type="category" dataKey="price" />
          <Tooltip />
          <Bar dataKey="count" fill={color}>
            <LabelList dataKey="count" position="right" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Col>
  );
};

export default OrderBook;
