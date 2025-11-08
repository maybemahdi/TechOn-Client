"use client";
import { useChangePasswordMutation } from "@/redux/features/auth/authApi";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";
import React, { useState, useCallback } from "react";
import { toast } from "sonner";

interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const PasswordInputField: React.FC<{
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  error?: string;
  showPassword: boolean;
  onToggleVisibility: () => void;
}> = React.memo(
  ({
    label,
    value,
    onChange,
    placeholder,
    error,
    showPassword,
    onToggleVisibility,
  }) => (
    <div className="mb-8">
      <label className="block text-gray-900 font-medium text-base mb-3">
        {label}
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full h-14 px-4 pr-12 rounded-lg border text-base placeholder-gray-400 transition-colors duration-200 ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-100"
              : "border-gray-300 focus:border-blue-500 focus:ring-blue-100"
          } focus:outline-none focus:ring-2`}
        />
        <button
          type="button"
          onClick={onToggleVisibility}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
        >
          {showPassword ? (
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
                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
              />
            </svg>
          ) : (
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
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          )}
        </button>
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  )
);
PasswordInputField.displayName = "PasswordInputField";

const ChangePasswordPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<PasswordFormData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<
    Partial<PasswordFormData & { match?: string }>
  >({});
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const handleInputChange = useCallback(
    (field: keyof PasswordFormData, value: string) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));

      // Clear error for the field
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: "" }));
      }
      if (field === "confirmPassword" && errors.match) {
        setErrors((prev) => ({ ...prev, match: "" }));
      }
    },
    [errors]
  );

  const togglePasswordVisibility = (field: "current" | "new" | "confirm") => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<PasswordFormData & { match?: string }> = {};

    if (!formData.currentPassword.trim()) {
      newErrors.currentPassword = "Please enter your current password!";
    }

    if (!formData.newPassword.trim()) {
      newErrors.newPassword = "Please enter a new password!";
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters!";
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your new password!";
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.match = "Passwords do not match!";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [changePassword] = useChangePasswordMutation();
  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const res = await handleAsyncWithToast(async () => {
        return changePassword({
          oldPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        });
      }, "Changing password...");
      if (res?.data?.success) {
        toast.success("Password changed successfully!");
      }

      // Reset form
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Failed to change password:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto py-8 px-4">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-12">
          <span className="cursor-pointer hover:text-gray-900 transition-colors">
            Home
          </span>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-gray-900 font-medium">Change password</span>
        </div>

        {/* Password Form */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="space-y-6">
            <PasswordInputField
              label="Current password"
              value={formData.currentPassword}
              onChange={(val) => handleInputChange("currentPassword", val)}
              placeholder="Enter current password"
              error={errors.currentPassword}
              showPassword={showPasswords.current}
              onToggleVisibility={() => togglePasswordVisibility("current")}
            />

            <PasswordInputField
              label="New password"
              value={formData.newPassword}
              onChange={(val) => handleInputChange("newPassword", val)}
              placeholder="Enter new password"
              error={errors.newPassword}
              showPassword={showPasswords.new}
              onToggleVisibility={() => togglePasswordVisibility("new")}
            />

            <PasswordInputField
              label="Re-Type New password"
              value={formData.confirmPassword}
              onChange={(val) => handleInputChange("confirmPassword", val)}
              placeholder="Re-Type new password"
              error={errors.confirmPassword || errors.match}
              showPassword={showPasswords.confirm}
              onToggleVisibility={() => togglePasswordVisibility("confirm")}
            />
          </div>

          {/* Save Button */}
          <div className="flex justify-center mt-12">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-gradient-to-r from-blue-600 to-cyan-400 hover:from-blue-700 hover:to-cyan-500 disabled:from-blue-400 disabled:to-cyan-300 text-white font-medium px-12 py-3 rounded-lg text-base shadow-lg hover:shadow-xl disabled:shadow-md transition-all duration-200 flex items-center space-x-2 min-w-[120px] justify-center"
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
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              )}
              <span>{loading ? "Saving..." : "Save"}</span>
            </button>
          </div>
        </div>

        {/* Password Requirements */}
        {/* <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-blue-900 mb-2">
            Password Requirements:
          </h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• At least 6 characters long</li>
            <li>• Should contain a mix of letters and numbers</li>
            <li>• Avoid using common passwords</li>
          </ul>
        </div> */}
      </div>
    </div>
  );
};

export default ChangePasswordPage;
