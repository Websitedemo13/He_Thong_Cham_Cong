"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/contexts/auth-context"
import { useState } from "react"
import { Target, TrendingUp, Award, Star, Users, BarChart3, Eye, Edit, Plus } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

const mockPerformanceData = [
  {
    id: "1",
    employeeId: "VSM001",
    name: "Quách Thành Long",
    department: "Phòng CNTT",
    position: "Frontend Developer",
    avatar: "/placeholder.svg",
    overallScore: 92,
    goals: [
      { name: "Hoàn thành dự án", target: 100, current: 95, status: "on-track" },
      { name: "Học công nghệ mới", target: 80, current: 85, status: "exceeded" },
      { name: "Mentoring junior", target: 70, current: 60, status: "behind" }
    ],
    skills: [
      { subject: "Technical Skills", A: 95, fullMark: 100 },
      { subject: "Communication", A: 85, fullMark: 100 },
      { subject: "Leadership", A: 75, fullMark: 100 },
      { subject: "Problem Solving", A: 90, fullMark: 100 },
      { subject: "Teamwork", A: 88, fullMark: 100 },
      { subject: "Innovation", A: 82, fullMark: 100 }
    ],
    feedback: [
      { from: "Manager", rating: 4.5, comment: "Excellent technical skills and proactive attitude" },
      { from: "Peer", rating: 4.2, comment: "Great team player and always willing to help" }
    ],
    lastReview: "2024-12-15",
    nextReview: "2025-03-15"
  },
  {
    id: "2",
    employeeId: "VSM002",
    name: "Nguyễn Văn HR",
    department: "Phòng Nhân sự",
    position: "HR Manager",
    avatar: "/placeholder.svg",
    overallScore: 88,
    goals: [
      { name: "Tuyển dụng nhân viên", target: 10, current: 12, status: "exceeded" },
      { name: "Đào tạo nội bộ", target: 5, current: 4, status: "behind" },
      { name: "Employee satisfaction", target: 85, current: 87, status: "exceeded" }
    ],
    skills: [
      { subject: "HR Management", A: 92, fullMark: 100 },
      { subject: "Communication", A: 95, fullMark: 100 },
      { subject: "Leadership", A: 85, fullMark: 100 },
      { subject: "Strategic Thinking", A: 80, fullMark: 100 },
      { subject: "Conflict Resolution", A: 88, fullMark: 100 },
      { subject: "Data Analysis", A: 75, fullMark: 100 }
    ],
    feedback: [
      { from: "CEO", rating: 4.3, comment: "Strong leadership in HR initiatives" },
      { from: "Team", rating: 4.4, comment: "Supportive and understanding manager" }
    ],
    lastReview: "2024-12-10",
    nextReview: "2025-03-10"
  }
]

const teamPerformanceData = [
  { department: "CNTT", performance: 92, satisfaction: 88, retention: 95 },
  { department: "HR", performance: 88, satisfaction: 92, retention: 98 },
  { department: "Sales", performance: 85, satisfaction: 82, retention: 85 },
  { department: "Marketing", performance: 87, satisfaction: 85, retention: 90 }
]

export default function PerformancePage() {
  const { user } = useAuth()
  const [selectedEmployee, setSelectedEmployee] = useState(mockPerformanceData[0])

  if (!user) return null

  const getGoalStatusColor = (status: string) => {
    switch (status) {
      case "exceeded":
        return "text-green-600 bg-green-100 dark:bg-green-900/20"
      case "on-track":
        return "text-blue-600 bg-blue-100 dark:bg-blue-900/20"
      case "behind":
        return "text-red-600 bg-red-100 dark:bg-red-900/20"
      default:
        return "text-gray-600 bg-gray-100 dark:bg-gray-900/20"
    }
  }

  const getGoalStatusText = (status: string) => {
    switch (status) {
      case "exceeded":
        return "Vượt mục tiêu"
      case "on-track":
        return "Đúng tiến độ"
      case "behind":
        return "Chậm tiến độ"
      default:
        return status
    }
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
            <Target className="h-8 w-8 text-primary" />
            Quản lý hiệu suất
          </h1>
          <p className="text-muted-foreground">
            {user.role === "staff" ? "Theo dõi mục tiêu và phát triển cá nhân" : "Đánh giá và phát triển nhân viên"}
          </p>
        </div>
        <div className="flex gap-2">
          {user.role !== "staff" && (
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <Plus className="h-4 w-4" />
              Tạo đánh giá mới
            </Button>
          )}
          <Button className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Báo cáo hiệu suất
          </Button>
        </div>
      </motion.div>

      {user.role === "staff" ? (
        // Staff View - Personal Performance
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Tổng quan</TabsTrigger>
            <TabsTrigger value="goals">Mục tiêu</TabsTrigger>
            <TabsTrigger value="skills">Kỹ năng</TabsTrigger>
            <TabsTrigger value="feedback">Phản hồi</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <div className="grid gap-6 md:grid-cols-3">
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Hiệu suất tổng thể</CardTitle>
                    <CardDescription>Điểm số hiệu suất của bạn trong kỳ đánh giá hiện tại</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4">
                      <div className="relative w-32 h-32">
                        <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeDasharray={`${selectedEmployee.overallScore}, 100`}
                            className="text-primary"
                          />
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="text-muted-foreground/20"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-3xl font-bold">{selectedEmployee.overallScore}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold">Xuất sắc</h3>
                        <p className="text-muted-foreground">
                          Bạn đang có hiệu suất rất tốt và vượt trội so với kỳ vọng
                        </p>
                        <div className="flex gap-2">
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                            Top 10%
                          </Badge>
                          <Badge variant="outline">
                            +5 điểm so với kỳ trước
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Lịch đánh giá</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-medium">Đánh giá gần nhất</p>
                      <p className="text-sm text-muted-foreground">{selectedEmployee.lastReview}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Đánh giá tiếp theo</p>
                      <p className="text-sm text-muted-foreground">{selectedEmployee.nextReview}</p>
                    </div>
                    <Button className="w-full">
                      Tự đánh giá
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="goals" className="space-y-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Mục tiêu cá nhân</CardTitle>
                  <CardDescription>Theo dõi tiến độ các mục tiêu đã đề ra</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {selectedEmployee.goals.map((goal, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="space-y-3"
                    >
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">{goal.name}</h4>
                        <Badge className={getGoalStatusColor(goal.status)}>
                          {getGoalStatusText(goal.status)}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Tiến độ: {goal.current}/{goal.target}</span>
                          <span>{Math.round((goal.current / goal.target) * 100)}%</span>
                        </div>
                        <Progress value={(goal.current / goal.target) * 100} className="h-2" />
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="skills" className="space-y-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Bản đồ kỹ năng</CardTitle>
                  <CardDescription>Đánh giá các kỹ năng chuyên môn và mềm</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <RadarChart data={selectedEmployee.skills}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} />
                      <Radar
                        name="Kỹ năng"
                        dataKey="A"
                        stroke="#3b82f6"
                        fill="#3b82f6"
                        fillOpacity={0.3}
                        strokeWidth={2}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="feedback" className="space-y-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Phản hồi từ đồng nghiệp</CardTitle>
                  <CardDescription>Đánh giá và nhận xét từ quản lý và đồng nghiệp</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {selectedEmployee.feedback.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 border rounded-lg"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-medium">{item.from}</p>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(item.rating)
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                            <span className="text-sm text-muted-foreground ml-2">
                              {item.rating}/5
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground italic">
                        "{item.comment}"
                      </p>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      ) : (
        // Admin/HR View - Team Performance
        <Tabs defaultValue="team" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="team">Hiệu suất team</TabsTrigger>
            <TabsTrigger value="individual">Cá nhân</TabsTrigger>
            <TabsTrigger value="reviews">Đánh giá</TabsTrigger>
          </TabsList>

          <TabsContent value="team" className="space-y-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Hiệu suất theo phòng ban</CardTitle>
                  <CardDescription>So sánh hiệu suất, sự hài lòng và tỷ lệ giữ chân nhân viên</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={teamPerformanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="department" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="performance" fill="#3b82f6" name="Hiệu suất" />
                      <Bar dataKey="satisfaction" fill="#10b981" name="Hài lòng" />
                      <Bar dataKey="retention" fill="#8b5cf6" name="Giữ chân" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="individual" className="space-y-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <div className="grid gap-6 md:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>Danh sách nhân viên</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {mockPerformanceData.map((employee) => (
                      <div
                        key={employee.id}
                        className={`p-3 rounded-lg cursor-pointer transition-colors ${
                          selectedEmployee.id === employee.id
                            ? "bg-primary/10 border border-primary/20"
                            : "hover:bg-muted/50"
                        }`}
                        onClick={() => setSelectedEmployee(employee)}
                      >
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={employee.avatar} alt={employee.name} />
                            <AvatarFallback>
                              {employee.name.split(" ").map(n => n[0]).join("").toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-medium">{employee.name}</p>
                            <p className="text-sm text-muted-foreground">{employee.position}</p>
                          </div>
                          <Badge variant="outline">
                            {employee.overallScore}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Chi tiết hiệu suất - {selectedEmployee.name}
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="bg-transparent">
                          <Eye className="h-4 w-4 mr-2" />
                          Xem chi tiết
                        </Button>
                        <Button size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          Đánh giá
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <h4 className="font-medium mb-3">Mục tiêu hiện tại</h4>
                          <div className="space-y-3">
                            {selectedEmployee.goals.map((goal, index) => (
                              <div key={index} className="space-y-2">
                                <div className="flex justify-between items-center">
                                  <span className="text-sm">{goal.name}</span>
                                  <Badge className={getGoalStatusColor(goal.status)} variant="outline">
                                    {getGoalStatusText(goal.status)}
                                  </Badge>
                                </div>
                                <Progress value={(goal.current / goal.target) * 100} className="h-2" />
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-3">Kỹ năng nổi bật</h4>
                          <div className="space-y-3">
                            {selectedEmployee.skills
                              .sort((a, b) => b.A - a.A)
                              .slice(0, 3)
                              .map((skill, index) => (
                                <div key={index} className="flex justify-between items-center">
                                  <span className="text-sm">{skill.subject}</span>
                                  <div className="flex items-center gap-2">
                                    <Progress value={skill.A} className="h-2 w-20" />
                                    <span className="text-sm font-medium">{skill.A}%</span>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-3">Phản hồi gần nhất</h4>
                        <div className="space-y-3">
                          {selectedEmployee.feedback.map((item, index) => (
                            <div key={index} className="p-3 bg-muted/50 rounded-lg">
                              <div className="flex justify-between items-center mb-2">
                                <span className="font-medium text-sm">{item.from}</span>
                                <div className="flex items-center gap-1">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-3 w-3 ${
                                        i < Math.floor(item.rating)
                                          ? "text-yellow-400 fill-current"
                                          : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground italic">
                                "{item.comment}"
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Lịch đánh giá</CardTitle>
                  <CardDescription>Quản lý chu kỳ đánh giá hiệu suất</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Tính năng đang phát triển</h3>
                    <p className="text-muted-foreground">
                      Chức năng quản lý chu kỳ đánh giá sẽ được cập nhật trong phiên bản tiếp theo
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}