import { Button, Form, InputNumber, Modal, Select } from "antd";
import React from "react";
import { useModelStore } from "../../state/useModelStore";
import { useCreateTrade } from "../../hooks";
import { useMarketStore } from "../../state/useMarketStore";

const { Option } = Select;

function TradeModel() {
  const { isTradeModalVisible, setIsTradeModalVisible } = useModelStore();
  const [form] = Form.useForm();
  const createTrade = useCreateTrade();
  const { selectedMarket } = useMarketStore();

  const handleTradeSubmit = async (values: {
    amount: number;
    position: "YES" | "NO";
  }) => {
    if (!selectedMarket) return;

    try {
      await createTrade.mutateAsync({
        marketId: selectedMarket,
        amount: values.amount,
        position: values.position,
      });
      setIsTradeModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error("Trade failed:", error);
    }
  };
  return (
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
          <InputNumber min={1} placeholder="Enter amount" className="w-full" />
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
  );
}

export default TradeModel;
