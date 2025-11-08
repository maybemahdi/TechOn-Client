interface MyGradientButtonProps {
  variant: "primary" | "secondary";
  label: string;
  onClick?: () => void;
  className?: string;
  isActive?: boolean
}

const MyGradientButton: React.FC<MyGradientButtonProps> = ({
  variant,
  label,
  onClick,
  className = "",
  isActive
}) => {
  const gradients = {
    primary: "linear-gradient(90deg, #032159 0%, #1EA4EA 50%, #66EFFF 100%)",
    secondary: "linear-gradient(90deg, #FF6903 0%, #FFB305 50%, #FFDFA3 100%)",
  };

  return (
    <button
      onClick={onClick}
      className={`
        relative 
        bg-transparent 
        text-white 
        font-medium 
        w-fit
        px-6 py-3 
        rounded-lg 
        transition-all 
        duration-300 
        hover:shadow-lg 
        focus:outline-none 
        focus:ring-4 
        focus:ring-opacity-50
        ${
          variant === "primary"
            ? "focus:ring-blue-400"
            : "focus:ring-orange-400"
        }
        ${isActive ? "bg-green-500" : ""}
        ${className}
      `}
      style={{
        background: "transparent",
      }}
    >
      {/* Animated gradient border */}
      <div
        className="absolute inset-0 rounded-lg opacity-100 transition-opacity duration-300 hover:opacity-80"
        style={{
          // background: gradients[variant],
          padding: "1px",
        }}
      >
        <div
          className={`w-full h-full rounded-md flex items-center justify-center transition-all duration-300 ${
            isActive ? `bg-${gradients["secondary"]}` : "bg-gray-900"
          }`}
        >
          <span className="relative z-10">{label}</span>
        </div>
      </div>

      {/* Animated gradient overlay for hover effect */}
      <div
        className="absolute inset-0 rounded-lg opacity-0 hover:opacity-20 transition-opacity duration-300"
        style={{
          background: gradients[variant],
        }}
      />
    </button>
  );
};

export default MyGradientButton;
