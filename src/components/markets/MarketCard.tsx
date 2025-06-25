import React from "react";
import { Card, Progress, Button, Tag, Tooltip } from "antd";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Market } from "../../types/api.types";
import { useNavigate } from "react-router-dom";
interface MarketCardProps {
  market: Market;
  onTrade: (market: Market) => void;
}

const MarketCard: React.FC<MarketCardProps> = ({ market }) => {
  const navigate = useNavigate();
  const yesPercentage =
    (market.yesPrice / (market.yesPrice + market.noPrice)) * 100;
  const noPercentage = 100 - yesPercentage;

  const formatVolume = (volume: number) => {
    if (volume >= 1000000) {
      return `$${(volume / 1000000).toFixed(1)}M`;
    } else if (volume >= 1000) {
      return `$${(volume / 1000).toFixed(1)}K`;
    }
    return `$${volume}`;
  };

  const navigateToTrade = (market: Market) => {
    console.log("market");
    navigate(`/trade/${market.id}`);
  };

  return (
    <Card
      className="w-full h-full hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
      title={
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-gray-900 dark:text-white truncate pr-2">
            {market.question}
          </span>
          <Tag color="green" className="flex-shrink-0">
            Active
          </Tag>
        </div>
      }
      headStyle={{
        borderBottom: "1px solid #f0f0f0",
        padding: "16px",
      }}
      bodyStyle={{
        padding: "16px",
        height: "calc(100% - 57px)", // Subtract header height
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="flex flex-col flex-grow">
        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-4">
          {market.description}
        </p>

        <div className="flex flex-col flex-grow space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-green-600 dark:text-green-400 font-medium flex items-center">
              <ArrowUpOutlined className="mr-1" /> Yes
            </span>
            <span className="font-semibold text-gray-900 dark:text-white">
              ₹{market.yesPrice.toFixed(2)}
            </span>
          </div>
          <Progress
            percent={yesPercentage}
            strokeColor="#52c41a"
            showInfo={false}
            className="mb-2"
          />

          <div className="flex justify-between items-center">
            <span className="text-red-600 dark:text-red-400 font-medium flex items-center">
              <ArrowDownOutlined className="mr-1" /> No
            </span>
            <span className="font-semibold text-gray-900 dark:text-white">
              ₹{market.noPrice.toFixed(2)}
            </span>
          </div>
          <Progress
            percent={noPercentage}
            strokeColor="#ff4d4f"
            showInfo={false}
          />
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
            {/* <Tooltip title="Total trading volume">
              <span className="flex items-center">
                <InfoCircleOutlined className="mr-1" />
                {formatVolume(market.totalVolume)}
              </span>
            </Tooltip> */}
            {/* <Tooltip title="Market end date">
              <span className="flex items-center">
                <InfoCircleOutlined className="mr-1" />
                {new Date(market.endDate).toLocaleDateString()}
              </span>
            </Tooltip> */}
          </div>

          <div className="mt-4 flex justify-end flex justify-between">
            <Button
              type="primary"
              onClick={() => navigateToTrade(market)}
              className="bg-blue-600 hover:bg-blue-700 shadow-sm"
            >
              Details
            </Button>
            <Button
              type="primary"
              onClick={() => navigateToTrade(market)}
              className="bg-blue-600 hover:bg-blue-700 shadow-sm"
            >
              Trade
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MarketCard;
