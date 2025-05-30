import { Form, Input, Button, Card, message } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../_common/routes";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onRequestReset = async (values: { email: string }) => {
    try {
      setLoading(true);
      // TODO: Implement request reset link logic here
      console.log("Request reset link for:", values.email);
      message.success("Password reset link has been sent to your email!");
      navigate(ROUTES.AUTH.LOGIN);
    } catch (error) {
      message.error("Failed to send reset link. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <Card className="w-full max-w-md bg-gray-800 border-gray-700">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Forgot Password
        </h2>
        <p className="text-gray-400 mb-6 text-center">
          Enter your email address and we'll send you a link to reset your
          password.
        </p>
        <Form
          name="forgot-password"
          onFinish={onRequestReset}
          layout="vertical"
          className="mt-4"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Email"
              className="bg-gray-700 border-gray-600 text-white"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Send Reset Link
            </Button>
          </Form.Item>

          <div className="text-center">
            <Button
              type="link"
              onClick={() => navigate(ROUTES.AUTH.LOGIN)}
              className="text-blue-400 hover:text-blue-300"
            >
              Back to Login
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default ForgotPassword;
