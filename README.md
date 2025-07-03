# 🕒 HỆ THỐNG CHẤM CÔNG VSM – TIMEKEEPING SYSTEM

> Giao diện frontend mô phỏng hệ thống chấm công nội bộ dành cho doanh nghiệp. Thiết kế đẹp, mượt, hiện đại, hỗ trợ 3 vai trò với phân quyền rõ ràng: **Admin**, **HR**, **Staff**.

> Phát triển bởi **Quách Thành Long** cùng đội IT **The Next Generation**, thuộc tổ chức **VSM** – Vietnam Student Marathon ([vsm.org.vn](https://vsm.org.vn)).

---

## 🚀 Giới thiệu

**VSM Timekeeping System** là hệ thống chấm công frontend-only mô phỏng quy trình quản lý nhân sự thực tế, bao gồm các chức năng:

- Chấm công theo thời gian + vị trí thực tế (Google Maps)
- Gửi đơn nghỉ phép – phê duyệt – lịch chung
- Dashboard phân quyền – báo cáo KPI trực quan
- Quản lý tài khoản, phân quyền động
- Hệ thống nhắn tin nội bộ như Messenger
- Giao diện hiện đại, hỗ trợ Dark Mode, Responsive 100%

---

## 🧑‍💼 Tài khoản thử nghiệm

| Vai trò   | Email                | Mật khẩu  |
|-----------|----------------------|-----------|
| Admin     | admin@vsm.org.vn     | long123   |
| HR        | hr@vsm.org.vn        | long123   |
| Staff     | staff@vsm.org.vn     | long123   |

---

## 🧩 Tính năng theo vai trò

### 🔴 Admin
- Quản lý nhân viên (Thêm/Sửa/Xoá)
- Quản lý phòng ban
- Bảng công toàn bộ nhân viên
- Báo cáo KPI toàn công ty
- Phân quyền – bật/tắt tính năng từng role
- Gửi tin nhắn nội bộ
- Xem lịch chung toàn hệ thống

### 🟠 HR
- Điều chỉnh bảng công thủ công
- Phê duyệt nghỉ phép
- Quản lý hồ sơ nhân sự
- Xem KPI từng người
- Gửi thông báo / tin nhắn
- Xem lịch chung

### 🟢 Staff
- Chấm công (Check-in/out + định vị)
- Gửi đơn nghỉ phép
- Xem bảng công & lịch cá nhân
- Chat nội bộ
- Chỉnh sửa hồ sơ cá nhân

---

## 📊 Dashboard

- Hiển thị biểu đồ hiệu suất làm việc
- Bảng công tháng: đúng giờ, trễ, nghỉ
- Tương tác trực tiếp trên bảng công
- Xuất `.csv` hoặc `.pdf` có logo doanh nghiệp

---

## 📆 Lịch làm việc

- Giao diện FullCalendar
- Phân biệt màu sắc theo trạng thái:
  - 🟢 Làm việc
  - 🟡 Trễ
  - 🔴 Nghỉ
- Lịch **chung** cho Admin, HR
- Lịch **cá nhân** cho Staff

---

## 💬 Chat nội bộ

- Giao diện floating như Facebook Messenger
- Hỗ trợ chat 1-1
- Phân quyền: Admin/HR có thể nhắn cho bất kỳ ai

---

## 🧑‍🎨 Giao diện người dùng

- Chủ đề màu: `#0077b6` (xanh biển) + `#030712` (đen sang trọng)
- Font: `Inter`, `Plus Jakarta Sans`
- Hỗ trợ Dark Mode toàn hệ thống
- Thiết kế chuẩn SaaS: `rounded-xl`, `shadow`, `transition`

---

## ⚙️ Công nghệ sử dụng

- `Next.js 14+` (App Router)
- `Tailwind CSS`
- `Shadcn/UI`
- `Framer Motion`
- `Recharts` / `ApexCharts`
- `Google Maps API` (vị trí)
- `LocalStorage` (lưu trạng thái UI)
- **Frontend-only** (mock bằng `useState`, `useEffect`)

---

## 🧑‍💻 Cài đặt & khởi chạy

```bash
git clone https://github.com/StephenSouth13/He_Thong_Cham_Cong.git
cd vsm-attendance-system 
npm install
npm run dev
Truy cập tại: http://localhost:3000

📦 Dữ liệu mẫu
ts
Sao chép
Chỉnh sửa
{
  name: "Quách Thành Long",
  dob: "13/07/2003",
  email: "longqt@vsm.org.vn",
  role: "admin" | "hr" | "staff",
  position: "Frontend Developer",
  department: "Phòng CNNT",
  avatar: "/avatar-long.jpg"
}
🧠 Đội phát triển
The Next Generation là đội công nghệ trực thuộc tổ chức VSM – Vietnam Student Marathon, chuyên phát triển các hệ thống hỗ trợ chuyển đổi số cho sinh viên, doanh nghiệp vừa và nhỏ.

Dự án do Quách Thành Long – @StephenSouth13 – chủ nhiệm và triển khai chính.

📄 Giấy phép
MIT License – Tự do sử dụng, chỉnh sửa, thương mại hoá hoặc triển khai cho doanh nghiệp, tổ chức.

🔚 Footer hệ thống
python
Sao chép
Chỉnh sửa
@2025 VSM | Được phát triển bởi team The Next Generation (Phòng CNNT)
🧪 Bản demo chứa đầy đủ 3 role và sẵn sàng mở rộng về backend. Hệ thống có thể nâng cấp lên sản phẩm thật với chi phí vận hành thấp và quy trình chuẩn hoá
