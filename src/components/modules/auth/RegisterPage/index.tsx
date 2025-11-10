"use client";

import registerImage from "@/assets/images/register.png";
import MyButton from "@/components/ui/core/MyButton/MyButton";
import MyFormInput from "@/components/ui/core/MyForm/MyFormInput/MyFormInput";
import MyFormWrapper from "@/components/ui/core/MyForm/MyFormWrapper/MyFormWrapper";
import LoginWithGoogle from "@/components/ui/LoginWithGoogle/LoginWithGoogle";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  email: z.string({ required_error: "Email is required" }).email({
    message: "Invalid email address",
  }),
  password: z.string({ required_error: "Password is required" }).min(8),
});

const RegisterPage = () => {
  const router = useRouter();

  const [register] = useRegisterMutation();
  const handleSubmit = async (data: any, reset: any) => {
    const res = await handleAsyncWithToast(async () => {
      return register(data);
    }, "Registering...");
    if (res?.data?.success) {
      reset();
      sessionStorage.setItem(
        "userDataToLogin",
        JSON.stringify({
          email: data.email,
          password: data.password,
        })
      );
      router.push(`/verify-email?redirectUrl=/&type=SIGNUP&email=${data.email}`);
    }
  };

  return (
    <section className="flex items-center justify-center py-8 md:py-16 bg-red-50 min-h-screen">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <div className="mb-8 text-text-secondary text-sm">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>{" "}
          <span className="mx-1">&gt;</span> Sign up
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
            {/* <div className="flex space-x-4">
              <MyButton label="Sign up" fullWidth />
              <Button
                onClick={() => router.push("/login")}
                type="default"
                size="large"
                className="w-full bg-gray-200 !text-gray-700 hover:!bg-gray-300 border-none font-semibold rounded-lg h-12"
              >
                Login
              </Button>
            </div> */}

            {/* <h2 className="text-2xl font-bold text-text-primary">
              Grab Your Offer Today!
            </h2> */}

            {/* Google Sign Up */}
            {/* <LoginWithGoogle /> */}
            {/* <div className="space-y-4">
              <p className="text-gray-700 text-base">Sign up open account</p>
              <Button
                size="large"
                className="w-full flex items-center justify-center space-x-2 border border-gray-300 rounded-lg h-12 text-gray-700 hover:border-primary hover:text-primary transition-colors"
                icon={<GoogleOutlined className="text-xl" />}
              >
                <span className="font-medium">Sign up with Google</span>
              </Button>
              <div className="flex items-center">
                <div className="flex-grow border-t border-gray-300" />
                <span className="mx-4 text-gray-500">Or</span>
                <div className="flex-grow border-t border-gray-300" />
              </div>
            </div> */}

            {/* Registration Form */}
            <MyFormWrapper
              className="space-y-4"
              onSubmit={handleSubmit}
              resolver={zodResolver(registerSchema)}
            >
              <MyFormInput
                name="name"
                label="Name"
                placeHolder="Enter your name"
                inputClassName="py-3"
              />
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
              <MyButton type="submit" label="Let's Start" fullWidth isArrow />
            </MyFormWrapper>

            {/* Additional Action */}
            <div className="flex items-center justify-center">
              <p className="text-text-secondary text-sm">
                Already have an account?{" "}
                <Link href="/login" className="text-primary hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </div>

          {/* Right Column - Illustrative Image */}
          <div
            className="hidden lg:flex items-center justify-center rounded-2xl overflow-hidden shadow-lg"
            style={{
              backgroundImage: `url(${registerImage.src})`,
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

export default RegisterPage;
