import React from "react";

export default function ProgressBar({
  value = 0,
  max = 100,
  label,
  showPercentage = true,
  color = "emerald",
  size = "md",
  className = "",
}) {
  const safeMax = Number.isFinite(max) && max > 0 ? max : 100;
  const safeValue = Number.isFinite(value) ? value : 0;
  const percentage = Math.min(100, Math.max(0, (safeValue / safeMax) * 100));

  const colors = {
    emerald: "bg-emerald-600",
    amber: "bg-amber-500",
    blue: "bg-blue-600",
    purple: "bg-purple-600",
  };

  const heights = {
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-4",
  };

  return (
    <div className={`w-full ${className}`}>
      {(label || showPercentage) && (
        <div className="mb-2 flex items-center justify-between gap-3">
          {label && (
            <span className="text-sm font-medium text-gray-700">{label}</span>
          )}

          {showPercentage && (
            <span className="text-sm font-semibold text-emerald-800">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}

      <div
        role="progressbar"
        aria-label={label || "Progress"}
        aria-valuemin={0}
        aria-valuemax={safeMax}
        aria-valuenow={Math.min(safeValue, safeMax)}
        className={`w-full overflow-hidden rounded-full bg-gray-200 ${
          heights[size] || heights.md
        }`}
      >
        <div
          className={`h-full rounded-full transition-[width] duration-500 ${
            colors[color] || colors.emerald
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
