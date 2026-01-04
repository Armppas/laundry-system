"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import MainLayout from "@/components/layout/MainLayout";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Moon, Sun, User, Bell, Lock, Globe } from "lucide-react";

export default function SettingsPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            ตั้งค่า
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            จัดการการตั้งค่าระบบและโปรไฟล์
          </p>
        </div>

        {/* Profile */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle>โปรไฟล์</CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  จัดการข้อมูลส่วนตัว
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  ชื่อ
                </label>
                <input
                  type="text"
                  value={user?.name || ""}
                  readOnly
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  อีเมล
                </label>
                <input
                  type="email"
                  value={user?.email || ""}
                  readOnly
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  เบอร์โทรศัพท์
                </label>
                <input
                  type="tel"
                  value={user?.phone || ""}
                  readOnly
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  บทบาท
                </label>
                <input
                  type="text"
                  value={
                    user?.role === "admin"
                      ? "ผู้ดูแลระบบ"
                      : user?.role === "staff"
                      ? "พนักงาน"
                      : "ลูกค้า"
                  }
                  readOnly
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-gray-100"
                />
              </div>
              <Button variant="primary" size="md" disabled>
                บันทึกการเปลี่ยนแปลง
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              {theme === "light" ? (
                <Sun className="w-6 h-6 text-primary" />
              ) : (
                <Moon className="w-6 h-6 text-primary" />
              )}
              <div>
                <CardTitle>รูปแบบการแสดงผล</CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  เลือกธีมที่คุณชอบ
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  โหมดมืด
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  ปัจจุบัน: {theme === "light" ? "โหมดสว่าง" : "โหมดมืด"}
                </p>
              </div>
              <button
                onClick={toggleTheme}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                  theme === "dark" ? "bg-primary" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    theme === "dark" ? "translate-x-7" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Bell className="w-6 h-6 text-primary" />
              <div>
                <CardTitle>การแจ้งเตือน</CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  จัดการการแจ้งเตือนของคุณ
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    แจ้งเตือนออเดอร์ใหม่
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    รับการแจ้งเตือนเมื่อมีออเดอร์ใหม่
                  </p>
                </div>
                <button className="relative inline-flex h-8 w-14 items-center rounded-full bg-primary">
                  <span className="inline-block h-6 w-6 transform rounded-full bg-white translate-x-7" />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    แจ้งเตือนสถานะงาน
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    รับการแจ้งเตือนเมื่อสถานะงานเปลี่ยนแปลง
                  </p>
                </div>
                <button className="relative inline-flex h-8 w-14 items-center rounded-full bg-primary">
                  <span className="inline-block h-6 w-6 transform rounded-full bg-white translate-x-7" />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    แจ้งเตือนการชำระเงิน
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    รับการแจ้งเตือนเมื่อมีการชำระเงิน
                  </p>
                </div>
                <button className="relative inline-flex h-8 w-14 items-center rounded-full bg-gray-300">
                  <span className="inline-block h-6 w-6 transform rounded-full bg-white translate-x-1" />
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Lock className="w-6 h-6 text-primary" />
              <div>
                <CardTitle>ความปลอดภัย</CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  จัดการความปลอดภัยของบัญชี
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button variant="secondary" size="md" className="w-full" disabled>
                เปลี่ยนรหัสผ่าน
              </Button>
              <Button variant="secondary" size="md" className="w-full" disabled>
                เปิดใช้งานการยืนยันตัวตนแบบสองขั้นตอน
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* System Info */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Globe className="w-6 h-6 text-primary" />
              <div>
                <CardTitle>ข้อมูลระบบ</CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <div className="flex justify-between">
                <span>เวอร์ชัน</span>
                <span className="font-medium">1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span>สถานะ</span>
                <span className="font-medium text-green-600 dark:text-green-400">
                  ออนไลน์
                </span>
              </div>
              <div className="flex justify-between">
                <span>อัปเดตล่าสุด</span>
                <span className="font-medium">4 มกราคม 2568</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
