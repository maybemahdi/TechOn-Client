"use client";

import MyButton from "@/components/ui/core/MyButton/MyButton";
import MyFormInput from "@/components/ui/core/MyForm/MyFormInput/MyFormInput";
import MyFormWrapper from "@/components/ui/core/MyForm/MyFormWrapper/MyFormWrapper";
import { Button } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import loginImage from "@/assets/images/login.png";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";
import { setUser } from "@/redux/features/auth/authSlice";
import LoginWithGoogle from "@/components/ui/LoginWithGoogle/LoginWithGoogle";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [login] = useLoginMutation();
  const handleSubmit = async (data: any, reset: any) => {
    const res = await handleAsyncWithToast(async () => {
      return login(data);
    }, "Logging in...");
    if (res?.data?.success) {
      sessionStorage.removeItem("userDataToLogin");
      const { accessToken, ...rest } = res.data.data;
      dispatch(
        setUser({
          user: rest,
          access_token: accessToken,
        })
      );
      if (res.data.data?.role === "ADMIN") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } else {
      if (
        res?.error?.data?.message ===
        "Please check your email address to verify your account"
      ) {
        sessionStorage.setItem("userDataToLogin", JSON.stringify(data));
        router.push(
          `/verify-email?redirectUrl=/&type=SIGNUP&email=${data.email}`
        );
      }
    }
    reset({
      email: "",
      password: "",
    });
  };

  return (
    <section className="flex items-center justify-center py-8 md:py-16 bg-red-50 min-h-screen">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <div className="mb-8 text-text-secondary text-sm">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>{" "}
          <span className="mx-1">&gt;</span> Sign in
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left Column - Registration Form */}
          <div className="space-y-8">
            {/* Company Info */}
            {/* <div className="space-y-2">
              <h1 className="text-4xl font-bold text-text-primary">Company</h1>
              <p className="text-text-secondary text-lg">
                Explore more, creative more
              </p>
            </div> */}

            {/* Sign up / Login Buttons */}
            <div className="flex space-x-4">
              <Button
                onClick={() => router.push("/register")}
                type="default"
                size="large"
                className="w-full bg-gray-200 !text-gray-700 hover:!bg-gray-300 border-none font-semibold rounded-lg h-12"
              >
                Sign up
              </Button>
              <MyButton label="Login" fullWidth />
            </div>

            {/* <h2 className="text-2xl font-bold text-text-primary">
              Grab Your Offer Today!
            </h2> */}

            {/* Google Sign Up */}
            {/* <LoginWithGoogle /> */}
            {/* <div className="space-y-4">
              <p className="text-gray-700 text-base">Login</p>
              <Button
                size="large"
                className="w-full flex items-center justify-center space-x-2 border border-gray-300 rounded-lg h-12 text-gray-700 hover:border-primary hover:text-primary transition-colors"
                icon={<GoogleOutlined className="text-xl" />}
              >
                <span className="font-medium">Login with Google</span>
              </Button>
              <div className="flex items-center">
                <div className="flex-grow border-t border-gray-300" />
                <span className="mx-4 text-gray-500">Or</span>
                <div className="flex-grow border-t border-gray-300" />
              </div>
            </div> */}

            {/* Login Form */}
            <MyFormWrapper
              className="space-y-4"
              onSubmit={handleSubmit}
              resolver={zodResolver(registerSchema)}
            >
              <MyFormInput
                name="email"
                label="Email"
                placeHolder="Enter your email"
                inputClassName="py-3"
              />
              <MyFormInput
                type="password"
                name="password"
                label="Password"
                placeHolder="Enter your password"
                inputClassName="py-3"
              />
              <div className="flex justify-end">
                <Link
                  href={"/forgot-password"}
                  className="text-primary hover:underline"
                >
                  Forgot Password
                </Link>
              </div>
              <MyButton type="submit" label="Login" fullWidth isArrow />
            </MyFormWrapper>
          </div>

          {/* Right Column - Illustrative Image */}
          <div
            className="hidden lg:flex items-center justify-center rounded-2xl overflow-hidden shadow-lg"
            style={{
              backgroundImage: `url(${loginImage.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              minHeight: "500px",
            }}
          >
            {/* You can add an actual image here */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
