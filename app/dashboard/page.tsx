"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import MainLayout from "@/components/layout/MainLayout";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { SkeletonKPI, SkeletonTable } from "@/components/ui/Skeleton";
import {
  getTodayOrders,
  getTodayRevenue,
  getPendingOrders,
  getReadyOrders,
  mockOrders,
  Order,
} from "@/lib/mockData";
import { formatCurrency, formatTime } from "@/lib/utils";
import {
  ShoppingBag,
  DollarSign,
  Clock,
  Package,
  TrendingUp,
  Plus,
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    todayOrders: 0,
    todayRevenue: 0,
    pendingOrders: 0,
    readyOrders: 0,
  });
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    // Simulate loading
    setTimeout(() => {
      setStats({
        todayOrders: getTodayOrders().length,
        todayRevenue: getTodayRevenue(),
        pendingOrders: getPendingOrders().length,
        readyOrders: getReadyOrders().length,
      });
      setRecentOrders(mockOrders.slice(0, 5));
      setLoading(false);
    }, 1000);
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  const kpiCards = [
    {
      title: "งานวันนี้",
      value: stats.todayOrders,
      unit: "รายการ",
      icon: ShoppingBag,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      title: "รายได้วันนี้",
      value: formatCurrency(stats.todayRevenue),
      unit: "",
      icon: DollarSign,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-100 dark:bg-green-900/30",
    },
    {
      title: "งานค้าง",
      value: stats.pendingOrders,
      unit: "รายการ",
      icon: Clock,
      color: "text-yellow-600 dark:text-yellow-400",
      bgColor: "bg-yellow-100 dark:bg-yellow-900/30",
    },
    {
      title: "ลูกค้ารอรับ",
      value: stats.readyOrders,
      unit: "รายการ",
      icon: Package,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-100 dark:bg-purple-900/30",
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              แดชบอร์ด
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              ยินดีต้อนรับ, {user?.name}
            </p>
          </div>
          <Link href="/orders/new">
            <Button variant="primary" size="md">
              <Plus className="w-5 h-5 mr-2" />
              รับงานใหม่
            </Button>
          </Link>
        </div>

        {/* KPI Cards */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <SkeletonKPI key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {kpiCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <Card key={index} hover>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {card.title}
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        {card.value}
                      </p>
                      {card.unit && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {card.unit}
                        </p>
                      )}
                    </div>
                    <div className={`p-3 rounded-xl ${card.bgColor}`}>
                      <Icon className={`w-6 h-6 ${card.color}`} />
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>ออเดอร์ล่าสุด</CardTitle>
              <Link href="/orders">
                <Button variant="ghost" size="sm">
                  ดูทั้งหมด
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <SkeletonTable />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-slate-700">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                        รหัสออเดอร์
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                        ลูกค้า
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                        สถานะ
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                        ยอดเงิน
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                        เวลา
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr
                        key={order.id}
                        className="border-b border-gray-100 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors"
                      >
                        <td className="py-3 px-4">
                          <Link
                            href={`/orders/${order.id}`}
                            className="text-primary hover:underline font-medium"
                          >
                            {order.id}
                          </Link>
                        </td>
                        <td className="py-3 px-4 text-gray-900 dark:text-gray-100">
                          {order.customerName}
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant="status" status={order.status}>
                            {order.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-gray-900 dark:text-gray-100 font-medium">
                          {formatCurrency(order.totalPrice)}
                        </td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-400 text-sm">
                          {formatTime(order.createdAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
