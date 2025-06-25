import { Button, Form, Input, Modal } from "antd";
import { useModelStore } from "../../state/useModelStore";
import { useCreateMarket } from "../../hooks";

function CreateMarketModal() {
  const { isCreateMarketModalVisible, setIsCreateMarketModalVisible } =
    useModelStore();
  const [form] = Form.useForm();
  const { mutate: createMarket } = useCreateMarket();
  const handleCreateMarket = (values) => {
    createMarket(values);
    // form.resetFields();
  };
  return (
    <Modal
      open={isCreateMarketModalVisible}
      onCancel={() => setIsCreateMarketModalVisible(false)}
    >
      <Form
        name="CreateMarket"
        form={form}
        onFinish={handleCreateMarket}
        style={{ margin: 20 }}
      >
        <Form.Item name={"question"}>
          <Input
            type="text"
            title="Question"
            placeholder="Will India win??"
          ></Input>
        </Form.Item>
        <Form.Item name={"description"}>
          <Input
            type="text"
            title="Description"
            placeholder="Description"
          ></Input>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default CreateMarketModal;
