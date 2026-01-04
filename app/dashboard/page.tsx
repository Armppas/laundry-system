"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import MainLayout from "@/components/layout/MainLayout";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  ShoppingBag,
  DollarSign,
  Clock,
  Users,
  ArrowRight,
  Filter,
  Download,
} from "lucide-react";

export default function DashboardPage() {
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

  // Mock data for charts
  const revenueData = [
    { month: "มค.", revenue: 8000, target: 10000 },
    { month: "กพ.", revenue: 12000, target: 10000 },
    { month: "มีค.", revenue: 15000, target: 10000 },
    { month: "เมย.", revenue: 18000, target: 10000 },
    { month: "พค.", revenue: 12000, target: 10000 },
    { month: "มิย.", revenue: 16832, target: 10000 },
  ];

  const trafficData = [
    { name: "Direct", value: 55 },
    { name: "Organic", value: 25 },
    { name: "Referral", value: 20 },
  ];

  const COLORS = ["#5B7FFF", "#A8BFFF", "#D1DDFF"];

  const mockKPIs = [
    {
      title: "ออเดอร์ทั้งหมด",
      value: "12,832",
      change: 20.1,
      today: 2123,
      icon: ShoppingBag,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "ยอดขายรวม",
      value: "$12,832.80",
      change: 10.8,
      today: 1895,
      icon: DollarSign,
      color: "from-green-500 to-green-600",
    },
    {
      title: "งานค้าง",
      value: "1,062",
      change: -30,
      today: -426,
      icon: Clock,
      color: "from-orange-500 to-orange-600",
    },
    {
      title: "ลูกค้าใหม่",
      value: "89%",
      change: 12,
      today: 42,
      icon: Users,
      color: "from-purple-500 to-purple-600",
    },
  ];

  const mockOrders = [
    {
      id: "ORD001",
      customer: "สมชาย ใจดี",
      status: "completed",
      amount: 290,
      date: "2025-01-04",
    },
    {
      id: "ORD002",
      customer: "สมหญิง รักษ์ดี",
      status: "processing",
      amount: 300,
      date: "2025-01-03",
    },
    {
      id: "ORD003",
      customer: "ประยุทธ มั่นคง",
      status: "ready",
      amount: 760,
      date: "2025-01-02",
    },
  ];

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      completed: "success",
      processing: "info",
      ready: "warning",
      pending: "danger",
    };
    return colors[status] || "default";
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      completed: "เสร็จแล้ว",
      processing: "กำลังดำเนินการ",
      ready: "พร้อมรับ",
      pending: "รอดำเนินการ",
    };
    return labels[status] || status;
  };

  return (
    <MainLayout>
      <div className="space-y-6 lg:space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-neutral-900 dark:text-neutral-100">
              สวัสดี, Admin!
            </h1>
            <p className="text-sm lg:text-base text-neutral-600 dark:text-neutral-400 mt-1">
              นี่คือรายละเอียดการวิเคราะห์ของคุณ
            </p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="secondary" size="md" className="flex-1 sm:flex-none">
              <Filter className="w-4 h-4 mr-2" />
              Filter by
            </Button>
            <Button variant="primary" size="md" className="flex-1 sm:flex-none">
              <Download className="w-4 h-4 mr-2" />
              ส่งออก
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {mockKPIs.map((kpi, index) => {
            const Icon = kpi.icon;
            const isPositive = kpi.change >= 0;

            return (
              <Card key={index} hover>
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-xs lg:text-sm text-neutral-600 dark:text-neutral-400 mb-1">
                        {kpi.title}
                      </p>
                      <p className="text-xl lg:text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                        {kpi.value}
                      </p>
                    </div>
                    <div
                      className={`p-2 lg:p-3 rounded-lg bg-gradient-to-br ${kpi.color} flex-shrink-0`}
                    >
                      <Icon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    {isPositive ? (
                      <TrendingUp className="w-4 h-4 text-accent-500 flex-shrink-0" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-danger-500 flex-shrink-0" />
                    )}
                    <span
                      className={`text-xs lg:text-sm font-medium ${
                        isPositive
                          ? "text-accent-600 dark:text-accent-400"
                          : "text-danger-600 dark:text-danger-400"
                      }`}
                    >
                      {isPositive ? "+" : ""}{kpi.change}%
                    </span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">
                      {kpi.today} วันนี้
                    </span>
                  </div>

                  <button className="text-xs lg:text-sm text-primary-500 hover:text-primary-600 font-medium flex items-center gap-1 mt-2">
                    ดูรายงาน
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          {/* Revenue Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>รายได้</CardTitle>
                <select className="text-xs lg:text-sm px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100">
                  <option>เดือน</option>
                  <option>ปี</option>
                </select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <p className="text-xl lg:text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                  $85,400.12
                </p>
                <p className="text-xs lg:text-sm text-accent-600 dark:text-accent-400">
                  ↑ +13%
                </p>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="month" stroke="#9CA3AF" style={{ fontSize: "12px" }} />
                  <YAxis stroke="#9CA3AF" style={{ fontSize: "12px" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      border: "none",
                      borderRadius: "8px",
                      color: "#F3F4F6",
                      fontSize: "12px",
                    }}
                  />
                  <Bar dataKey="revenue" fill="#5B7FFF" radius={[6, 6, 0, 0]} />
                  <Bar
                    dataKey="target"
                    fill="#D1DDFF"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Traffic Chart */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>ช่องทางการเข้า</CardTitle>
                <select className="text-xs lg:text-sm px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100">
                  <option>ทั้งหมด</option>
                </select>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={trafficData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {trafficData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {trafficData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{ backgroundColor: COLORS[index] }}
                      />
                      <span className="text-xs lg:text-sm text-neutral-700 dark:text-neutral-300">
                        {item.name}
                      </span>
                    </div>
                    <span className="text-xs lg:text-sm font-medium text-neutral-900 dark:text-neutral-100">
                      {item.value}%
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>กิจกรรมล่าสุด</CardTitle>
              <select className="text-xs lg:text-sm px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100">
                <option>24 ชั่วโมงที่ผ่านมา</option>
              </select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-neutral-200 dark:border-neutral-800">
                    <th className="text-left py-3 px-3 lg:px-4 text-xs lg:text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                      ลูกค้า
                    </th>
                    <th className="text-left py-3 px-3 lg:px-4 text-xs lg:text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                      สถานะ
                    </th>
                    <th className="text-left py-3 px-3 lg:px-4 text-xs lg:text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                      รหัสออเดอร์
                    </th>
                    <th className="text-left py-3 px-3 lg:px-4 text-xs lg:text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                      เวลา
                    </th>
                    <th className="text-left py-3 px-3 lg:px-4 text-xs lg:text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                      จำนวนเงิน
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mockOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-neutral-100 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
                    >
                      <td className="py-3 px-3 lg:px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 lg:w-8 lg:h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                            {order.customer.charAt(0)}
                          </div>
                          <span className="text-xs lg:text-sm font-medium text-neutral-900 dark:text-neutral-100">
                            {order.customer}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-3 lg:px-4">
                        <Badge variant={getStatusColor(order.status) as any}>
                          {getStatusLabel(order.status)}
                        </Badge>
                      </td>
                      <td className="py-3 px-3 lg:px-4">
                        <span className="text-xs lg:text-sm text-primary-500 hover:underline cursor-pointer font-medium">
                          {order.id}
                        </span>
                      </td>
                      <td className="py-3 px-3 lg:px-4">
                        <span className="text-xs lg:text-sm text-neutral-600 dark:text-neutral-400">
                          5 นาทีที่แล้ว
                        </span>
                      </td>
                      <td className="py-3 px-3 lg:px-4">
                        <span className="text-xs lg:text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                          {formatCurrency(order.amount)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
