"use client";

import { useLoginWithGoogleMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";
import { verifyToken } from "@/utils/verifyToken";
import { GoogleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginWithGoogle = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [googleLogin] = useLoginWithGoogleMutation();

  const handleGoogleLogin = async () => {
    try {
      // 1. First ensure user is authenticated with Next-Auth
      if (!session?.user) {
        await signIn("google");
        return;
      }

      // 2. Prepare user data for your backend
      const userData = {
        name: session.user.name,
        email: session.user.email,
      };

      // 3. Call your API to register/login the user
      const loginResponse = await handleAsyncWithToast(
        () => googleLogin(userData),
        "Signing in with Google..."
      );

      if (!loginResponse?.data?.success) {
        throw new Error("Google login failed");
      }

      // 4. Verify the token and set user in Redux store
      const user = await verifyToken(loginResponse.data.data.accessToken);

      dispatch(
        setUser({
          user,
          access_token: loginResponse.data.data.accessToken,
        })
      );

      // 5. Redirect to home page
      router.push("/");
    } catch (error) {
      console.error("Google login error:", error);
      // You might want to show an error toast here
    }
  };

  return (
    <div className="space-y-4">
      {/* <p className="text-gray-700 text-base">Login with Google</p> */}
      <Button
        onClick={handleGoogleLogin}
        size="large"
        className="w-full flex items-center justify-center space-x-2 border border-gray-300 rounded-lg h-12 text-gray-700 hover:border-primary hover:text-primary transition-colors"
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 35 34"
            fill="none"
          >
            <g clipPath="url(#clip0_1002_4608)">
              <path
                d="M33.2162 14.0442L19.348 14.0436C18.7356 14.0436 18.2392 14.5399 18.2392 15.1523V19.5826C18.2392 20.1949 18.7356 20.6913 19.3479 20.6913H27.1577C26.3025 22.9107 24.7063 24.7693 22.6699 25.9503L26 31.7149C31.3418 28.6255 34.5 23.2049 34.5 17.1368C34.5 16.2728 34.4363 15.6551 34.3089 14.9597C34.2121 14.4313 33.7534 14.0442 33.2162 14.0442Z"
                fill="#167EE6"
              />
              <path
                d="M17.5 27.3478C13.6781 27.3478 10.3415 25.2596 8.54957 22.1696L2.78511 25.4921C5.71861 30.5763 11.214 34 17.5 34C20.5837 34 23.4934 33.1698 26 31.7228V31.7149L22.6699 25.9502C21.1467 26.8337 19.384 27.3478 17.5 27.3478Z"
                fill="#12B347"
              />
              <path
                d="M26 31.7228V31.7149L22.6699 25.9502C21.1467 26.8336 19.3841 27.3478 17.5 27.3478V34C20.5837 34 23.4936 33.1698 26 31.7228Z"
                fill="#0F993E"
              />
              <path
                d="M7.15218 17C7.15218 15.1162 7.6663 13.3537 8.54957 11.8305L2.78511 8.50793C1.33021 11.0066 0.5 13.9084 0.5 17C0.5 20.0916 1.33021 22.9935 2.78511 25.4921L8.54957 22.1696C7.6663 20.6464 7.15218 18.8839 7.15218 17Z"
                fill="#FFD500"
              />
              <path
                d="M17.5 6.65218C19.9923 6.65218 22.2816 7.53777 24.0697 9.01086C24.5108 9.37424 25.152 9.34801 25.5561 8.94393L28.6951 5.8049C29.1536 5.34643 29.1209 4.59598 28.6312 4.17111C25.6352 1.57204 21.7372 0 17.5 0C11.214 0 5.71861 3.42371 2.78511 8.5079L8.54957 11.8305C10.3415 8.74039 13.6781 6.65218 17.5 6.65218Z"
                fill="#FF4B26"
              />
              <path
                d="M24.0697 9.01086C24.5108 9.37424 25.1521 9.34801 25.5561 8.94393L28.6951 5.8049C29.1535 5.34643 29.1208 4.59598 28.6311 4.17111C25.6352 1.57197 21.7372 0 17.5 0V6.65218C19.9922 6.65218 22.2816 7.53777 24.0697 9.01086Z"
                fill="#D93F21"
              />
            </g>
            <defs>
              <clipPath id="clip0_1002_4608">
                <rect
                  width="34"
                  height="34"
                  fill="white"
                  transform="translate(0.5)"
                />
              </clipPath>
            </defs>
          </svg>
        }
      >
        <span className="font-medium">Sign up/in with Google</span>
      </Button>
      <div className="flex items-center">
        <div className="flex-grow border-t border-gray-300" />
        <span className="mx-4 text-gray-500">Or</span>
        <div className="flex-grow border-t border-gray-300" />
      </div>
    </div>
  );
};

export default LoginWithGoogle;
