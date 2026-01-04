import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "danger" | "warning" | "info" | "status";
  status?: string;
  size?: "sm" | "md";
  className?: string;
}

export default function Badge({
  children,
  variant = "default",
  status,
  size = "md",
  className,
}: BadgeProps) {
  const variants = {
    default:
      "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700",
    success:
      "bg-accent-light dark:bg-accent-dark/20 text-accent-dark dark:text-accent-light border border-accent-500/30",
    danger:
      "bg-danger-light dark:bg-danger-dark/20 text-danger-dark dark:text-danger-light border border-danger-500/30",
    warning:
      "bg-warning-light dark:bg-warning-dark/20 text-warning-dark dark:text-warning-light border border-warning-500/30",
    info: "bg-primary-light dark:bg-primary-dark/20 text-primary-dark dark:text-primary-light border border-primary-500/30",
    status:
      "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700",
  };

  const sizes = {
    sm: "px-2 py-1 text-xs font-medium rounded-md",
    md: "px-3 py-1.5 text-sm font-medium rounded-lg",
  };

  // Map status to variant
  const getStatusVariant = (status: string) => {
    const statusMap: Record<string, keyof typeof variants> = {
      success: "success",
      completed: "success",
      ready: "success",
      pending: "warning",
      processing: "info",
      error: "danger",
      failed: "danger",
      cancelled: "danger",
    };
    return statusMap[status.toLowerCase()] || "default";
  };

  const displayVariant =
    variant === "status" && status ? getStatusVariant(status) : variant;

  return (
    <span className={cn(variants[displayVariant], sizes[size], className)}>
      {children}
    </span>
  );
}
