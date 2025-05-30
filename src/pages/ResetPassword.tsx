import { Form, Input, Button, Card, message, Alert } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

interface ResetPasswordForm {
  newPassword: string;
  confirmPassword: string;
}

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const onResetPassword = async (values: ResetPasswordForm) => {
    try {
      setLoading(true);
      // TODO: Implement reset password logic here with token
      // The token should contain the user information
      console.log(
        "Reset password with token:",
        token,
        "new password:",
        values.newPassword
      );
      message.success("Password has been reset successfully!");
      navigate("/auth");
    } catch (error) {
      console.log(error);
      message.error("Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <Card className="w-full max-w-md bg-gray-800 border-gray-700">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Reset Your Password
        </h2>
        {!token && (
          <Alert
            message="Invalid Reset Link"
            description="This password reset link is invalid or has expired. Please request a new password reset link."
            type="warning"
            showIcon
            className="mb-6"
          />
        )}
        <p className="text-gray-400 mb-6 text-center">
          Please enter your new password below.
        </p>
        <Form
          name="reset-password"
          onFinish={onResetPassword}
          layout="vertical"
          className="mt-4"
        >
          <Form.Item
            name="newPassword"
            rules={[
              { required: true, message: "Please input your new password!" },
              { min: 6, message: "Password must be at least 6 characters!" },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="New Password"
              className="bg-gray-700 border-gray-600 text-white"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "Please confirm your new password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Confirm New Password"
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
              Reset Password
            </Button>
          </Form.Item>

          <div className="text-center">
            <Button
              type="link"
              onClick={() => navigate("/auth")}
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

export default ResetPassword;
