"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/contexts/auth-context"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { TrendingUp, Clock, Award, Target, CheckCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"

const monthlyData = [
  { month: "T7", hours: 176, overtime: 8, attendance: 95 },
  { month: "T8", hours: 168, overtime: 12, attendance: 92 },
  { month: "T9", hours: 184, overtime: 16, attendance: 98 },
  { month: "T10", hours: 172, overtime: 6, attendance: 89 },
  { month: "T11", hours: 180, overtime: 14, attendance: 96 },
  { month: "T12", hours: 176, overtime: 10, attendance: 94 },
]

const performanceData = [
  { name: "Chấm công đúng giờ", value: 85, color: "#10b981" },
  { name: "Hoàn thành công việc", value: 92, color: "#3b82f6" },
  { name: "Tương tác team", value: 88, color: "#8b5cf6" },
  { name: "Sáng tạo", value: 78, color: "#f59e0b" },
]

const weeklyAttendance = [
  { day: "T2", checkIn: "08:30", checkOut: "17:30", hours: 8.5 },
  { day: "T3", checkIn: "08:25", checkOut: "17:45", hours: 8.8 },
  { day: "T4", checkIn: "08:35", checkOut: "17:25", hours: 8.3 },
  { day: "T5", checkIn: "08:20", checkOut: "18:00", hours: 9.2 },
  { day: "T6", checkIn: "08:40", checkOut: "17:20", hours: 8.2 },
]

export default function MyStatsPage() {
  const { user } = useAuth()

  if (!user || user.role !== "staff") {
    return (
      <div className="flex items-center justify-center h-96">
        <Card className="w-full max-w-md">
          <CardContent className="text-center p-6">
            <Award className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Không có quyền truy cập</h3>
            <p className="text-muted-foreground">Chức năng này chỉ dành cho nhân viên</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const currentMonth = {
    workDays: 22,
    presentDays: 20,
    totalHours: 176,
    overtimeHours: 8,
    avgCheckIn: "08:32",
    performanceScore: 88,
    attendanceRate: 91,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <h1 className="text-3xl font-bold">Thống kê cá nhân</h1>
        <p className="text-muted-foreground">Theo dõi hiệu suất và tiến độ làm việc của bạn</p>
      </motion.div>

      {/* Performance Overview */}
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
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Điểm hiệu suất</p>
                <p className="text-3xl font-bold text-blue-700 dark:text-blue-300">{currentMonth.performanceScore}</p>
                <p className="text-xs text-blue-600 dark:text-blue-400 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +5 điểm so với tháng trước
                </p>
              </div>
              <Award className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">Tỷ lệ chấm công</p>
                <p className="text-3xl font-bold text-green-700 dark:text-green-300">{currentMonth.attendanceRate}%</p>
                <p className="text-xs text-green-600 dark:text-green-400">
                  {currentMonth.presentDays}/{currentMonth.workDays} ngày
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Tổng giờ làm</p>
                <p className="text-3xl font-bold text-purple-700 dark:text-purple-300">{currentMonth.totalHours}h</p>
                <p className="text-xs text-purple-600 dark:text-purple-400">+{currentMonth.overtimeHours}h tăng ca</p>
              </div>
              <Clock className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Giờ vào TB</p>
                <p className="text-3xl font-bold text-orange-700 dark:text-orange-300">{currentMonth.avgCheckIn}</p>
                <p className="text-xs text-orange-600 dark:text-orange-400">Đúng giờ 85% thời gian</p>
              </div>
              <Target className="h-8 w-8 text-orange-600 dark:text-orange-400" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Monthly Trend */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <Card>
            <CardHeader>
              <CardTitle>Xu hướng 6 tháng</CardTitle>
              <CardDescription>Giờ làm việc và tỷ lệ chấm công theo tháng</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line dataKey="hours" stroke="#3b82f6" name="Giờ làm việc" strokeWidth={2} />
                  <Line dataKey="attendance" stroke="#10b981" name="Tỷ lệ chấm công %" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Performance Breakdown */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
          <Card>
            <CardHeader>
              <CardTitle>Phân tích hiệu suất</CardTitle>
              <CardDescription>Đánh giá chi tiết các khía cạnh công việc</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {performanceData.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{item.name}</span>
                      <span className="text-muted-foreground">{item.value}%</span>
                    </div>
                    <Progress value={item.value} className="h-2" />
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Weekly Attendance Detail */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <Card>
          <CardHeader>
            <CardTitle>Chi tiết tuần này</CardTitle>
            <CardDescription>Thời gian chấm công chi tiết từng ngày trong tuần</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyAttendance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="hours" fill="#8b5cf6" name="Giờ làm việc" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Goals & Achievements */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <Card>
          <CardHeader>
            <CardTitle>Mục tiêu & Thành tích</CardTitle>
            <CardDescription>Theo dõi tiến độ đạt được các mục tiêu đề ra</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Mục tiêu tháng này</h4>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Chấm công đúng giờ</span>
                    <span className="text-sm font-medium">85/90%</span>
                  </div>
                  <Progress value={94} className="h-2" />

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Hoàn thành task đúng hạn</span>
                    <span className="text-sm font-medium">18/20</span>
                  </div>
                  <Progress value={90} className="h-2" />

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Tham gia meeting</span>
                    <span className="text-sm font-medium">12/12</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Thành tích nổi bật</h4>

                <div className="space-y-3">
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800 dark:text-green-300">
                        Nhân viên xuất sắc tháng 12
                      </span>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800 dark:text-blue-300">
                        100% chấm công đúng giờ - 3 tháng liên tiếp
                      </span>
                    </div>
                  </div>

                  <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-purple-600" />
                      <span className="text-sm font-medium text-purple-800 dark:text-purple-300">
                        Hoàn thành project trước deadline 2 tuần
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
