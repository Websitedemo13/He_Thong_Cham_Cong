"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/contexts/auth-context"
import { Plus, Building2, Users, TrendingUp, MoreHorizontal, Edit, Trash2, UserPlus, BarChart3 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"

const mockDepartments = [
  {
    id: "1",
    name: "Phòng Công nghệ Thông tin",
    shortName: "CNTT",
    manager: {
      name: "Quách Thành Long",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    employeeCount: 8,
    budget: "2.5 tỷ",
    performance: 95,
    description: "Phát triển và bảo trì hệ thống công nghệ",
    color: "blue",
  },
  {
    id: "2",
    name: "Phòng Nhân sự",
    shortName: "HR",
    manager: {
      name: "Nguyễn Văn HR",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    employeeCount: 5,
    budget: "1.2 tỷ",
    performance: 88,
    description: "Quản lý nhân sự và phát triển tổ chức",
    color: "green",
  },
  {
    id: "3",
    name: "Phòng Kinh doanh",
    shortName: "Sales",
    manager: {
      name: "Trần Văn Manager",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    employeeCount: 12,
    budget: "3.8 tỷ",
    performance: 92,
    description: "Phát triển thị trường và chăm sóc khách hàng",
    color: "purple",
  },
  {
    id: "4",
    name: "Phòng Marketing",
    shortName: "MKT",
    manager: {
      name: "Lê Thị Marketing",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    employeeCount: 6,
    budget: "1.8 tỷ",
    performance: 85,
    description: "Xây dựng thương hiệu và truyền thông",
    color: "orange",
  },
]

export default function DepartmentsPage() {
  const { user } = useAuth()

  if (!user || user.role !== "admin") {
    return (
      <div className="flex items-center justify-center h-96">
        <Card className="w-full max-w-md">
          <CardContent className="text-center p-6">
            <Building2 className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Không có quyền truy cập</h3>
            <p className="text-muted-foreground">Chức năng này chỉ dành cho quản trị viên</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const totalEmployees = mockDepartments.reduce((sum, dept) => sum + dept.employeeCount, 0)
  const avgPerformance = mockDepartments.reduce((sum, dept) => sum + dept.performance, 0) / mockDepartments.length

  const getColorClasses = (color: string) => {
    switch (color) {
      case "blue":
        return {
          bg: "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20",
          border: "border-blue-200 dark:border-blue-800",
          text: "text-blue-600 dark:text-blue-400",
          icon: "text-blue-600 dark:text-blue-400",
        }
      case "green":
        return {
          bg: "bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20",
          border: "border-green-200 dark:border-green-800",
          text: "text-green-600 dark:text-green-400",
          icon: "text-green-600 dark:text-green-400",
        }
      case "purple":
        return {
          bg: "bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20",
          border: "border-purple-200 dark:border-purple-800",
          text: "text-purple-600 dark:text-purple-400",
          icon: "text-purple-600 dark:text-purple-400",
        }
      case "orange":
        return {
          bg: "bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20",
          border: "border-orange-200 dark:border-orange-800",
          text: "text-orange-600 dark:text-orange-400",
          icon: "text-orange-600 dark:text-orange-400",
        }
      default:
        return {
          bg: "bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-800/20",
          border: "border-gray-200 dark:border-gray-800",
          text: "text-gray-600 dark:text-gray-400",
          icon: "text-gray-600 dark:text-gray-400",
        }
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
          <h1 className="text-3xl font-bold">Quản lý phòng ban</h1>
          <p className="text-muted-foreground">Tổ chức và quản lý các phòng ban trong công ty</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Thêm phòng ban
        </Button>
      </motion.div>

      {/* Overview Stats */}
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
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Tổng phòng ban</p>
                <p className="text-3xl font-bold text-blue-700 dark:text-blue-300">{mockDepartments.length}</p>
              </div>
              <Building2 className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">Tổng nhân viên</p>
                <p className="text-3xl font-bold text-green-700 dark:text-green-300">{totalEmployees}</p>
              </div>
              <Users className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Hiệu suất TB</p>
                <p className="text-3xl font-bold text-purple-700 dark:text-purple-300">{avgPerformance.toFixed(1)}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Ngân sách</p>
                <p className="text-3xl font-bold text-orange-700 dark:text-orange-300">9.3B</p>
              </div>
              <BarChart3 className="h-8 w-8 text-orange-600 dark:text-orange-400" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Departments Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-2"
      >
        {mockDepartments.map((department, index) => {
          const colorClasses = getColorClasses(department.color)

          return (
            <motion.div
              key={department.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`${colorClasses.bg} ${colorClasses.border} hover:shadow-lg transition-all duration-300`}>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-xl bg-white/50 dark:bg-black/20`}>
                        <Building2 className={`h-6 w-6 ${colorClasses.icon}`} />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{department.name}</CardTitle>
                        <CardDescription className={colorClasses.text}>{department.shortName}</CardDescription>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Chỉnh sửa
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <UserPlus className="mr-2 h-4 w-4" />
                          Thêm nhân viên
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Xóa phòng ban
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{department.description}</p>

                  {/* Manager Info */}
                  <div className="flex items-center gap-3 p-3 bg-white/30 dark:bg-black/20 rounded-lg">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={department.manager.avatar || "/placeholder.svg"}
                        alt={department.manager.name}
                      />
                      <AvatarFallback>
                        {department.manager.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{department.manager.name}</p>
                      <p className="text-xs text-muted-foreground">Trưởng phòng</p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-white/30 dark:bg-black/20 rounded-lg">
                      <div className="text-2xl font-bold">{department.employeeCount}</div>
                      <div className="text-xs text-muted-foreground">Nhân viên</div>
                    </div>
                    <div className="text-center p-3 bg-white/30 dark:bg-black/20 rounded-lg">
                      <div className="text-2xl font-bold">{department.budget}</div>
                      <div className="text-xs text-muted-foreground">Ngân sách</div>
                    </div>
                  </div>

                  {/* Performance */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Hiệu suất</span>
                      <span className="font-medium">{department.performance}%</span>
                    </div>
                    <Progress value={department.performance} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}
