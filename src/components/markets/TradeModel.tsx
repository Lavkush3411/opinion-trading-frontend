import { Button, Form, InputNumber, Modal, Select, Spin } from "antd";
import React from "react";
import { useModelStore } from "../../state/useModelStore";
import { useCreateTrade, useMarket } from "../../hooks";
import { useMarketStore } from "../../state/useMarketStore";

const { Option } = Select;

function TradeModel() {
  const { isTradeModalVisible, setIsTradeModalVisible } = useModelStore();
  const [form] = Form.useForm();
  const { mutate: trade, isPending: isTradeCreating } = useCreateTrade();
  const { selectedMarket } = useMarketStore();
  const { data, isPending } = useMarket(selectedMarket);

  const handleTradeSubmit = async (values: {
    price: number;
    side: "favour" | "against";
    quantity: number;
  }) => {
    try {
      await trade({
        marketId: selectedMarket,
        price: values.price * 100,
        quantity: values.quantity,
        side: values.side.toLowerCase() === "yes" ? "favour" : "against",
      });
      setIsTradeModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error("Trade failed:", error);
    }
  };

  if (!selectedMarket) return;
  if (isPending) return <Spin />;
  return (
    <Modal
      title={data?.question || "NA"}
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
          name="side"
          label="Side"
          rules={[{ required: true, message: "Please select a Side" }]}
        >
          <Select placeholder="Select position">
            <Option value="YES">Yes</Option>
            <Option value="NO">No</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="price"
          label="Amount"
          rules={[{ required: true, message: "Please enter an amount" }]}
        >
          <InputNumber min={1} placeholder="Enter amount" className="w-full" />
        </Form.Item>
        <Form.Item
          name="quantity"
          label="Quantity"
          rules={[{ required: true, message: "Please enter an quantity" }]}
        >
          <InputNumber
            min={1}
            placeholder="Enter Quantity"
            className="w-full"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={isTradeCreating}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Place Trade
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default TradeModel;
