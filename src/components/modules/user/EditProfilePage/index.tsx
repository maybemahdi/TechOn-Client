"use client";
import Loading from "@/components/ui/core/Loading/Loading";
import {
  useGetMeQuery,
  useUpdateUserMutation,
} from "@/redux/features/auth/authApi";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";
import Link from "next/link";
import React, { useState, useCallback } from "react";

interface ProfileFormData {
  name: string;
  phone: string;
}

const InputField: React.FC<{
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
  error?: string;
  icon: React.ReactNode;
  isDisabled?: boolean;
}> = React.memo(
  ({
    label,
    value,
    onChange,
    placeholder,
    type = "text",
    error,
    icon,
    isDisabled,
  }) => (
    <div className="mb-8">
      <label className="block text-gray-900 font-medium text-base mb-2">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
          {icon}
        </div>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full h-12 pl-10 pr-4 rounded-lg border text-base placeholder-gray-400 transition-colors duration-200 ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-100"
              : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
          } focus:outline-none focus:ring-2`}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  )
);
InputField.displayName = "InputField";

const EditProfilePage: React.FC = () => {
  const { data, isLoading, isFetching } = useGetMeQuery(undefined);
  const user: any = data?.data;

  const [profileImage, setProfileImage] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ProfileFormData>({
    name: "",
    phone: "",
  });
  const [errors, setErrors] = useState<Partial<ProfileFormData>>({});

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setProfileImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = useCallback(
    (field: keyof ProfileFormData, value: string) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));

      // Clear error when user starts typing
      if (errors[field]) {
        setErrors((prev) => ({
          ...prev,
          [field]: "",
        }));
      }
    },
    [errors]
  );

  // const validateForm = (): boolean => {
  //   const newErrors: Partial<ProfileFormData> = {};

  //   if (!formData.name.trim()) {
  //     newErrors.name = "Please input your name!";
  //   }

  //   if (!formData.phone.trim()) {
  //     newErrors.phone = "Please input your phone number!";
  //   }

  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  const [updateUser] = useUpdateUserMutation();
  const handleSubmit = async () => {
    // if (!validateForm()) return;
    const payloadFormData = new FormData();
    payloadFormData.append("bodyData", JSON.stringify(formData));
    if (profileImage && profileImage.startsWith("data:")) {
      // Convert DataURL back to Blob
      const arr = profileImage.split(",");
      const mime = arr[0].match(/:(.*?);/)?.[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
      }
      const file = new Blob([u8arr], { type: mime });
      payloadFormData.append("profileImage", file, "profileImage.png");
    }
    setLoading(true);
    try {
      const res = await handleAsyncWithToast(async () => {
        return updateUser(payloadFormData);
      }, "Updating profile...");
      if (res?.data?.success) {
        setFormData({
          name: "",
          phone: "",
        });
        setProfileImage("");
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading || isFetching) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto py-8 px-4">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link
            href="/"
            className="cursor-pointer hover:text-gray-900 transition-colors"
          >
            Home
          </Link>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-gray-900 font-medium">Edit profile</span>
        </div>

        {/* Profile Form */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          {/* Profile Image */}
          <div className="flex flex-col items-center mb-12">
            <div className="relative mb-4">
              {profileImage || user?.profileImage ? (
                <img
                  src={profileImage || user?.profileImage}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover bg-gray-200 border-4 border-white shadow-lg"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-200 border-4 border-white shadow-lg flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>

            <label className="bg-gradient-to-r from-[#FF6903] via-[#FFB305] to-[#FFDFA3] text-white font-medium px-6 py-2.5 rounded-md cursor-pointer transition-colors duration-200 flex items-center space-x-2 shadow-md hover:shadow-lg">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>Upload Image</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            <InputField
              label="Name"
              value={formData.name || user?.name || ""}
              onChange={(val) => handleInputChange("name", val)}
              placeholder="Admin"
              error={errors.name}
              icon={
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              }
            />
            <div className="mb-8">
              <label className="block text-gray-900 font-medium text-base mb-2">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0017 4H3a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <input
                  type="email"
                  value={user?.email}
                  readOnly
                  className="w-full h-12 pl-10 pr-4 rounded-lg border text-base placeholder-gray-400 transition-colors duration-200"
                />
              </div>
            </div>

            <InputField
              label="Phone"
              value={formData.phone || user?.phone || ""}
              onChange={(val) => handleInputChange("phone", val)}
              placeholder="0123456789"
              error={errors.phone}
              icon={
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              }
            />
          </div>

          {/* Save Button */}
          <div className="flex justify-center mt-12">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-gradient-to-r from-blue-600 to-cyan-400 hover:from-blue-700 hover:to-cyan-500 disabled:from-blue-400 disabled:to-cyan-300 text-white font-medium px-12 py-3 rounded-lg text-base shadow-lg hover:shadow-xl disabled:shadow-md transition-all duration-200 flex items-center space-x-2"
            >
              {loading && (
                <svg
                  className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              )}
              <span>{loading ? "Saving..." : "Save"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;
