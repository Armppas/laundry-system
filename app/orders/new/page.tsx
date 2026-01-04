"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import MainLayout from "@/components/layout/MainLayout";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { mockServices, mockCustomers } from "@/lib/mockData";
import { formatCurrency } from "@/lib/utils";
import { Plus, Trash2, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface OrderItem {
  serviceId: string;
  serviceName: string;
  quantity: number;
  price: number;
}

export default function NewOrderPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // Form state
  const [customerId, setCustomerId] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [orderType, setOrderType] = useState<"walk-in" | "pickup" | "delivery">(
    "walk-in"
  );
  const [items, setItems] = useState<OrderItem[]>([]);
  const [notes, setNotes] = useState("");

  if (!isAuthenticated) {
    router.push("/login");
    return null;
  }

  const handleCustomerSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setCustomerId(id);
    if (id) {
      const customer = mockCustomers.find((c) => c.id === id);
      if (customer) {
        setCustomerName(customer.name);
        setCustomerPhone(customer.phone);
      }
    } else {
      setCustomerName("");
      setCustomerPhone("");
    }
  };

  const addItem = () => {
    setItems([
      ...items,
      {
        serviceId: "",
        serviceName: "",
        quantity: 1,
        price: 0,
      },
    ]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (
    index: number,
    field: keyof OrderItem,
    value: string | number
  ) => {
    const newItems = [...items];
    if (field === "serviceId") {
      const service = mockServices.find((s) => s.id === value);
      if (service) {
        newItems[index] = {
          ...newItems[index],
          serviceId: service.id,
          serviceName: service.name,
          price: service.price,
        };
      }
    } else {
      newItems[index] = { ...newItems[index], [field]: value };
    }
    setItems(newItems);
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert("สร้างออเดอร์สำเร็จ!");
      router.push("/orders");
    }, 1000);
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/orders">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              รับงานใหม่
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              กรอกข้อมูลออเดอร์ใหม่
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Customer Info */}
          <Card>
            <CardHeader>
              <CardTitle>ข้อมูลลูกค้า</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    เลือกลูกค้า (ถ้ามี)
                  </label>
                  <select
                    value={customerId}
                    onChange={handleCustomerSelect}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">-- ลูกค้าใหม่ --</option>
                    {mockCustomers.map((customer) => (
                      <option key={customer.id} value={customer.id}>
                        {customer.name} ({customer.phone})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      ชื่อลูกค้า *
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="ชื่อลูกค้า"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      เบอร์โทรศัพท์ *
                    </label>
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="0812345678"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    ประเภทบริการ *
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: "walk-in", label: "Walk-in" },
                      { value: "pickup", label: "รับ-ส่ง" },
                      { value: "delivery", label: "จัดส่ง" },
                    ].map((type) => (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() =>
                          setOrderType(type.value as typeof orderType)
                        }
                        className={`px-4 py-3 rounded-xl font-medium transition-all ${
                          orderType === type.value
                            ? "bg-primary text-white shadow-md"
                            : "bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600"
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>รายการบริการ</CardTitle>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={addItem}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  เพิ่มรายการ
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {items.length === 0 ? (
                  <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                    ยังไม่มีรายการบริการ กดปุ่ม "เพิ่มรายการ" เพื่อเริ่มต้น
                  </p>
                ) : (
                  items.map((item, index) => (
                    <div
                      key={index}
                      className="flex gap-3 p-4 bg-gray-50 dark:bg-slate-800/50 rounded-xl"
                    >
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                        <select
                          value={item.serviceId}
                          onChange={(e) =>
                            updateItem(index, "serviceId", e.target.value)
                          }
                          required
                          className="px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                          <option value="">-- เลือกบริการ --</option>
                          {mockServices.map((service) => (
                            <option key={service.id} value={service.id}>
                              {service.name} ({formatCurrency(service.price)}/
                              {service.unit})
                            </option>
                          ))}
                        </select>

                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            updateItem(
                              index,
                              "quantity",
                              parseInt(e.target.value) || 1
                            )
                          }
                          placeholder="จำนวน"
                          required
                          className="px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                        />

                        <div className="flex items-center px-3 py-2 bg-gray-100 dark:bg-slate-700 rounded-lg">
                          <span className="text-gray-900 dark:text-gray-100 font-medium">
                            {formatCurrency(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(index)}
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))
                )}

                {items.length > 0 && (
                  <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-slate-700">
                    <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      ยอดรวม
                    </span>
                    <span className="text-2xl font-bold text-primary">
                      {formatCurrency(calculateTotal())}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          <Card>
            <CardHeader>
              <CardTitle>หมายเหตุเพิ่มเติม</CardTitle>
            </CardHeader>
            <CardContent>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="หมายเหตุเพิ่มเติม (ถ้ามี)"
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              />
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex gap-3">
            <Link href="/orders" className="flex-1">
              <Button variant="secondary" size="lg" className="w-full">
                ยกเลิก
              </Button>
            </Link>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isLoading}
              disabled={items.length === 0}
              className="flex-1"
            >
              สร้างออเดอร์
            </Button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}
