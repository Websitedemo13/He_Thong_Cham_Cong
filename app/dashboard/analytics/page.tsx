"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from "recharts"
import { TrendingUp, TrendingDown, Users, Clock, Calendar, Target, Award, Zap, Brain, Activity } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

const productivityData = [
  { month: "T1", productivity: 85, efficiency: 78, satisfaction: 82 },
  { month: "T2", productivity: 88, efficiency: 82, satisfaction: 85 },
  { month: "T3", productivity: 92, efficiency: 88, satisfaction: 90 },
  { month: "T4", productivity: 87, efficiency: 85, satisfaction: 88 },
  { month: "T5", productivity: 94, efficiency: 91, satisfaction: 93 },
  { month: "T6", productivity: 96, efficiency: 94, satisfaction: 95 },
]

const workPatternData = [
  { hour: "8h", checkins: 45, efficiency: 85 },
  { hour: "9h", checkins: 78, efficiency: 92 },
  { hour: "10h", checkins: 12, efficiency: 88 },
  { hour: "11h", checkins: 8, efficiency: 85 },
  { hour: "12h", checkins: 5, efficiency: 70 },
  { hour: "13h", checkins: 15, efficiency: 75 },
  { hour: "14h", checkins: 25, efficiency: 88 },
  { hour: "15h", checkins: 18, efficiency: 90 },
]

const departmentPerformance = [
  { name: "CNTT", value: 96, color: "#3b82f6", trend: "+5%" },
  { name: "HR", value: 88, color: "#10b981", trend: "+2%" },
  { name: "Sales", value: 92, color: "#8b5cf6", trend: "+8%" },
  { name: "Marketing", value: 85, color: "#f59e0b", trend: "-1%" },
]

const aiInsights = [
  {
    type: "productivity",
    title: "Hiệu suất cao nhất",
    description: "Thứ 3 và Thứ 5 là những ngày có hiệu suất làm việc cao nhất",
    impact: "high",
    recommendation: "Lên lịch các cuộc họp quan trọng vào những ngày này"
  },
  {
    type: "attendance",
    title: "Xu hướng đi trễ",
    description: "Tỷ lệ đi trễ tăng 15% vào thứ 2, có thể do traffic",
    impact: "medium",
    recommendation: "Xem xét flexible working hours cho thứ 2"
  },
  {
    type: "wellness",
    title: "Burnout Risk",
    description: "3 nhân viên có dấu hiệu làm việc quá giờ thường xuyên",
    impact: "high",
    recommendation: "Cần can thiệp và tư vấn về work-life balance"
  }
]

export default function AnalyticsPage() {
  const { user } = useAuth()

  if (!user || (user.role !== "admin" && user.role !== "hr")) {
    return (
      <div className="flex items-center justify-center h-96">
        <Card className="w-full max-w-md">
          <CardContent className="text-center p-6">
            <Brain className="h-12 w-12 text-red-500 mx-auto mb-4" />
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
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Brain className="h-8 w-8 text-primary" />
            Analytics & AI Insights
          </h1>
          <p className="text-muted-foreground">Phân tích thông minh và dự đoán xu hướng</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2 bg-transparent">
            <Zap className="h-4 w-4" />
            Auto Report
          </Button>
          <Button className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Real-time Dashboard
          </Button>
        </div>
      </motion.div>

      {/* AI Insights Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid gap-4 md:grid-cols-3"
      >
        {aiInsights.map((insight, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + index * 0.1 }}
          >
            <Card className={`border-l-4 ${
              insight.impact === 'high' ? 'border-l-red-500' : 
              insight.impact === 'medium' ? 'border-l-orange-500' : 'border-l-green-500'
            }`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{insight.title}</CardTitle>
                  <Badge variant={insight.impact === 'high' ? 'destructive' : insight.impact === 'medium' ? 'default' : 'secondary'}>
                    {insight.impact === 'high' ? 'Cao' : insight.impact === 'medium' ? 'Trung bình' : 'Thấp'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">{insight.description}</p>
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-sm font-medium text-blue-800 dark:text-blue-300">
                    💡 {insight.recommendation}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Productivity Trends */}
      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                Xu hướng hiệu suất 6 tháng
              </CardTitle>
              <CardDescription>Phân tích hiệu suất, hiệu quả và mức độ hài lòng</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={productivityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area dataKey="productivity" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} name="Hiệu suất" />
                  <Area dataKey="efficiency" stackId="2" stroke="#10b981" fill="#10b981" fillOpacity={0.6} name="Hiệu quả" />
                  <Area dataKey="satisfaction" stackId="3" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} name="Hài lòng" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-600" />
                Mẫu hình làm việc theo giờ
              </CardTitle>
              <CardDescription>Phân tích check-in và hiệu quả theo từng khung giờ</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={workPatternData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="checkins" fill="#3b82f6" name="Số lượng check-in" />
                  <Bar dataKey="efficiency" fill="#10b981" name="Hiệu quả %" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Department Performance & Predictions */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-purple-600" />
              Hiệu suất phòng ban & Dự đoán
            </CardTitle>
            <CardDescription>Phân tích chi tiết và dự đoán xu hướng từng phòng ban</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <h4 className="font-semibold">Hiệu suất hiện tại</h4>
                {departmentPerformance.map((dept, index) => (
                  <motion.div
                    key={dept.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{dept.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{dept.value}%</span>
                        <Badge variant={dept.trend.startsWith('+') ? 'default' : 'destructive'} className="text-xs">
                          {dept.trend}
                        </Badge>
                      </div>
                    </div>
                    <Progress value={dept.value} className="h-2" />
                  </motion.div>
                ))}
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Dự đoán tháng tới</h4>
                <div className="space-y-3">
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="font-medium text-green-800 dark:text-green-300">Phòng CNTT</span>
                    </div>
                    <p className="text-sm text-green-700 dark:text-green-400">
                      Dự kiến tăng 3% hiệu suất do hoàn thành dự án lớn
                    </p>
                  </div>

                  <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingDown className="h-4 w-4 text-orange-600" />
                      <span className="font-medium text-orange-800 dark:text-orange-300">Phòng Marketing</span>
                    </div>
                    <p className="text-sm text-orange-700 dark:text-orange-400">
                      Có thể giảm 2% do thay đổi chiến lược, cần hỗ trợ
                    </p>
                  </div>

                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="h-4 w-4 text-blue-600" />
                      <span className="font-medium text-blue-800 dark:text-blue-300">Phòng Sales</span>
                    </div>
                    <p className="text-sm text-blue-700 dark:text-blue-400">
                      Ổn định ở mức cao, có thể đạt target Q1
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Advanced Metrics */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
        <Card>
          <CardHeader>
            <CardTitle>Chỉ số nâng cao</CardTitle>
            <CardDescription>Các chỉ số phân tích sâu về hiệu suất và sức khỏe tổ chức</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-4">
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">94.2%</div>
                <div className="text-sm font-medium mb-1">Employee Engagement</div>
                <div className="text-xs text-muted-foreground">+2.1% so với tháng trước</div>
              </div>

              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg">
                <div className="text-3xl font-bold text-green-600 mb-2">87.5%</div>
                <div className="text-sm font-medium mb-1">Retention Rate</div>
                <div className="text-xs text-muted-foreground">Ổn định trong 6 tháng</div>
              </div>

              <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg">
                <div className="text-3xl font-bold text-purple-600 mb-2">4.2/5</div>
                <div className="text-sm font-medium mb-1">Work-Life Balance</div>
                <div className="text-xs text-muted-foreground">Khảo sát hàng tháng</div>
              </div>

              <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg">
                <div className="text-3xl font-bold text-orange-600 mb-2">12.3%</div>
                <div className="text-sm font-medium mb-1">Productivity Growth</div>
                <div className="text-xs text-muted-foreground">So với cùng kỳ năm trước</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}