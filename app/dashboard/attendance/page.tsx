"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/contexts/auth-context"
import { useState } from "react"
import { Search, Filter, Download, Calendar, Clock, CheckCircle, XCircle, AlertCircle, Users } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const mockAttendanceData = [
  {
    id: "1",
    employee: {
      name: "Quách Thành Long",
      avatar: "/placeholder.svg?height=40&width=40",
      department: "Phòng CNNT",
    },
    date: "2025-01-03",
    checkIn: "08:30",
    checkOut: "17:30",
    workHours: 8.5,
    status: "present",
    location: "Văn phòng VSM",
    overtime: 0.5,
  },
  {
    id: "2",
    employee: {
      name: "Nguyễn Văn HR",
      avatar: "/placeholder.svg?height=40&width=40",
      department: "Phòng Nhân sự",
    },
    date: "2025-01-03",
    checkIn: "08:45",
    checkOut: "17:15",
    workHours: 8.0,
    status: "late",
    location: "Văn phòng VSM",
    overtime: 0,
  },
  {
    id: "3",
    employee: {
      name: "Trần Thị Staff",
      avatar: "/placeholder.svg?height=40&width=40",
      department: "Phòng Kinh doanh",
    },
    date: "2025-01-03",
    checkIn: null,
    checkOut: null,
    workHours: 0,
    status: "leave",
    location: "",
    overtime: 0,
  },
  {
    id: "4",
    employee: {
      name: "Lê Minh Tân",
      avatar: "/placeholder.svg?height=40&width=40",
      department: "Phòng CNNT",
    },
    date: "2025-01-03",
    checkIn: "08:15",
    checkOut: "18:00",
    workHours: 9.25,
    status: "present",
    location: "Văn phòng VSM",
    overtime: 1.25,
  },
  {
    id: "5",
    employee: {
      name: "Phạm Thu Hà",
      avatar: "/placeholder.svg?height=40&width=40",
      department: "Phòng Marketing",
    },
    date: "2025-01-03",
    checkIn: null,
    checkOut: null,
    workHours: 0,
    status: "absent",
    location: "",
    overtime: 0,
  },
]

export default function AttendancePage() {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDate, setSelectedDate] = useState("2025-01-03")
  const [selectedStatus, setSelectedStatus] = useState("all")

  if (!user || (user.role !== "admin" && user.role !== "hr")) {
    return (
      <div className="flex items-center justify-center h-96">
        <Card className="w-full max-w-md">
          <CardContent className="text-center p-6">
            <Clock className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Không có quyền truy cập</h3>
            <p className="text-muted-foreground">Chức năng này chỉ dành cho Admin và HR</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const filteredData = mockAttendanceData.filter((record) => {
    const matchesSearch = record.employee.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || record.status === selectedStatus
    return matchesSearch && matchesStatus
  })

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "present":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "late":
        return <AlertCircle className="h-4 w-4 text-orange-600" />
      case "absent":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "leave":
        return <Calendar className="h-4 w-4 text-blue-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const stats = {
    present: filteredData.filter((r) => r.status === "present").length,
    late: filteredData.filter((r) => r.status === "late").length,
    absent: filteredData.filter((r) => r.status === "absent").length,
    leave: filteredData.filter((r) => r.status === "leave").length,
    totalHours: filteredData.reduce((sum, r) => sum + r.workHours, 0),
    totalOvertime: filteredData.reduce((sum, r) => sum + r.overtime, 0),
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
          <h1 className="text-3xl font-bold">Bảng chấm công</h1>
          <p className="text-muted-foreground">
            {user.role === "admin" ? "Quản lý chấm công toàn bộ nhân viên" : "Quản lý chấm công nhân viên"}
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Xuất báo cáo
        </Button>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid gap-4 md:grid-cols-6"
      >
        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">Có mặt</p>
                <p className="text-2xl font-bold text-green-700 dark:text-green-300">{stats.present}</p>
              </div>
              <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Đi trễ</p>
                <p className="text-2xl font-bold text-orange-700 dark:text-orange-300">{stats.late}</p>
              </div>
              <AlertCircle className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-red-200 dark:border-red-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-600 dark:text-red-400">Vắng mặt</p>
                <p className="text-2xl font-bold text-red-700 dark:text-red-300">{stats.absent}</p>
              </div>
              <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Nghỉ phép</p>
                <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{stats.leave}</p>
              </div>
              <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Tổng giờ</p>
                <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">{stats.totalHours}h</p>
              </div>
              <Clock className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 border-indigo-200 dark:border-indigo-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">Tăng ca</p>
                <p className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">{stats.totalOvertime}h</p>
              </div>
              <Users className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Filters */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm kiếm nhân viên..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="present">Có mặt</SelectItem>
                  <SelectItem value="late">Đi trễ</SelectItem>
                  <SelectItem value="absent">Vắng mặt</SelectItem>
                  <SelectItem value="leave">Nghỉ phép</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                <Filter className="h-4 w-4" />
                Bộ lọc
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Attendance Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Card>
          <CardHeader>
            <CardTitle>Bảng chấm công ngày {selectedDate}</CardTitle>
            <CardDescription>Hiển thị {filteredData.length} bản ghi chấm công</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nhân viên</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Giờ vào</TableHead>
                    <TableHead>Giờ ra</TableHead>
                    <TableHead>Tổng giờ</TableHead>
                    <TableHead>Tăng ca</TableHead>
                    <TableHead>Vị trí</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((record, index) => (
                    <motion.tr
                      key={record.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="hover:bg-muted/50"
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={record.employee.avatar || "/placeholder.svg"}
                              alt={record.employee.name}
                            />
                            <AvatarFallback>
                              {record.employee.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{record.employee.name}</div>
                            <div className="text-sm text-muted-foreground">{record.employee.department}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(record.status)}
                          {getStatusBadge(record.status)}
                        </div>
                      </TableCell>
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
                        <span className="text-sm text-muted-foreground">{record.location || "Không xác định"}</span>
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
