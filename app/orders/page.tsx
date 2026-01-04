"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import MainLayout from "@/components/layout/MainLayout";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { SkeletonTable } from "@/components/ui/Skeleton";
import { mockOrders, Order, OrderStatus } from "@/lib/mockData";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import { Plus, Search, Filter } from "lucide-react";
import Link from "next/link";

export default function OrdersPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    setTimeout(() => {
      setOrders(mockOrders);
      setFilteredOrders(mockOrders);
      setLoading(false);
    }, 800);
  }, [isAuthenticated, router]);

  useEffect(() => {
    let filtered = orders;

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (order) =>
          order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.customerPhone.includes(searchQuery)
      );
    }

    setFilteredOrders(filtered);
  }, [orders, statusFilter, searchQuery]);

  if (!isAuthenticated) {
    return null;
  }

  const statuses: Array<OrderStatus | "all"> = [
    "all",
    "รับงาน",
    "กำลังดำเนินการ",
    "เสร็จแล้ว",
    "พร้อมรับ",
    "จัดส่งแล้ว",
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              จัดการออเดอร์
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              ทั้งหมด {filteredOrders.length} รายการ
            </p>
          </div>
          <Link href="/orders/new">
            <Button variant="primary" size="md">
              <Plus className="w-5 h-5 mr-2" />
              รับงานใหม่
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <Card>
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="ค้นหาด้วยรหัสออเดอร์, ชื่อลูกค้า, หรือเบอร์โทร..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>

            {/* Status Filter */}
            <div className="flex flex-wrap gap-2">
              {statuses.map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all ${
                    statusFilter === status
                      ? "bg-primary text-white shadow-md"
                      : "bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600"
                  }`}
                >
                  {status === "all" ? "ทั้งหมด" : status}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Orders Table */}
        <Card>
          {loading ? (
            <SkeletonTable />
          ) : filteredOrders.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">
                ไม่พบออเดอร์ที่ตรงกับเงื่อนไข
              </p>
            </div>
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
                      เบอร์โทร
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      ประเภท
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      สถานะ
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      ยอดเงิน
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      วันที่สร้าง
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      การกระทำ
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-gray-100 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                          {order.id}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-900 dark:text-gray-100">
                        {order.customerName}
                      </td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                        {order.customerPhone}
                      </td>
                      <td className="py-3 px-4">
                        <Badge>
                          {order.type === "walk-in"
                            ? "Walk-in"
                            : order.type === "pickup"
                            ? "รับ-ส่ง"
                            : "จัดส่ง"}
                        </Badge>
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
                        {formatDateTime(order.createdAt)}
                      </td>
                      <td className="py-3 px-4">
                        <Link href={`/orders/${order.id}`}>
                          <Button variant="ghost" size="sm">
                            ดูรายละเอียด
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </MainLayout>
  );
}
