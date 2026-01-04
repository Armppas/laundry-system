# ระบบจัดการร้านซักอบรีด

ระบบจัดการร้านซักอบรีดแบบครบวงจร พัฒนาด้วย Next.js, React และ Tailwind CSS

## 🚀 คุณสมบัติ

### ✨ UI/UX
- **Responsive Design** - รองรับทั้ง Desktop, Tablet และ Mobile
- **Dark Mode** - รองรับโหมดสว่างและโหมดมืด พร้อม auto-detect ตาม system preference
- **Modern Design** - Card-based UI, Soft shadows, Border radius 12px
- **Thai-first** - ใช้ฟอนต์ Noto Sans Thai รองรับภาษาไทยเป็นหลัก
- **Smooth Animations** - Transitions และ animations ที่ลื่นไหล

### 🎨 Brand & Colors
- **Primary Color**: #6ca6d4 (Blue)
- **Accent Color**: #fed73a (Yellow)
- **Design Language**: ทันสมัย เรียบ สะอาด เป็นมิตร และดูเป็นมืออาชีพ

### 👥 User Roles
- **Admin** - ผู้ดูแลระบบ (เข้าถึงได้ทุกฟีเจอร์)
- **Staff** - พนักงาน (จัดการออเดอร์และลูกค้า)
- **Customer** - ลูกค้า (ดูประวัติและสถานะออเดอร์)

### 📱 หน้าหลัก

#### 1. Login Page
- เข้าสู่ระบบด้วยอีเมล, รหัสผ่าน และเลือกบทบาท
- Theme toggle
- Mock authentication (ใช้อีเมลและรหัสผ่านใดก็ได้)

#### 2. Dashboard
- **KPI Cards**: งานวันนี้, รายได้วันนี้, งานค้าง, ลูกค้ารอรับ
- ตารางออเดอร์ล่าสุด
- Quick actions

#### 3. Orders Management
- รายการออเดอร์ทั้งหมด
- Filter ตามสถานะ (รับงาน, กำลังดำเนินการ, เสร็จแล้ว, พร้อมรับ, จัดส่งแล้ว)
- Search ด้วยรหัสออเดอร์, ชื่อลูกค้า, เบอร์โทร
- สร้างออเดอร์ใหม่ (Form สำหรับ Walk-in, Pickup, Delivery)
- รายละเอียดออเดอร์พร้อม Status Timeline

#### 4. Customers
- รายการลูกค้าทั้งหมด
- ข้อมูลลูกค้า (ชื่อ, เบอร์โทร, อีเมล, ที่อยู่)
- สถิติ (จำนวนออเดอร์, ยอดใช้จ่ายรวม)
- Search

#### 5. Payments
- รายการชำระเงินทั้งหมด
- สรุปรายได้
- วิธีการชำระเงิน (เงินสด, โอนเงิน, บัตรเครดิต)
- พิมพ์ใบเสร็จ

#### 6. Reports
- KPI Cards (รายได้รวม, ออเดอร์ทั้งหมด, ค่าเฉลี่ยต่อออเดอร์, อัตราความสำเร็จ)
- Chart Placeholders (รายได้รายเดือน, จำนวนออเดอร์รายเดือน)
- บริการยอดนิยม
- ส่งออกรายงาน

#### 7. Settings
- โปรไฟล์ผู้ใช้
- Theme toggle (Light/Dark)
- การแจ้งเตือน
- ความปลอดภัย
- ข้อมูลระบบ

### 🧩 Components

#### Layout Components
- **Navbar** - Logo, User info, Theme toggle, Logout
- **Sidebar** - Desktop navigation menu
- **BottomNav** - Mobile navigation menu
- **MainLayout** - Wrapper layout

#### UI Components
- **Button** - Variants: Primary, Secondary, Danger, Ghost
- **Card** - Card-based container
- **Badge** - Status badges with colors
- **Skeleton** - Loading state placeholders

### 🎯 Features

#### Order Status Flow
1. รับงาน (Received)
2. กำลังดำเนินการ (In Progress)
3. เสร็จแล้ว (Completed)
4. พร้อมรับ (Ready for Pickup)
5. จัดส่งแล้ว (Delivered)

#### Services
- ซักผ้าธรรมดา (40 บาท/กก.)
- ซักผ้านวม (150 บาท/ชิ้น)
- ซักผ้าม่าน (200 บาท/ชิ้น)
- ซักพรม (250 บาท/ตร.ม.)
- รีดผ้า (30 บาท/กก.)
- ซักแห้ง (80 บาท/กก.)

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript
- **Icons**: Lucide React
- **State Management**: React Context + localStorage
- **Font**: Noto Sans Thai

## 📦 Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## 🌐 Development

เซิร์ฟเวอร์จะรันที่ [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
laundry-system/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home (redirect)
│   ├── login/
│   │   └── page.tsx            # Login page
│   ├── dashboard/
│   │   └── page.tsx            # Dashboard
│   ├── orders/
│   │   ├── page.tsx            # Orders list
│   │   ├── new/page.tsx        # New order form
│   │   └── [id]/page.tsx       # Order detail
│   ├── customers/
│   │   └── page.tsx            # Customers list
│   ├── payments/
│   │   └── page.tsx            # Payments
│   ├── reports/
│   │   └── page.tsx            # Reports
│   └── settings/
│       └── page.tsx            # Settings
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Sidebar.tsx
│   │   ├── BottomNav.tsx
│   │   └── MainLayout.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Badge.tsx
│       └── Skeleton.tsx
├── contexts/
│   ├── AuthContext.tsx         # Authentication
│   └── ThemeContext.tsx        # Theme management
├── lib/
│   ├── mockData.ts             # Mock data
│   └── utils.ts                # Utility functions
└── styles/
    └── globals.css             # Global styles
```

## 🎨 Design System

### Colors

#### Light Mode
- Background: #ffffff
- Card: #f9fafb (gray-50)
- Border: #e5e7eb (gray-200)
- Text: #111827 (gray-900)

#### Dark Mode
- Background: #0f172a (slate-900)
- Card: #1e293b (slate-800)
- Border: #334155 (slate-700)
- Text: #f1f5f9 (slate-100)

### Typography
- Font Family: Noto Sans Thai
- Headings: Semi-bold / Bold
- Body: Regular

### Spacing
- Border Radius: 12px
- Card Padding: 16px-24px
- Spacious Layout

### Shadows
- Soft: 0 2px 8px rgba(0, 0, 0, 0.08)
- Soft-lg: 0 4px 16px rgba(0, 0, 0, 0.12)

## 📝 Mock Data

ระบบใช้ mock data จาก `lib/mockData.ts` ไม่มีการเชื่อมต่อ backend จริง

- **Users**: Admin, Staff, Customer
- **Orders**: 5 ออเดอร์ตัวอย่าง
- **Customers**: 3 ลูกค้าตัวอย่าง
- **Services**: 6 บริการ

## 🔐 Authentication

ใช้ mock authentication ผ่าน Context API และ localStorage

**วิธีการ Login:**
- ใช้อีเมลและรหัสผ่านใดก็ได้
- เลือกบทบาท (Admin, Staff, Customer)
- ระบบจะสร้าง mock user และเก็บใน localStorage

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Deploy to Vercel
vercel
```

### Build & Export
```bash
# Build
pnpm build

# Start production server
pnpm start
```

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎯 Future Enhancements

- [ ] เชื่อมต่อ Backend API จริง
- [ ] QR Code Scanner สำหรับรับ-ส่งงาน
- [ ] Real-time Notifications
- [ ] Charts & Analytics (Chart.js / Recharts)
- [ ] Export PDF/CSV
- [ ] SMS/Email Notifications
- [ ] Payment Gateway Integration
- [ ] Multi-language Support
- [ ] PWA Support
- [ ] Offline Mode

## 📄 License

MIT License

## 👨‍💻 Developer

สร้างโดย Manus AI - ระบบจัดการร้านซักอบรีดแบบครบวงจร

---

**Version**: 1.0.0  
**Last Updated**: 4 มกราคม 2568
