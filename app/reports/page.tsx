"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import MainLayout from "@/components/layout/MainLayout";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";
import { Download, TrendingUp, TrendingDown, Calendar } from "lucide-react";

export default function ReportsPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  const mockStats = {
    totalRevenue: 125000,
    totalOrders: 245,
    avgOrderValue: 510,
    completionRate: 94,
    revenueGrowth: 12.5,
    ordersGrowth: 8.3,
  };

  const topServices = [
    { name: "ซักผ้าธรรมดา", orders: 120, revenue: 48000 },
    { name: "รีดผ้า", orders: 95, revenue: 28500 },
    { name: "ซักผ้านวม", orders: 45, revenue: 22500 },
    { name: "ซักพรม", orders: 30, revenue: 18000 },
    { name: "ซักแห้ง", orders: 25, revenue: 8000 },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              รายงาน
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              สรุปผลการดำเนินงานและสถิติ
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" size="md">
              <Calendar className="w-4 h-4 mr-2" />
              เลือกช่วงเวลา
            </Button>
            <Button variant="primary" size="md">
              <Download className="w-4 h-4 mr-2" />
              ส่งออกรายงาน
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                รายได้รวม
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {formatCurrency(mockStats.totalRevenue)}
              </p>
              <div className="flex items-center gap-1 text-green-600 dark:text-green-400 text-sm">
                <TrendingUp className="w-4 h-4" />
                <span>+{mockStats.revenueGrowth}%</span>
              </div>
            </div>
          </Card>

          <Card>
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                ออเดอร์ทั้งหมด
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {mockStats.totalOrders}
              </p>
              <div className="flex items-center gap-1 text-green-600 dark:text-green-400 text-sm">
                <TrendingUp className="w-4 h-4" />
                <span>+{mockStats.ordersGrowth}%</span>
              </div>
            </div>
          </Card>

          <Card>
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                ค่าเฉลี่ยต่อออเดอร์
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {formatCurrency(mockStats.avgOrderValue)}
              </p>
              <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400 text-sm">
                <span>เท่าเดิม</span>
              </div>
            </div>
          </Card>

          <Card>
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                อัตราความสำเร็จ
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {mockStats.completionRate}%
              </p>
              <div className="flex items-center gap-1 text-green-600 dark:text-green-400 text-sm">
                <TrendingUp className="w-4 h-4" />
                <span>+2.1%</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Chart */}
          <Card>
            <CardHeader>
              <CardTitle>รายได้รายเดือน</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl">
                <div className="text-center">
                  <TrendingUp className="w-16 h-16 text-primary mx-auto mb-3" />
                  <p className="text-gray-600 dark:text-gray-400">
                    กราฟรายได้รายเดือน
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                    (Chart Placeholder)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Orders Chart */}
          <Card>
            <CardHeader>
              <CardTitle>จำนวนออเดอร์รายเดือน</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl">
                <div className="text-center">
                  <TrendingUp className="w-16 h-16 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
                  <p className="text-gray-600 dark:text-gray-400">
                    กราฟจำนวนออเดอร์รายเดือน
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                    (Chart Placeholder)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Services */}
        <Card>
          <CardHeader>
            <CardTitle>บริการยอดนิยม</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-slate-700">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      อันดับ
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      บริการ
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      จำนวนออเดอร์
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      รายได้
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      สัดส่วน
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {topServices.map((service, index) => {
                    const percentage = (
                      (service.revenue / mockStats.totalRevenue) *
                      100
                    ).toFixed(1);
                    return (
                      <tr
                        key={index}
                        className="border-b border-gray-100 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors"
                      >
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold">
                            {index + 1}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-900 dark:text-gray-100 font-medium">
                          {service.name}
                        </td>
                        <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                          {service.orders} รายการ
                        </td>
                        <td className="py-3 px-4 text-gray-900 dark:text-gray-100 font-semibold">
                          {formatCurrency(service.revenue)}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary rounded-full"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <span className="text-sm text-gray-600 dark:text-gray-400 min-w-[3rem] text-right">
                              {percentage}%
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
