"use client";

import React, { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";
import { Moon, Sun, LogOut, Menu, Search, Bell } from "lucide-react";
import Button from "@/components/ui/Button";

interface NavbarProps {
  onMenuClick?: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  const getRoleName = (role: string) => {
    const roles: Record<string, string> = {
      admin: "ผู้ดูแลระบบ",
      staff: "พนักงาน",
      customer: "ลูกค้า",
    };
    return roles[role] || role;
  };

  return (
    <nav className="sticky top-0 z-40 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between gap-6">
          {/* Left: Menu Button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Center: Search Bar */}
          <div className="flex-1 max-w-md hidden md:flex items-center">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder="ค้นหาลูกค้า, สินค้า, ฯลฯ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-danger-500 rounded-full" />
            </button>

            {/* Divider */}
            <div className="w-px h-6 bg-neutral-200 dark:bg-neutral-700" />

            {/* User Profile */}
            {user && (
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex flex-col items-end">
                  <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                    {user.name}
                  </p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    {getRoleName(user.role)}
                  </p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {user.name.charAt(0)}
                </div>
              </div>
            )}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>

            {/* Logout */}
            {user && (
              <button
                onClick={logout}
                className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-neutral-700 dark:text-neutral-300 hover:text-danger-600 transition-colors"
                aria-label="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
