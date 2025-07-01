import React, { useMemo } from "react";
import { Card, Col, Row, Spin, Typography } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  LabelList,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useMarket, useMarketDepth } from "../../hooks";
import { Order } from "../../types/api.types";
import { useParams } from "react-router-dom";

const { Title } = Typography;

function groupByPrice(orders: Order[]) {
  const result: { price: number; quantity: number }[] = [];

  for (const order of orders) {
    const last = result[result.length - 1] as any;
    if (last && last?.price === order.price) {
      last.quantity += order.quantity;
    } else {
      if (result.length > 4) break;
      result.push({
        price: order.price,
        quantity: order.quantity,
      });
    }
  }

  return result.map((item) => ({ ...item, price: 10 - item.price / 100 }));
}

function padChartData(data, maxRows = 5) {
  const padded = [...data];
  while (padded.length < maxRows) {
    padded.push({
      price: null, // or 0, or "" depending on your chart rendering
      quantity: 0,
      isEmpty: true, // optional: helps in rendering empty bars
    });
  }
  return padded;
}

function OrderBook() {
  const { marketId } = useParams();

  const { data, isPending } = useMarketDepth(marketId);
  const { data: marketData, isPending: isMarketDataLoading } = useMarket(
    marketId as string
  );
  const against = data?.order_book?.against;
  const favour = data?.order_book?.favour;
  const yesData = groupByPrice((against && [...against]?.reverse()) || []);
  const noData = groupByPrice((favour && [...favour]?.reverse()) || []);
  // Calculate total quantities for scaling
  const yesTotal = yesData.reduce((sum, item) => sum + item.quantity, 0);

  const noTotal = noData.reduce((sum, item) => sum + item.quantity, 0);

  // // Sort and prepare data
  const sortedYesData = padChartData(
    [...yesData].sort((a, b) => a.price - b.price)
  );

  const sortedNoData = padChartData(
    [...noData].sort((a, b) => a.price - b.price)
  );
  if (isPending || isMarketDataLoading) return <Spin />;
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex-grow overflow-auto text-white">
        Question : {marketData?.question}
      </div>
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
            total={yesTotal || 0}
          />
          {/* NO Chart */}
          <Chart
            data={sortedNoData}
            color="#ef4444"
            title="NO"
            total={noTotal || 0}
          />
        </Row>
      </Card>
    </div>
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
            formatter={(value: number) => [`${value} Available`, "Quantity"]}
          />
          <Bar
            dataKey="quantity"
            fill={color}
            radius={[0, 4, 4, 0]}
            background={{ fill: "rgba(255, 255, 255, 0.05)" }}
          >
            {/* Price label at the very left inside the filled bar */}
            <LabelList
              dataKey="price"
              position="insideLeft"
              style={{
                fill: "#fff",
                fontWeight: 700,
                fontSize: 12,
                width: 100,
              }}
              formatter={(price: string) => `₹${Number(price).toFixed(1)}`}
            />
            {/* Quantity label at the end of the bar */}
            <LabelList
              dataKey="quantity"
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
