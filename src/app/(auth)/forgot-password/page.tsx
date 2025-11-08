"use client";

import MyButton from "@/components/ui/core/MyButton/MyButton";
import { useForgotPasswordMutation } from "@/redux/features/auth/authApi";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";
import { MailOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const ForgotPasswordPage = () => {
  const [form] = Form.useForm();
  const router = useRouter();

  const [forgotPassword] = useForgotPasswordMutation();

  const onFinish = async (values: { email: string }) => {
    const res = await handleAsyncWithToast(async () => {
      return forgotPassword(values);
    }, "Sending OTP to your email...");
    if (res?.data?.success) {
      sessionStorage.setItem("userDataToLogin", JSON.stringify(values));
      router.push(`/verify-email?redirectUrl=/reset-password&email=${values.email}&type=FORGET`);
    } else {
      toast.error("Try Again");
    }
  };

  return (
    <section className="py-16 bg-white flex items-center justify-center min-h-[calc(100vh-128px)]">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        {/* Icon */}
        <div className="w-32 h-32 mx-auto bg-sec-gradient rounded-full flex items-center justify-center shadow-lg">
          <MailOutlined className="text-white text-6xl" />
        </div>

        {/* Title & Subtitle */}
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-text-primary">
            Enter your email
          </h2>
          <p className="text-text-secondary text-lg">
            You will get OTP in your email for password recovery
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
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Invalid email format!" },
            ]}
            className="mb-0"
          >
            <Input
              size="large"
              placeholder="Email Address"
              prefix={<MailOutlined className="text-gray-400" />}
              className="h-14 rounded-lg"
            />
          </Form.Item>

          <Form.Item className="mb-0">
            <MyButton label="Continue" type="submit" fullWidth />
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};

export default ForgotPasswordPage;
