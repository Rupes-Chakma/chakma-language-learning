import React from "react";
import { LoaderCircle } from "lucide-react";

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  className = "",
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

  const variants = {
    primary:
      "bg-emerald-700 text-white hover:bg-emerald-800 focus-visible:ring-emerald-600",
    secondary:
      "bg-amber-100 text-amber-950 hover:bg-amber-200 focus-visible:ring-amber-500",
    outline:
      "border border-emerald-700 text-emerald-800 hover:bg-emerald-50 focus-visible:ring-emerald-600",
    ghost: "text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-400",
    danger: "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500",
  };

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-5 py-2.5 text-sm sm:text-base",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${
        sizes[size] || sizes.md
      } ${className}`}
      {...props}
    >
      {loading && <LoaderCircle size={18} className="animate-spin" />}
      {children}
    </button>
  );
}
