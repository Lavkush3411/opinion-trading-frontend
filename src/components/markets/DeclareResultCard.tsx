import { Button, Form, Modal, Select, Spin } from "antd";
import { useModelStore } from "../../state/useModelStore";
import useDeclareResult from "../../hooks/useDeclareResult";
import { useMarketStore } from "../../state/useMarketStore";
import { useMarket } from "../../hooks";

function DeclareResultCard() {
  const { isDeclareResultModalVisible, setIsDeclareResultModalVisible } =
    useModelStore();
  const { mutate: declareResult } = useDeclareResult();
  const { selectedMarket } = useMarketStore();
  const { data: market, isPending } = useMarket(selectedMarket);

  if (isPending) return null;
  return (
    <Modal
      title="Declare Result"
      className="w-full"
      open={isDeclareResultModalVisible}
      onCancel={() => setIsDeclareResultModalVisible(false)}
      footer={null}
    >
      <div className="text-2xl font-bold my-4"> {market?.question}</div>
      <Form
        onFinish={({ result }) =>
          declareResult({ marketId: selectedMarket, result: result })
        }
      >
        <Form.Item name="result">
          <Select
            options={[
              { label: "Yes", value: true },
              { label: "No", value: false },
            ]}
          />
        </Form.Item>
        <Form.Item className="flex justify-end">
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default DeclareResultCard;
