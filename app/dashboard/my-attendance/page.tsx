"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import { useState } from "react"
import { Calendar, Clock, CheckCircle, AlertCircle, Download, TrendingUp } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const mockPersonalAttendance = [
  {
    id: "1",
    date: "2025-01-03",
    checkIn: "08:30",
    checkOut: "17:30",
    workHours: 8.5,
    status: "present",
    location: "Văn phòng VSM",
    overtime: 0.5,
    note: "",
  },
  {
    id: "2",
    date: "2025-01-02",
    checkIn: "08:45",
    checkOut: "17:15",
    workHours: 8.0,
    status: "late",
    location: "Văn phòng VSM",
    overtime: 0,
    note: "Đi trễ do kẹt xe",
  },
  {
    id: "3",
    date: "2025-01-01",
    checkIn: null,
    checkOut: null,
    workHours: 0,
    status: "leave",
    location: "",
    overtime: 0,
    note: "Nghỉ lễ Tết",
  },
]

export default function MyAttendancePage() {
  const { user } = useAuth()
  const [selectedMonth, setSelectedMonth] = useState("2025-01")

  if (!user || user.role !== "staff") {
    return (
      <div className="flex items-center justify-center h-96">
        <Card className="w-full max-w-md">
          <CardContent className="text-center p-6">
            <Clock className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Không có quyền truy cập</h3>
            <p className="text-muted-foreground">Chức năng này chỉ dành cho nhân viên</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "present":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Có mặt</Badge>
      case "late":
        return <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300">Đi trễ</Badge>
      case "absent":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">Vắng mặt</Badge>
      case "leave":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">Nghỉ phép</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const stats = {
    totalDays: 22,
    presentDays: 20,
    lateDays: 1,
    leaveDays: 1,
    totalHours: 168.5,
    overtimeHours: 8.5,
    attendanceRate: 95.5,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold">Bảng công cá nhân</h1>
          <p className="text-muted-foreground">Theo dõi chấm công và thời gian làm việc của bạn</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2025-01">Tháng 1/2025</SelectItem>
              <SelectItem value="2024-12">Tháng 12/2024</SelectItem>
              <SelectItem value="2024-11">Tháng 11/2024</SelectItem>
            </SelectContent>
          </Select>
          <Button className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Xuất báo cáo
          </Button>
        </div>
      </motion.div>

      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid gap-4 md:grid-cols-4"
      >
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Ngày công</p>
                <p className="text-3xl font-bold text-blue-700 dark:text-blue-300">
                  {stats.presentDays}/{stats.totalDays}
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-400 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  {stats.attendanceRate}% tỷ lệ
                </p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">Tổng giờ</p>
                <p className="text-3xl font-bold text-green-700 dark:text-green-300">{stats.totalHours}h</p>
                <p className="text-xs text-green-600 dark:text-green-400">Trong tháng</p>
              </div>
              <Clock className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Đi trễ</p>
                <p className="text-3xl font-bold text-orange-700 dark:text-orange-300">{stats.lateDays}</p>
                <p className="text-xs text-orange-600 dark:text-orange-400">Lần trong tháng</p>
              </div>
              <AlertCircle className="h-8 w-8 text-orange-600 dark:text-orange-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Tăng ca</p>
                <p className="text-3xl font-bold text-purple-700 dark:text-purple-300">{stats.overtimeHours}h</p>
                <p className="text-xs text-purple-600 dark:text-purple-400">Trong tháng</p>
              </div>
              <CheckCircle className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Attendance Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card>
          <CardHeader>
            <CardTitle>Chi tiết chấm công tháng {selectedMonth}</CardTitle>
            <CardDescription>Lịch sử chấm công chi tiết của bạn</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ngày</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Giờ vào</TableHead>
                    <TableHead>Giờ ra</TableHead>
                    <TableHead>Tổng giờ</TableHead>
                    <TableHead>Tăng ca</TableHead>
                    <TableHead>Ghi chú</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockPersonalAttendance.map((record, index) => (
                    <motion.tr
                      key={record.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="hover:bg-muted/50"
                    >
                      <TableCell>
                        <div className="font-medium">{record.date}</div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(record.date).toLocaleDateString("vi-VN", { weekday: "short" })}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(record.status)}</TableCell>
                      <TableCell>
                        <span className={record.checkIn ? "font-medium" : "text-muted-foreground"}>
                          {record.checkIn || "--:--"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={record.checkOut ? "font-medium" : "text-muted-foreground"}>
                          {record.checkOut || "--:--"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">{record.workHours}h</span>
                      </TableCell>
                      <TableCell>
                        {record.overtime > 0 ? (
                          <Badge variant="outline" className="text-purple-600">
                            +{record.overtime}h
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground">--</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">{record.note || "--"}</span>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
