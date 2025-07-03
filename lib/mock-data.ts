import type { UserRole } from "@/contexts/auth-context"

export interface AttendanceRecord {
  id: string
  userId: string
  userName: string
  date: string
  checkIn: string | null
  checkOut: string | null
  location: string
  status: "present" | "late" | "absent" | "leave"
  workHours: number
}

export interface LeaveRequest {
  id: string
  userId: string
  userName: string
  type: "sick" | "vacation" | "personal" | "emergency"
  startDate: string
  endDate: string
  reason: string
  status: "pending" | "approved" | "rejected"
  submittedAt: string
}

export interface ChatMessage {
  id: string
  senderId: string
  senderName: string
  receiverId: string
  message: string
  timestamp: string
  isRead: boolean
}

export interface Department {
  id: string
  name: string
  manager: string
  employeeCount: number
}

export const mockAttendanceData: AttendanceRecord[] = [
  {
    id: "1",
    userId: "1",
    userName: "Quách Thành Long",
    date: "2025-01-03",
    checkIn: "08:30",
    checkOut: "17:30",
    location: "Văn phòng VSM",
    status: "present",
    workHours: 8.5,
  },
  {
    id: "2",
    userId: "2",
    userName: "Nguyễn Văn HR",
    date: "2025-01-03",
    checkIn: "08:45",
    checkOut: "17:15",
    location: "Văn phòng VSM",
    status: "late",
    workHours: 8,
  },
  {
    id: "3",
    userId: "3",
    userName: "Trần Thị Staff",
    date: "2025-01-03",
    checkIn: null,
    checkOut: null,
    location: "",
    status: "leave",
    workHours: 0,
  },
]

export const mockLeaveRequests: LeaveRequest[] = [
  {
    id: "1",
    userId: "3",
    userName: "Trần Thị Staff",
    type: "sick",
    startDate: "2025-01-03",
    endDate: "2025-01-03",
    reason: "Bị cảm lạnh, cần nghỉ ngơi",
    status: "pending",
    submittedAt: "2025-01-02T10:30:00",
  },
  {
    id: "2",
    userId: "2",
    userName: "Nguyễn Văn HR",
    type: "vacation",
    startDate: "2025-01-10",
    endDate: "2025-01-12",
    reason: "Nghỉ lễ Tết Nguyên đán",
    status: "approved",
    submittedAt: "2025-01-01T14:20:00",
  },
]

export const mockChatMessages: ChatMessage[] = [
  {
    id: "1",
    senderId: "1",
    senderName: "Quách Thành Long",
    receiverId: "2",
    message: "Chào bạn! Hôm nay có meeting lúc 2h chiều nhé.",
    timestamp: "2025-01-03T09:30:00",
    isRead: true,
  },
  {
    id: "2",
    senderId: "2",
    senderName: "Nguyễn Văn HR",
    receiverId: "1",
    message: "OK anh, em sẽ chuẩn bị tài liệu.",
    timestamp: "2025-01-03T09:35:00",
    isRead: true,
  },
]

export const mockDepartments: Department[] = [
  {
    id: "1",
    name: "Phòng CNNT",
    manager: "Quách Thành Long",
    employeeCount: 5,
  },
  {
    id: "2",
    name: "Phòng Nhân sự",
    manager: "Nguyễn Văn HR",
    employeeCount: 3,
  },
  {
    id: "3",
    name: "Phòng Kinh doanh",
    manager: "Trần Văn Manager",
    employeeCount: 8,
  },
]

export const getKPIData = (role: UserRole) => {
  if (role === "admin") {
    return {
      totalEmployees: 16,
      presentToday: 14,
      lateToday: 2,
      onLeave: 1,
      monthlyAttendance: 95.5,
      departments: mockDepartments.length,
    }
  } else if (role === "hr") {
    return {
      managedEmployees: 8,
      pendingLeaves: 3,
      approvedLeaves: 12,
      attendanceRate: 92.3,
    }
  } else {
    return {
      workDaysThisMonth: 22,
      presentDays: 20,
      lateDays: 1,
      leaveDays: 1,
      workHours: 176,
      overtimeHours: 8,
    }
  }
}
