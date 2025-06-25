import React, { useState } from "react";
import { Select, Button, Spin, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useMarkets, useMarketCategories } from "../hooks";
import MarketCard from "../components/markets/MarketCard";
import { Market } from "../types/api.types";
import CreateMarketModal from "../components/markets/CreateMarket";
import { useModelStore } from "../state/useModelStore";
import { useMarketStore } from "../state/useMarketStore";

const { Option } = Select;

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const { setSelectedMarket } = useMarketStore();
  const { data: markets, isLoading: marketsLoading } = useMarkets();
  // const { data: categories, isLoading: categoriesLoading } =
  //   useMarketCategories();
  const { setIsTradeModalVisible, setIsCreateMarketModalVisible } =
    useModelStore();

  const handleCreateMarket = () => {
    setIsCreateMarketModalVisible(true);
  };

  const handleTrade = (market: Market) => {
    setSelectedMarket(market.id);
    setIsTradeModalVisible(true);
  };

  const filteredMarkets = markets?.filter((market) => {
    const matchesSearch =
      market.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      market.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      !selectedCategory || market.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen w-full bg-gray-900">
      <CreateMarketModal />
      <div className="w-full px-4 py-8">
        <div className="flex flex-col space-y-8 max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white">Markets</h1>
              <p className="text-gray-400 mt-1">
                Trade on predictions and outcomes
              </p>
            </div>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              size="large"
              className="bg-blue-600 hover:bg-blue-700 shadow-md"
              onClick={handleCreateMarket}
            >
              Create Market
            </Button>
          </div>

          {/* Search and Filter Section */}
          {/* <div className="flex flex-col md:flex-row gap-4 p-4 rounded-lg shadow-sm">
            <Input
              placeholder="Search markets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md text-white bg-gray-800 px-4 py-2 rounded-lg border border-gray-700"
            />
            <Select
              placeholder="Select Category"
              value={selectedCategory === "" ? null : selectedCategory}
              onChange={setSelectedCategory}
              className="min-w-[200px] text-white custom-select"
              loading={categoriesLoading}
              allowClear
              size="large"
            >
              {categories?.map((category) => (
                <Option
                  className="text-white "
                  key={category.id}
                  value={category.id}
                >
                  {category.name}
                </Option>
              ))}
            </Select>
          </div> */}

          {/* Markets Container */}
          {marketsLoading ? (
            <div className="flex justify-center items-center h-64">
              <Spin size="large" />
            </div>
          ) : (
            <div className="flex flex-wrap -mx-3">
              {filteredMarkets?.map((market: any) => (
                <div
                  key={market.id}
                  className="w-full px-3 mb-6 sm:w-1/2 lg:w-1/3"
                >
                  <MarketCard market={market} onTrade={handleTrade} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
