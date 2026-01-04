export interface Service {
  id: string;
  name: string;
  price: number;
  unit: string;
}

export interface OrderItem {
  service: string;
  quantity: number;
  price: number;
}

export type OrderStatus =
  | "รับงาน"
  | "กำลังดำเนินการ"
  | "เสร็จแล้ว"
  | "พร้อมรับ"
  | "จัดส่งแล้ว";

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  items: OrderItem[];
  status: OrderStatus;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  notes: string;
  type: "walk-in" | "pickup" | "delivery";
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  totalOrders: number;
  totalSpent: number;
  memberSince: string;
}

export const mockServices: Service[] = [
  { id: "1", name: "ซักผ้าธรรมดา", price: 40, unit: "กก." },
  { id: "2", name: "ซักผ้านวม", price: 150, unit: "ชิ้น" },
  { id: "3", name: "ซักผ้าม่าน", price: 200, unit: "ชิ้น" },
  { id: "4", name: "ซักพรม", price: 250, unit: "ตร.ม." },
  { id: "5", name: "รีดผ้า", price: 30, unit: "กก." },
  { id: "6", name: "ซักแห้ง", price: 80, unit: "กก." },
];

export const mockCustomers: Customer[] = [
  {
    id: "1",
    name: "คุณสมชาย ใจดี",
    phone: "0812345678",
    email: "somchai@email.com",
    address: "123 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110",
    totalOrders: 15,
    totalSpent: 4500,
    memberSince: "2024-01-15",
  },
  {
    id: "2",
    name: "คุณสมหญิง รักษ์ดี",
    phone: "0823456789",
    email: "somying@email.com",
    address: "456 ถนนพระราม 4 แขวงปทุมวัน เขตปทุมวัน กรุงเทพฯ 10330",
    totalOrders: 8,
    totalSpent: 2800,
    memberSince: "2024-03-20",
  },
  {
    id: "3",
    name: "คุณประยุทธ มั่นคง",
    phone: "0834567890",
    email: "prayut@email.com",
    address: "789 ถนนลาดพร้าว แขวงจอมพล เขตจตุจักร กรุงเทพฯ 10900",
    totalOrders: 22,
    totalSpent: 7200,
    memberSince: "2023-11-10",
  },
];

export const mockOrders: Order[] = [
  {
    id: "ORD001",
    customerId: "1",
    customerName: "คุณสมชาย ใจดี",
    customerPhone: "0812345678",
    items: [
      { service: "ซักผ้าธรรมดา", quantity: 5, price: 200 },
      { service: "รีดผ้า", quantity: 3, price: 90 },
    ],
    status: "รับงาน",
    totalPrice: 290,
    createdAt: "2025-01-04T08:30:00",
    updatedAt: "2025-01-04T08:30:00",
    notes: "แยกผ้าสีออกจากผ้าขาว",
    type: "walk-in",
  },
  {
    id: "ORD002",
    customerId: "2",
    customerName: "คุณสมหญิง รักษ์ดี",
    customerPhone: "0823456789",
    items: [
      { service: "ซักผ้านวม", quantity: 2, price: 300 },
    ],
    status: "กำลังดำเนินการ",
    totalPrice: 300,
    createdAt: "2025-01-03T14:20:00",
    updatedAt: "2025-01-04T09:00:00",
    notes: "",
    type: "pickup",
  },
  {
    id: "ORD003",
    customerId: "3",
    customerName: "คุณประยุทธ มั่นคง",
    customerPhone: "0834567890",
    items: [
      { service: "ซักผ้าธรรมดา", quantity: 8, price: 320 },
      { service: "รีดผ้า", quantity: 8, price: 240 },
      { service: "ซักผ้าม่าน", quantity: 1, price: 200 },
    ],
    status: "เสร็จแล้ว",
    totalPrice: 760,
    createdAt: "2025-01-02T10:15:00",
    updatedAt: "2025-01-03T16:30:00",
    notes: "ลูกค้า VIP",
    type: "delivery",
  },
  {
    id: "ORD004",
    customerId: "1",
    customerName: "คุณสมชาย ใจดี",
    customerPhone: "0812345678",
    items: [
      { service: "ซักแห้ง", quantity: 2, price: 160 },
    ],
    status: "พร้อมรับ",
    totalPrice: 160,
    createdAt: "2025-01-01T11:00:00",
    updatedAt: "2025-01-02T15:00:00",
    notes: "",
    type: "walk-in",
  },
  {
    id: "ORD005",
    customerId: "2",
    customerName: "คุณสมหญิง รักษ์ดี",
    customerPhone: "0823456789",
    items: [
      { service: "ซักพรม", quantity: 3, price: 750 },
    ],
    status: "จัดส่งแล้ว",
    totalPrice: 750,
    createdAt: "2024-12-30T09:30:00",
    updatedAt: "2025-01-01T14:00:00",
    notes: "พรมห้องนั่งเล่น",
    type: "delivery",
  },
];

// Helper functions
export function getOrdersByStatus(status: OrderStatus): Order[] {
  return mockOrders.filter((order) => order.status === status);
}

export function getOrdersByCustomer(customerId: string): Order[] {
  return mockOrders.filter((order) => order.customerId === customerId);
}

export function getTodayOrders(): Order[] {
  const today = new Date().toISOString().split("T")[0];
  return mockOrders.filter((order) =>
    order.createdAt.startsWith(today)
  );
}

export function getTodayRevenue(): number {
  return getTodayOrders().reduce((sum, order) => sum + order.totalPrice, 0);
}

export function getPendingOrders(): Order[] {
  return mockOrders.filter(
    (order) =>
      order.status === "รับงาน" || order.status === "กำลังดำเนินการ"
  );
}

export function getReadyOrders(): Order[] {
  return mockOrders.filter((order) => order.status === "พร้อมรับ");
}
