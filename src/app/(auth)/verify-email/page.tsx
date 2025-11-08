"use client";

import MyButton from "@/components/ui/core/MyButton/MyButton";
import MyFormOTP from "@/components/ui/core/MyForm/MyFormOTP/MyFormOTP";
import MyFormWrapper from "@/components/ui/core/MyForm/MyFormWrapper/MyFormWrapper";
import {
  useOtpMutation,
  useResendOtpMutation,
} from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";
import { MailOutlined } from "@ant-design/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";

const schema = z.object({
  otp: z.string().length(6),
});

const VerifyEmailPage = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const type = searchParams.get("type") || "";
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [verifyOtp] = useOtpMutation();
  const [resendOtp] = useResendOtpMutation();

  const handleVerify = async (data: { otp: string }) => {
    const res = await handleAsyncWithToast(async () => {
      return verifyOtp({ email, otp: Number(data?.otp), type: type });
    });
    if (!res) return;
    if (res?.data?.success && type === "SIGNUP") {
      dispatch(
        setUser({
          user: res.data.data,
          access_token: res.data?.data?.accessToken,
        })
      );
      router.push(`/`);
    }
    if (res?.data?.success && type === "FORGET") {
      sessionStorage.removeItem("userDataToLogin");
      sessionStorage.setItem("tokenToReset", res.data?.data?.accessToken);
      router.push(`/reset-password`);
    }
  };

  const handleResend = async () => {
    await handleAsyncWithToast(async () => {
      return await resendOtp({ email });
    });
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
            Submit Verification Code
          </h2>
          <p className="text-text-secondary text-lg">
            We already sent a verification code to your email
          </p>
        </div>

        {/* Form */}
        <MyFormWrapper
          onSubmit={handleVerify}
          className="space-y-6"
          resolver={zodResolver(schema)}
        >
          <MyFormOTP name="otp" length={6} />
          <p className="text-sm text-center text-text-secondary mb-6">
            {"Don't receive the email? "}
            <button
              type="button"
              onClick={handleResend}
              className="text-primary hover:text-primary font-medium transition-colors"
            >
              Click to resend
            </button>
          </p>
          <MyButton label="Verify Email" type="submit" fullWidth />
        </MyFormWrapper>
      </div>
    </section>
  );
};

export default VerifyEmailPage;
