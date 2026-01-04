"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  CreditCard,
  BarChart3,
  Settings,
  X,
  HelpCircle,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const menuItems = [
  {
    name: "แดชบอร์ด",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "จัดการออเดอร์",
    href: "/orders",
    icon: ShoppingBag,
  },
  {
    name: "ลูกค้า",
    href: "/customers",
    icon: Users,
  },
  {
    name: "ชำระเงิน",
    href: "/payments",
    icon: CreditCard,
  },
  {
    name: "รายงาน",
    href: "/reports",
    icon: BarChart3,
  },
];

const bottomMenuItems = [
  {
    name: "ตั้งค่า",
    href: "/settings",
    icon: Settings,
  },
  {
    name: "ช่วยเหลือ",
    href: "#",
    icon: HelpCircle,
  },
];

export default function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:sticky top-0 left-0 z-40 h-screen w-64 bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 transition-transform duration-300 lg:translate-x-0 flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-neutral-900 dark:text-white">
              ระบบซักอบรีด
            </span>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary-500 text-white shadow-md"
                    : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                )}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Menu */}
        <div className="border-t border-neutral-200 dark:border-neutral-800 p-4 space-y-2">
          {bottomMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary-500 text-white shadow-md"
                    : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                )}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span>{item.name}</span>
              </Link>
            );
          })}

          {/* Version Info */}
          <div className="px-4 py-3 text-xs text-neutral-500 dark:text-neutral-400 text-center border-t border-neutral-200 dark:border-neutral-800 mt-2 pt-4">
            v1.0.0
          </div>
        </div>
      </aside>
    </>
  );
}
