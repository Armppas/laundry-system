import React from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  variant?: "default" | "elevated";
}

export default function Card({
  children,
  className,
  hover = false,
  variant = "default",
}: CardProps) {
  const variantStyles = {
    default:
      "bg-white dark:bg-neutral-900 rounded-lg shadow-card border border-neutral-200 dark:border-neutral-800",
    elevated:
      "bg-white dark:bg-neutral-900 rounded-lg shadow-lg border border-neutral-100 dark:border-neutral-800",
  };

  return (
    <div
      className={cn(
        variantStyles[variant],
        "p-6",
        hover && "hover:shadow-card-hover transition-shadow duration-200 cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("mb-4", className)}>{children}</div>;
}

export function CardTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3
      className={cn(
        "text-lg font-semibold text-neutral-900 dark:text-neutral-100",
        className
      )}
    >
      {children}
    </h3>
  );
}

export function CardDescription({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("text-sm text-neutral-600 dark:text-neutral-400", className)}>
      {children}
    </p>
  );
}

export function CardContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn(className)}>{children}</div>;
}

export function CardFooter({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-800", className)}>
      {children}
    </div>
  );
}
