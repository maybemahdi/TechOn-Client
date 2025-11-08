"use client";

import type React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

interface ButtonProps {
  label: string;
  isArrow?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: "outline" | "filled";
  fullWidth?: boolean;
  type?: "button" | "submit" | "reset";
  isDisabled?: boolean;
  customIcon?: React.ReactNode;
  iconPosition?: string;
  className?: string;
  isLoading?: boolean;
}

const MyButton: React.FC<ButtonProps> = ({
  isArrow = false,
  label,
  onClick,
  variant = "filled",
  fullWidth,
  type = "button",
  isDisabled = false,
  customIcon,
  iconPosition = "right",
  className,
  isLoading = false,
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [ripples, setRipples] = useState<
    Array<{ id: number; x: number; y: number }>
  >([]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (isDisabled || isLoading) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Create ripple effect
    const newRipple = { id: Date.now(), x, y };
    setRipples((prev) => [...prev, newRipple]);

    // Trigger click animation
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 200);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id));
    }, 600);

    onClick?.(event);
  };

  const baseClasses = cn(
    "rounded-[10px] text-base font-medium transition-all duration-300 cursor-pointer relative overflow-hidden",
    "flex items-center justify-center gap-2",
    "disabled:opacity-70 disabled:cursor-not-allowed",
    "px-6 py-3",
    "transform active:scale-95 hover:shadow-lg hover:shadow-blue-500/25",
    "before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-400/20 before:via-purple-400/20 before:to-pink-400/20 before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100",
    {
      "w-full": fullWidth,
      "animate-pulse": isClicked,
    },
    className
  );

  const variantClasses = {
    outline: cn(
      "border border-blue-300 text-white backdrop-blur-sm",
      "hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10",
      "active:bg-gradient-to-r active:from-blue-500/20 active:to-purple-500/20",
      "px-[calc(24px-2px)]"
    ),
    filled: cn(
      "bg-core-gradient !text-white",
      "hover:from-blue-600 hover:to-purple-700",
      "active:from-blue-700 active:to-purple-800",
      "shadow-lg shadow-blue-500/30"
    ),
  };

  return (
    <button
      disabled={isDisabled}
      type={type}
      onClick={handleClick}
      className={cn(baseClasses, variantClasses[variant])}
    >
      <div className="absolute inset-0 pointer-events-none">
        {ripples.map((ripple) => (
          <div
            key={ripple.id}
            className="absolute rounded-full animate-ping"
            style={{
              left: ripple.x - 10,
              top: ripple.y - 10,
              width: 20,
              height: 20,
              background:
                "radial-gradient(circle, rgba(59, 130, 246, 0.6) 0%, rgba(147, 51, 234, 0.4) 50%, transparent 70%)",
              animationDuration: "0.6s",
            }}
          />
        ))}
      </div>

      <div className="absolute -inset-2 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div
          className="absolute top-0 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-bounce"
          style={{ animationDelay: "0s", animationDuration: "2s" }}
        />
        <div
          className="absolute top-1/2 right-0 w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce"
          style={{ animationDelay: "0.5s", animationDuration: "2.5s" }}
        />
        <div
          className="absolute bottom-0 left-0 w-1 h-1 bg-pink-400 rounded-full animate-bounce"
          style={{ animationDelay: "1s", animationDuration: "3s" }}
        />
        <div
          className="absolute top-1/4 right-1/3 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce"
          style={{ animationDelay: "1.5s", animationDuration: "2s" }}
        />
      </div>

      <span
        className={cn(
          "flex items-center justify-center gap-2 rounded-[8px] relative z-10",
          variant === "outline" && "bg-transparent",
          variant === "filled" && "bg-transparent"
        )}
      >
        {(isArrow || customIcon) && iconPosition === "left" && (
          <span className="flex items-center">
            {isArrow && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                className={cn("transition-transform duration-200", {
                  "text-white": variant === "filled",
                  "text-primary": variant === "outline",
                  "translate-x-1": isClicked, // Added click animation for arrow
                })}
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M19.4489 11.1013C17.1085 11.1013 14.9753 8.96916 14.9753 6.62772V5.66772H13.0553V6.62772C13.0553 8.33076 13.8022 9.92819 14.9744 11.1013H3.12891V13.0213H14.9744C13.8022 14.1944 13.0553 15.7919 13.0553 17.4949V18.4549H14.9753V17.4949C14.9753 15.1535 17.1085 13.0213 19.4489 13.0213H20.4089V11.1013H19.4489Z"
                  fill="currentColor"
                />
              </svg>
            )}
            {customIcon}
          </span>
        )}

        {isLoading ? (
          <Spin indicator={<LoadingOutlined spin />} size="small" />
        ) : (
          ""
        )}

        <span
          className={cn("transition-all duration-200", {
            "scale-105": isClicked,
          })}
        >
          {label}
        </span>

        {(isArrow || customIcon) && iconPosition === "right" && (
          <span className="flex items-center">
            {isArrow && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                className={cn("transition-transform duration-200", {
                  "text-white": variant === "filled",
                  "text-primary": variant === "outline",
                  "translate-x-1": isClicked, // Added click animation for arrow
                })}
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M19.4489 11.1013C17.1085 11.1013 14.9753 8.96916 14.9753 6.62772V5.66772H13.0553V6.62772C13.0553 8.33076 13.8022 9.92819 14.9744 11.1013H3.12891V13.0213H14.9744C13.8022 14.1944 13.0553 15.7919 13.0553 17.4949V18.4549H14.9753V17.4949C14.9753 15.1535 17.1085 13.0213 19.4489 13.0213H20.4089V11.1013H19.4489Z"
                  fill="currentColor"
                />
              </svg>
            )}
            {customIcon}
          </span>
        )}
      </span>
    </button>
  );
};

export default MyButton;
