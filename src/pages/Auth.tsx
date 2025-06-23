import { useState } from "react";
import { Form, Input, Button, Card, Tabs } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../_common/routes";
import { useLogin, useSignup } from "../hooks";



const Auth = () => {
  const [activeTab, setActiveTab] = useState("login");
  const navigate = useNavigate();
  const { mutate: signup, isPending: isSigningUp } = useSignup();
  const { mutate: login, isPending: isLoggingIn } = useLogin();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <Card className="w-full max-w-md bg-gray-800 border-gray-700">
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          centered
          items={[
            {
              key: "login",
              label: "Login",
              children: (
                <Form
                  name="login"
                  onFinish={login}
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

                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password
                      prefix={<LockOutlined />}
                      placeholder="Password"
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </Form.Item>

                  <div className="flex justify-end mb-4">
                    <Button
                      type="link"
                      onClick={() => navigate(ROUTES.AUTH.FORGOT_PASSWORD)}
                      className="text-blue-400 hover:text-blue-300 p-0"
                    >
                      Forgot Password?
                    </Button>
                  </div>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={isLoggingIn}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      Login
                    </Button>
                  </Form.Item>
                </Form>
              ),
            },
            {
              key: "signup",
              label: "Sign Up",
              children: (
                <Form
                  name="signup"
                  onFinish={signup}
                  layout="vertical"
                  className="mt-4"
                >
                  <Form.Item
                    name="name"
                    rules={[
                      { required: true, message: "Please input your name!" },
                      { message: "Please enter a valid name!" },
                    ]}
                  >
                    <Input
                      prefix={<MailOutlined />}
                      placeholder="Name"
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </Form.Item>
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

                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                      {
                        min: 6,
                        message: "Password must be at least 6 characters!",
                      },
                    ]}
                  >
                    <Input.Password
                      prefix={<LockOutlined />}
                      placeholder="Password"
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </Form.Item>

                  <Form.Item
                    name="confirmPassword"
                    dependencies={["password"]}
                    rules={[
                      {
                        required: true,
                        message: "Please confirm your password!",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error("Passwords do not match!")
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password
                      prefix={<LockOutlined />}
                      placeholder="Confirm Password"
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={isSigningUp}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      Sign Up
                    </Button>
                  </Form.Item>
                </Form>
              ),
            },
          ]}
        />
      </Card>
    </div>
  );
};

export default Auth;
