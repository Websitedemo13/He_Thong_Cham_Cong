"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Download, TrendingUp, Users, Clock, Calendar, FileText, BarChart3 } from "lucide-react"

const attendanceData = [
  { month: "T1", present: 85, late: 10, absent: 5 },
  { month: "T2", present: 88, late: 8, absent: 4 },
  { month: "T3", present: 92, late: 6, absent: 2 },
  { month: "T4", present: 87, late: 9, absent: 4 },
  { month: "T5", present: 90, late: 7, absent: 3 },
  { month: "T6", present: 94, late: 4, absent: 2 },
]

const departmentData = [
  { name: "CNTT", value: 8, color: "#3b82f6" },
  { name: "HR", value: 5, color: "#10b981" },
  { name: "Sales", value: 12, color: "#8b5cf6" },
  { name: "Marketing", value: 6, color: "#f59e0b" },
]

const performanceData = [
  { name: "Quách Thành Long", score: 95, department: "CNTT" },
  { name: "Nguyễn Văn HR", score: 88, department: "HR" },
  { name: "Trần Thị Staff", score: 92, department: "Sales" },
  { name: "Lê Minh Tân", score: 87, department: "CNTT" },
  { name: "Phạm Thu Hà", score: 85, department: "Marketing" },
]

export default function ReportsPage() {
  const { user } = useAuth()

  if (!user || (user.role !== "admin" && user.role !== "hr")) {
    return (
      <div className="flex items-center justify-center h-96">
        <Card className="w-full max-w-md">
          <CardContent className="text-center p-6">
            <BarChart3 className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Không có quyền truy cập</h3>
            <p className="text-muted-foreground">Chức năng này chỉ dành cho Admin và HR</p>
          </CardContent>
        </Card>
      </div>
    )
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
          <h1 className="text-3xl font-bold">Báo cáo & Thống kê</h1>
          <p className="text-muted-foreground">
            {user.role === "admin" ? "Báo cáo KPI toàn công ty" : "Báo cáo nhân sự"}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2 bg-transparent">
            <FileText className="h-4 w-4" />
            Tạo báo cáo
          </Button>
          <Button className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Xuất PDF
          </Button>
        </div>
      </motion.div>

      {/* KPI Overview */}
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
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Tỷ lệ chấm công</p>
                <p className="text-3xl font-bold text-blue-700 dark:text-blue-300">94.2%</p>
                <p className="text-xs text-blue-600 dark:text-blue-400 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +2.1% so với tháng trước
                </p>
              </div>
              <Clock className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">Hiệu suất TB</p>
                <p className="text-3xl font-bold text-green-700 dark:text-green-300">89.4%</p>
                <p className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +1.5% so với tháng trước
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Tổng nhân viên</p>
                <p className="text-3xl font-bold text-purple-700 dark:text-purple-300">31</p>
                <p className="text-xs text-purple-600 dark:text-purple-400 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +3 người mới
                </p>
              </div>
              <Users className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Nghỉ phép</p>
                <p className="text-3xl font-bold text-orange-700 dark:text-orange-300">12</p>
                <p className="text-xs text-orange-600 dark:text-orange-400 flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Đơn trong tháng
                </p>
              </div>
              <Calendar className="h-8 w-8 text-orange-600 dark:text-orange-400" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Attendance Trend */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <Card>
            <CardHeader>
              <CardTitle>Xu hướng chấm công 6 tháng</CardTitle>
              <CardDescription>Thống kê tỷ lệ có mặt, đi trễ và vắng mặt</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="present" fill="#10b981" name="Có mặt" />
                  <Bar dataKey="late" fill="#f59e0b" name="Đi trễ" />
                  <Bar dataKey="absent" fill="#ef4444" name="Vắng mặt" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Department Distribution */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
          <Card>
            <CardHeader>
              <CardTitle>Phân bổ nhân viên theo phòng ban</CardTitle>
              <CardDescription>Số lượng nhân viên trong từng phòng ban</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={departmentData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {departmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Performance Chart */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <Card>
          <CardHeader>
            <CardTitle>Hiệu suất nhân viên xuất sắc</CardTitle>
            <CardDescription>Top 5 nhân viên có hiệu suất cao nhất tháng này</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis dataKey="name" type="category" width={120} />
                <Tooltip />
                <Bar dataKey="score" fill="#3b82f6" name="Điểm hiệu suất" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Summary Report */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <Card>
          <CardHeader>
            <CardTitle>Tóm tắt báo cáo tháng</CardTitle>
            <CardDescription>Những điểm nổi bật và khuyến nghị</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">✅ Điểm tích cực</h4>
                <ul className="text-sm text-green-700 dark:text-green-400 space-y-1">
                  <li>• Tỷ lệ chấm công tăng 2.1% so với tháng trước</li>
                  <li>• Phòng CNTT đạt hiệu suất cao nhất (95%)</li>
                  <li>• Giảm 30% số lần đi trễ</li>
                  <li>• Tăng 3 nhân viên mới</li>
                </ul>
              </div>

              <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                <h4 className="font-semibold text-orange-800 dark:text-orange-300 mb-2">⚠️ Cần cải thiện</h4>
                <ul className="text-sm text-orange-700 dark:text-orange-400 space-y-1">
                  <li>• Phòng Marketing cần tăng cường đào tạo</li>
                  <li>• Số đơn nghỉ phép tăng 15%</li>
                  <li>• Cần cải thiện quy trình onboarding</li>
                  <li>• Tăng cường hoạt động team building</li>
                </ul>
              </div>
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">📋 Khuyến nghị</h4>
              <p className="text-sm text-blue-700 dark:text-blue-400">
                Tiếp tục duy trì các chính sách hiện tại và tập trung vào việc cải thiện môi trường làm việc. Đề xuất tổ
                chức thêm các khóa đào tạo kỹ năng mềm và tăng cường giao tiếp nội bộ.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
