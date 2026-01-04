"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import MainLayout from "@/components/layout/MainLayout";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import { CreditCard, Banknote, Smartphone, Download } from "lucide-react";

export default function PaymentsPage() {
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

  const mockPayments = [
    {
      id: "PAY001",
      orderId: "ORD001",
      customerName: "คุณสมชาย ใจดี",
      amount: 290,
      method: "เงินสด",
      status: "สำเร็จ",
      date: "2025-01-04T10:30:00",
    },
    {
      id: "PAY002",
      orderId: "ORD002",
      customerName: "คุณสมหญิง รักษ์ดี",
      amount: 300,
      method: "โอนเงิน",
      status: "สำเร็จ",
      date: "2025-01-03T15:20:00",
    },
    {
      id: "PAY003",
      orderId: "ORD003",
      customerName: "คุณประยุทธ มั่นคง",
      amount: 760,
      method: "บัตรเครดิต",
      status: "สำเร็จ",
      date: "2025-01-02T11:45:00",
    },
  ];

  const totalRevenue = mockPayments.reduce((sum, p) => sum + p.amount, 0);

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            ชำระเงิน
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            จัดการการชำระเงินและใบเสร็จ
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  รายได้รวม
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {formatCurrency(totalRevenue)}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-green-100 dark:bg-green-900/30">
                <Banknote className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  ธุรกรรมทั้งหมด
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {mockPayments.length}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30">
                <CreditCard className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  ค่าเฉลี่ยต่อธุรกรรม
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {formatCurrency(totalRevenue / mockPayments.length)}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-900/30">
                <Smartphone className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </Card>
        </div>

        {/* Payments Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>รายการชำระเงิน</CardTitle>
              <Button variant="secondary" size="sm">
                <Download className="w-4 h-4 mr-2" />
                ส่งออก CSV
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-slate-700">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      รหัสการชำระเงิน
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      รหัสออเดอร์
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      ลูกค้า
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      วิธีการชำระเงิน
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      จำนวนเงิน
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      สถานะ
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      วันที่
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      การกระทำ
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mockPayments.map((payment) => (
                    <tr
                      key={payment.id}
                      className="border-b border-gray-100 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                          {payment.id}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-primary hover:underline cursor-pointer">
                          {payment.orderId}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-900 dark:text-gray-100">
                        {payment.customerName}
                      </td>
                      <td className="py-3 px-4">
                        <Badge>{payment.method}</Badge>
                      </td>
                      <td className="py-3 px-4 text-gray-900 dark:text-gray-100 font-medium">
                        {formatCurrency(payment.amount)}
                      </td>
                      <td className="py-3 px-4">
                        <Badge
                          className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800"
                        >
                          {payment.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-400 text-sm">
                        {formatDateTime(payment.date)}
                      </td>
                      <td className="py-3 px-4">
                        <Button variant="ghost" size="sm">
                          พิมพ์ใบเสร็จ
                        </Button>
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
