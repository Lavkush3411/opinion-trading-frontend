import { Button, Form, InputNumber, Modal, Select, Slider, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useModelStore } from "../../state/useModelStore";
import { useCreateTrade, useMarket } from "../../hooks";
import { useMarketStore } from "../../state/useMarketStore";

const { Option } = Select;

function TradeModel() {
  const { isTradeModalVisible, setIsTradeModalVisible } = useModelStore();
  const [price, setPrice] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [form] = Form.useForm();
  const { mutateAsync: trade, isPending: isTradeCreating } = useCreateTrade();
  const { selectedMarket, tradeSide, setTradeSide } = useMarketStore();
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
      form.setFieldsValue({
        price: 1,
        quantity: 1,
      });
      setPrice(1);
      setQuantity(1);
      setIsTradeModalVisible(false);
    } catch (error) {
      console.error("Trade failed:", error);
    }
  };
  useEffect(() => {
    if (tradeSide) {
      form.setFieldValue("side", tradeSide);
    }
  }, [tradeSide]);

  useEffect(() => {
    form.setFieldsValue({
      price: 1,
      quantity: 1,
    });
  }, [form]);

  if (!selectedMarket) return;
  if (isPending) return <Spin />;
  return (
    <Modal
      title={data?.question || "NA"}
      open={isTradeModalVisible}
      onCancel={() => setIsTradeModalVisible(false)}
      footer={null}
      maskClosable={false}
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
          <Select
            placeholder="Select position"
            value={tradeSide}
            onSelect={(val) => {
              setTradeSide(val);
              form.setFieldValue("side", val);
            }}
          >
            <Option value="YES">Yes</Option>
            <Option value="NO">No</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="price"
          label="Amount"
          rules={[{ required: true, message: "Please enter an amount" }]}
        >
          <Slider
            min={1}
            max={9}
            value={price}
            onChange={(val) => {
              setPrice(val);
              form.setFieldValue("price", val); // Sync with form
            }}
            step={1}
            className="w-full"
          />{" "}
          {price}
        </Form.Item>
        <Form.Item
          name="quantity"
          label="Quantity"
          rules={[{ required: true, message: "Please enter an quantity" }]}
        >
          <Slider
            min={1}
            max={5}
            step={1}
            onChange={(val) => {
              setQuantity(val);
              form.setFieldValue("quantity", val);
            }}
            value={quantity}
            className="w-full"
          />{" "}
          {quantity}
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
