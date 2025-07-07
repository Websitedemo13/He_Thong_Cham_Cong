"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/contexts/auth-context"
import { useState } from "react"
import { DollarSign, Download, Calculator, TrendingUp, Users, FileText, Eye, Edit, Send } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

const mockPayrollData = [
  {
    id: "1",
    employeeId: "VSM001",
    name: "Quách Thành Long",
    department: "Phòng CNNT",
    position: "Frontend Developer",
    avatar: "/placeholder.svg",
    baseSalary: 15000000,
    allowances: 2000000,
    overtime: 1500000,
    bonus: 3000000,
    deductions: 500000,
    tax: 1800000,
    netSalary: 19200000,
    workDays: 22,
    overtimeHours: 15,
    status: "approved"
  },
  {
    id: "2",
    employeeId: "VSM002",
    name: "Nguyễn Văn HR",
    department: "Phòng Nhân sự",
    position: "HR Manager",
    avatar: "/placeholder.svg",
    baseSalary: 18000000,
    allowances: 2500000,
    overtime: 800000,
    bonus: 4000000,
    deductions: 300000,
    tax: 2400000,
    netSalary: 22600000,
    workDays: 22,
    overtimeHours: 8,
    status: "pending"
  },
  {
    id: "3",
    employeeId: "VSM003",
    name: "Trần Thị Staff",
    department: "Phòng Kinh doanh",
    position: "Sales Executive",
    avatar: "/placeholder.svg",
    baseSalary: 12000000,
    allowances: 1500000,
    overtime: 1200000,
    bonus: 2500000,
    deductions: 200000,
    tax: 1500000,
    netSalary: 15500000,
    workDays: 20,
    overtimeHours: 12,
    status: "paid"
  }
]

const payrollSummary = {
  totalEmployees: 31,
  totalPayroll: 580000000,
  averageSalary: 18700000,
  totalOvertime: 45000000,
  totalBonus: 95000000,
  totalTax: 58000000,
  pendingApprovals: 5,
  paidEmployees: 26
}

export default function PayrollPage() {
  const { user } = useAuth()
  const [selectedMonth, setSelectedMonth] = useState("2025-01")
  const [selectedStatus, setSelectedStatus] = useState("all")

  if (!user || (user.role !== "admin" && user.role !== "hr")) {
    return (
      <div className="flex items-center justify-center h-96">
        <Card className="w-full max-w-md">
          <CardContent className="text-center p-6">
            <DollarSign className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Không có quyền truy cập</h3>
            <p className="text-muted-foreground">Chức năng này chỉ dành cho Admin và HR</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Đã duyệt</Badge>
      case "pending":
        return <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300">Chờ duyệt</Badge>
      case "paid":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">Đã trả</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const filteredData = mockPayrollData.filter(item => {
    if (selectedStatus === "all") return true
    return item.status === selectedStatus
  })

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
            <DollarSign className="h-8 w-8 text-primary" />
            Quản lý lương
          </h1>
          <p className="text-muted-foreground">Tính lương và quản lý bảng lương nhân viên</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2 bg-transparent">
            <Calculator className="h-4 w-4" />
            Tính lương tự động
          </Button>
          <Button className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Xuất bảng lương
          </Button>
        </div>
      </motion.div>

      {/* Summary Cards */}
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
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Tổng quỹ lương</p>
                <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                  {formatCurrency(payrollSummary.totalPayroll)}
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-400 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +5.2% so với tháng trước
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">Lương TB</p>
                <p className="text-2xl font-bold text-green-700 dark:text-green-300">
                  {formatCurrency(payrollSummary.averageSalary)}
                </p>
                <p className="text-xs text-green-600 dark:text-green-400">
                  {payrollSummary.totalEmployees} nhân viên
                </p>
              </div>
              <Users className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Tăng ca</p>
                <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                  {formatCurrency(payrollSummary.totalOvertime)}
                </p>
                <p className="text-xs text-purple-600 dark:text-purple-400">Tổng tiền tăng ca</p>
              </div>
              <Calculator className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Chờ duyệt</p>
                <p className="text-2xl font-bold text-orange-700 dark:text-orange-300">
                  {payrollSummary.pendingApprovals}
                </p>
                <p className="text-xs text-orange-600 dark:text-orange-400">Bảng lương cần duyệt</p>
              </div>
              <FileText className="h-8 w-8 text-orange-600 dark:text-orange-400" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <Tabs defaultValue="payroll" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="payroll">Bảng lương</TabsTrigger>
          <TabsTrigger value="summary">Tổng hợp</TabsTrigger>
          <TabsTrigger value="reports">Báo cáo</TabsTrigger>
        </TabsList>

        <TabsContent value="payroll" className="space-y-4">
          {/* Filters */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
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
                  
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Trạng thái" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả</SelectItem>
                      <SelectItem value="pending">Chờ duyệt</SelectItem>
                      <SelectItem value="approved">Đã duyệt</SelectItem>
                      <SelectItem value="paid">Đã trả</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Payroll Table */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card>
              <CardHeader>
                <CardTitle>Bảng lương tháng {selectedMonth}</CardTitle>
                <CardDescription>Chi tiết lương của {filteredData.length} nhân viên</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nhân viên</TableHead>
                        <TableHead>Lương cơ bản</TableHead>
                        <TableHead>Phụ cấp</TableHead>
                        <TableHead>Tăng ca</TableHead>
                        <TableHead>Thưởng</TableHead>
                        <TableHead>Khấu trừ</TableHead>
                        <TableHead>Thuế</TableHead>
                        <TableHead>Thực lĩnh</TableHead>
                        <TableHead>Trạng thái</TableHead>
                        <TableHead className="text-right">Thao tác</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredData.map((employee, index) => (
                        <motion.tr
                          key={employee.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="hover:bg-muted/50"
                        >
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={employee.avatar} alt={employee.name} />
                                <AvatarFallback>
                                  {employee.name.split(" ").map(n => n[0]).join("").toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{employee.name}</div>
                                <div className="text-sm text-muted-foreground">{employee.employeeId}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">
                            {formatCurrency(employee.baseSalary)}
                          </TableCell>
                          <TableCell>
                            {formatCurrency(employee.allowances)}
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{formatCurrency(employee.overtime)}</div>
                              <div className="text-xs text-muted-foreground">{employee.overtimeHours}h</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {formatCurrency(employee.bonus)}
                          </TableCell>
                          <TableCell className="text-red-600">
                            -{formatCurrency(employee.deductions)}
                          </TableCell>
                          <TableCell className="text-red-600">
                            -{formatCurrency(employee.tax)}
                          </TableCell>
                          <TableCell>
                            <div className="font-bold text-green-600">
                              {formatCurrency(employee.netSalary)}
                            </div>
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(employee.status)}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex gap-1 justify-end">
                              <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                <Edit className="h-4 w-4" />
                              </Button>
                              {employee.status === "approved" && (
                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-green-600">
                                  <Send className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </motion.tr>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="summary" className="space-y-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Phân bổ lương theo phòng ban</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Phòng CNTT</span>
                      <span className="font-medium">{formatCurrency(180000000)}</span>
                    </div>
                    <Progress value={31} className="h-2" />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Phòng Kinh doanh</span>
                      <span className="font-medium">{formatCurrency(220000000)}</span>
                    </div>
                    <Progress value={38} className="h-2" />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Phòng Marketing</span>
                      <span className="font-medium">{formatCurrency(120000000)}</span>
                    </div>
                    <Progress value={21} className="h-2" />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Phòng Nhân sự</span>
                      <span className="font-medium">{formatCurrency(60000000)}</span>
                    </div>
                    <Progress value={10} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Cơ cấu lương</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Lương cơ bản</span>
                      <span className="font-medium">65%</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Phụ cấp</span>
                      <span className="font-medium">15%</span>
                    </div>
                    <Progress value={15} className="h-2" />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Tăng ca</span>
                      <span className="font-medium">8%</span>
                    </div>
                    <Progress value={8} className="h-2" />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Thưởng</span>
                      <span className="font-medium">12%</span>
                    </div>
                    <Progress value={12} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card>
              <CardHeader>
                <CardTitle>Báo cáo lương</CardTitle>
                <CardDescription>Tạo và xuất các báo cáo lương chi tiết</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                    <FileText className="h-6 w-6" />
                    <span>Báo cáo tổng hợp</span>
                  </Button>
                  
                  <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                    <Calculator className="h-6 w-6" />
                    <span>Báo cáo thuế</span>
                  </Button>
                  
                  <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                    <TrendingUp className="h-6 w-6" />
                    <span>Phân tích xu hướng</span>
                  </Button>
                  
                  <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                    <Users className="h-6 w-6" />
                    <span>Báo cáo theo phòng ban</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}