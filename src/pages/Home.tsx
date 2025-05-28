import React, { useState } from "react";
import { Input, Select, Button, Modal, Form, InputNumber, Spin } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import { useMarkets, useMarketCategories, useCreateTrade } from "../hooks";
import MarketCard from "../components/markets/MarketCard";
import { Market } from "../types/api.types";

const { Option } = Select;

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [isTradeModalVisible, setIsTradeModalVisible] = useState(false);
  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null);
  const [form] = Form.useForm();

  const { data: markets, isLoading: marketsLoading } = useMarkets();
  const { data: categories, isLoading: categoriesLoading } =
    useMarketCategories();
  const createTrade = useCreateTrade();

  const handleTrade = (market: Market) => {
    setSelectedMarket(market);
    setIsTradeModalVisible(true);
  };

  const handleTradeSubmit = async (values: {
    amount: number;
    position: "YES" | "NO";
  }) => {
    if (!selectedMarket) return;

    try {
      await createTrade.mutateAsync({
        marketId: selectedMarket.id,
        amount: values.amount,
        position: values.position,
      });
      setIsTradeModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error("Trade failed:", error);
    }
  };

  const filteredMarkets = markets?.filter((market) => {
    const matchesSearch =
      market.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      market.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      !selectedCategory || market.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900">
      <div className="w-full px-4 py-8">
        <div className="flex flex-col space-y-8 max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Markets
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Trade on predictions and outcomes
              </p>
            </div>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              size="large"
              className="bg-blue-600 hover:bg-blue-700 shadow-md"
            >
              Create Market
            </Button>
          </div>

          {/* Search and Filter Section */}
          <div className="flex flex-col md:flex-row gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
            <Input
              placeholder="Search markets..."
              prefix={<SearchOutlined className="text-gray-400" />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
              size="large"
            />
            <Select
              placeholder="Select category"
              value={selectedCategory}
              onChange={setSelectedCategory}
              className="min-w-[200px]"
              loading={categoriesLoading}
              allowClear
              size="large"
            >
              {categories?.map((category) => (
                <Option key={category.id} value={category.id}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </div>

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

      {/* Trade Modal */}
      <Modal
        title="Place Trade"
        open={isTradeModalVisible}
        onCancel={() => setIsTradeModalVisible(false)}
        footer={null}
        className="dark:bg-gray-800"
      >
        <Form
          form={form}
          onFinish={handleTradeSubmit}
          layout="vertical"
          className="space-y-4"
        >
          <Form.Item
            name="position"
            label="Position"
            rules={[{ required: true, message: "Please select a position" }]}
          >
            <Select placeholder="Select position">
              <Option value="YES">Yes</Option>
              <Option value="NO">No</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="amount"
            label="Amount"
            rules={[{ required: true, message: "Please enter an amount" }]}
          >
            <InputNumber
              min={1}
              placeholder="Enter amount"
              className="w-full"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={createTrade.isPending}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Place Trade
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Home;
