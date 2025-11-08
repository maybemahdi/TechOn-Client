"use client";

import { useState } from "react";
import { Form, Input, message } from "antd";
import {
  LockOutlined,
  UserOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import MyButton from "@/components/ui/core/MyButton/MyButton";
import { useRouter } from "next/navigation";
import { useResetPasswordMutation } from "@/redux/features/auth/authApi";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";

const ResetPasswordPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [resetPassword] = useResetPasswordMutation();

  const onFinish = async (values: any) => {
    const tokenToReset = sessionStorage.getItem("tokenToReset");
    const res = await handleAsyncWithToast(
      async () => {
        return resetPassword({
          password: values.newPassword,
          token: tokenToReset!,
        });
      },
      "Resetting Password...",
      "Password reset successfully!"
    );
    if (res?.data?.success) {
      sessionStorage.removeItem("tokenToReset");
      router.push("/login");
    }
  };

  return (
    <section className="py-16 bg-white flex items-center justify-center min-h-[calc(100vh-128px)]">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        {/* Icon */}
        <div className="w-32 h-32 mx-auto bg-sec-gradient rounded-full flex items-center justify-center shadow-lg">
          <UserOutlined className="text-white text-6xl" />{" "}
          {/* Using UserOutlined for the person icon */}
        </div>

        {/* Title & Subtitle */}
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-text-primary">
            Reset your password now
          </h2>
          <p className="text-text-secondary text-lg">
            Welcome back, please enter your detail
          </p>
        </div>

        {/* Form */}
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          className="space-y-6"
        >
          <Form.Item
            name="newPassword"
            rules={[
              { required: true, message: "Please input your new password!" },
              {
                min: 8,
                message: "Password must be at least 8 characters long!",
              },
            ]}
            hasFeedback
            className="mb-0"
          >
            <Input.Password
              size="large"
              placeholder="New Password"
              prefix={<LockOutlined className="text-gray-400" />}
              className="h-14 rounded-lg"
              iconRender={(visible) =>
                visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            dependencies={["newPassword"]}
            hasFeedback
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
            className="mb-0"
          >
            <Input.Password
              size="large"
              placeholder="Confirm New Password"
              prefix={<LockOutlined className="text-gray-400" />}
              className="h-14 rounded-lg"
              iconRender={(visible) =>
                visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          <Form.Item className="mb-0">
            <MyButton
              label="Change Password"
              type="submit"
              fullWidth
              isLoading={loading}
            />
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};

export default ResetPasswordPage;
