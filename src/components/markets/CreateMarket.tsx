import { Button, Form, Input, Modal } from "antd";
import { useModelStore } from "../../state/useModelStore";

function CreateMarketModal() {
  const { isCreateMarketModalVisible, setIsCreateMarketModalVisible } =
    useModelStore();
  const [form] = Form.useForm();
  const handleCreateMarket = (values) => {
    console.log(values);
    form.resetFields();
  };
  return (
    <Modal
      open={isCreateMarketModalVisible}
      onCancel={() => setIsCreateMarketModalVisible(false)}
    >
      <Form name="CreateMarket" form={form} onFinish={handleCreateMarket}>
        <Form.Item name={"question"}>
          <Input
            type="text"
            title="Question"
            placeholder="Will India win??"
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
