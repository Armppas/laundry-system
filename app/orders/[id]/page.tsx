"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import MainLayout from "@/components/layout/MainLayout";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { mockOrders, Order, OrderStatus } from "@/lib/mockData";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import { ArrowLeft, Phone, MapPin, Clock, CheckCircle2, QrCode } from "lucide-react";
import Link from "next/link";

export default function OrderDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { isAuthenticated } = useAuth();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    const orderId = params.id as string;
    setTimeout(() => {
      const foundOrder = mockOrders.find((o) => o.id === orderId);
      setOrder(foundOrder || null);
      setLoading(false);
    }, 500);
  }, [isAuthenticated, router, params.id]);

  if (!isAuthenticated || loading) {
    return null;
  }

  if (!order) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">ไม่พบออเดอร์</p>
          <Link href="/orders">
            <Button variant="primary" size="md" className="mt-4">
              กลับไปหน้ารายการ
            </Button>
          </Link>
        </div>
      </MainLayout>
    );
  }

  const statusFlow: OrderStatus[] = [
    "รับงาน",
    "กำลังดำเนินการ",
    "เสร็จแล้ว",
    "พร้อมรับ",
    "จัดส่งแล้ว",
  ];

  const currentStatusIndex = statusFlow.indexOf(order.status);

  const handleStatusUpdate = (newStatus: OrderStatus) => {
    setOrder({ ...order, status: newStatus, updatedAt: new Date().toISOString() });
    alert(`อัปเดตสถานะเป็น "${newStatus}" สำเร็จ`);
  };

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/orders">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              ออเดอร์ {order.id}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              สร้างเมื่อ {formatDateTime(order.createdAt)}
            </p>
          </div>
          <Badge variant="status" status={order.status}>
            {order.status}
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Status Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>สถานะงาน</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {statusFlow.map((status, index) => {
                    const isCompleted = index <= currentStatusIndex;
                    const isCurrent = index === currentStatusIndex;

                    return (
                      <div key={status} className="flex items-start gap-4">
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                              isCompleted
                                ? "bg-primary text-white"
                                : "bg-gray-200 dark:bg-slate-700 text-gray-400"
                            }`}
                          >
                            {isCompleted ? (
                              <CheckCircle2 className="w-5 h-5" />
                            ) : (
                              <Clock className="w-5 h-5" />
                            )}
                          </div>
                          {index < statusFlow.length - 1 && (
                            <div
                              className={`w-0.5 h-12 ${
                                isCompleted
                                  ? "bg-primary"
                                  : "bg-gray-200 dark:bg-slate-700"
                              }`}
                            />
                          )}
                        </div>
                        <div className="flex-1 pb-8">
                          <p
                            className={`font-semibold ${
                              isCurrent
                                ? "text-primary"
                                : isCompleted
                                ? "text-gray-900 dark:text-gray-100"
                                : "text-gray-400 dark:text-gray-600"
                            }`}
                          >
                            {status}
                          </p>
                          {isCurrent && (
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                              สถานะปัจจุบัน
                            </p>
                          )}
                        </div>
                        {isCurrent && index < statusFlow.length - 1 && (
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleStatusUpdate(statusFlow[index + 1])}
                          >
                            ดำเนินการต่อ
                          </Button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle>รายการบริการ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-3 bg-gray-50 dark:bg-slate-800/50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">
                          {item.service}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {item.quantity} x {formatCurrency(item.price)}
                        </p>
                      </div>
                      <p className="font-semibold text-gray-900 dark:text-gray-100">
                        {formatCurrency(item.quantity * item.price)}
                      </p>
                    </div>
                  ))}

                  <div className="flex justify-between items-center pt-3 border-t border-gray-200 dark:border-slate-700">
                    <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      ยอดรวมทั้งหมด
                    </span>
                    <span className="text-2xl font-bold text-primary">
                      {formatCurrency(order.totalPrice)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notes */}
            {order.notes && (
              <Card>
                <CardHeader>
                  <CardTitle>หมายเหตุ</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300">{order.notes}</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Customer Info */}
            <Card>
              <CardHeader>
                <CardTitle>ข้อมูลลูกค้า</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      ชื่อลูกค้า
                    </p>
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {order.customerName}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <Phone className="w-4 h-4" />
                    <span>{order.customerPhone}</span>
                  </div>
                  <div>
                    <Badge>
                      {order.type === "walk-in"
                        ? "Walk-in"
                        : order.type === "pickup"
                        ? "รับ-ส่ง"
                        : "จัดส่ง"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* QR Code */}
            <Card>
              <CardHeader>
                <CardTitle>QR Code รับ-ส่งงาน</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-slate-800/50 rounded-xl">
                  <div className="w-32 h-32 bg-white rounded-lg flex items-center justify-center mb-3">
                    <QrCode className="w-24 h-24 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                    สแกน QR Code เพื่อรับ-ส่งงาน
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>การกระทำ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="primary" size="md" className="w-full">
                    พิมพ์ใบเสร็จ
                  </Button>
                  <Button variant="secondary" size="md" className="w-full">
                    ส่ง SMS แจ้งลูกค้า
                  </Button>
                  <Button variant="danger" size="md" className="w-full">
                    ยกเลิกออเดอร์
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
