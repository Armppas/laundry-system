import React from "react";
import { cn } from "@/lib/utils";
import { getStatusColor } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "status";
  status?: string;
  className?: string;
}

export default function Badge({
  children,
  variant = "default",
  status,
  className,
}: BadgeProps) {
  if (variant === "status" && status) {
    const colors = getStatusColor(status);
    return (
      <span
        className={cn(
          "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border",
          colors.bg,
          colors.text,
          colors.border,
          className
        )}
      >
        {children}
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium",
        "bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300",
        className
      )}
    >
      {children}
    </span>
  );
}
