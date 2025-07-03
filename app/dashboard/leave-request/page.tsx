"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Plus, Calendar, FileText, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const mockLeaveRequests = [
  {
    id: "1",
    type: "sick",
    startDate: "2025-01-10",
    endDate: "2025-01-10",
    reason: "Bị cảm lạnh, cần nghỉ ngơi",
    status: "pending",
    submittedAt: "2025-01-08T10:30:00",
    approvedBy: null,
    days: 1,
  },
  {
    id: "2",
    type: "vacation",
    startDate: "2025-01-15",
    endDate: "2025-01-17",
    reason: "Nghỉ lễ Tết Nguyên đán",
    status: "approved",
    submittedAt: "2025-01-01T14:20:00",
    approvedBy: "Nguyễn Văn HR",
    days: 3,
  },
  {
    id: "3",
    type: "personal",
    startDate: "2024-12-25",
    endDate: "2024-12-25",
    reason: "Việc gia đình cần xử lý",
    status: "rejected",
    submittedAt: "2024-12-20T09:15:00",
    approvedBy: "Nguyễn Văn HR",
    days: 1,
  },
]

export default function LeaveRequestPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    type: "",
    startDate: "",
    endDate: "",
    reason: "",
  })

  if (!user || user.role !== "staff") {
    return (
      <div className="flex items-center justify-center h-96">
        <Card className="w-full max-w-md">
          <CardContent className="text-center p-6">
            <FileText className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Không có quyền truy cập</h3>
            <p className="text-muted-foreground">Chức năng này chỉ dành cho nhân viên</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Mock submit
    toast({
      title: "Đơn xin nghỉ phép đã được gửi!",
      description: "Đơn của bạn đang chờ phê duyệt từ HR.",
    })

    setShowForm(false)
    setFormData({ type: "", startDate: "", endDate: "", reason: "" })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300">Chờ duyệt</Badge>
        )
      case "approved":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Đã duyệt</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">Từ chối</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <AlertCircle className="h-4 w-4 text-orange-600" />
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "sick":
        return "Nghỉ ốm"
      case "vacation":
        return "Nghỉ phép"
      case "personal":
        return "Việc cá nhân"
      case "emergency":
        return "Khẩn cấp"
      default:
        return type
    }
  }

  const stats = {
    totalRequests: mockLeaveRequests.length,
    pending: mockLeaveRequests.filter((r) => r.status === "pending").length,
    approved: mockLeaveRequests.filter((r) => r.status === "approved").length,
    rejected: mockLeaveRequests.filter((r) => r.status === "rejected").length,
    totalDays: mockLeaveRequests.filter((r) => r.status === "approved").reduce((sum, r) => sum + r.days, 0),
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
          <h1 className="text-3xl font-bold">Xin nghỉ phép</h1>
          <p className="text-muted-foreground">Quản lý đơn xin nghỉ phép của bạn</p>
        </div>
        <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Tạo đơn mới
        </Button>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid gap-4 md:grid-cols-5"
      >
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Tổng đơn</p>
                <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{stats.totalRequests}</p>
              </div>
              <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Chờ duyệt</p>
                <p className="text-2xl font-bold text-orange-700 dark:text-orange-300">{stats.pending}</p>
              </div>
              <AlertCircle className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">Đã duyệt</p>
                <p className="text-2xl font-bold text-green-700 dark:text-green-300">{stats.approved}</p>
              </div>
              <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-red-200 dark:border-red-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-600 dark:text-red-400">Từ chối</p>
                <p className="text-2xl font-bold text-red-700 dark:text-red-300">{stats.rejected}</p>
              </div>
              <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Tổng ngày</p>
                <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">{stats.totalDays}</p>
              </div>
              <Calendar className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* New Request Form */}
      {showForm && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card>
            <CardHeader>
              <CardTitle>Tạo đơn xin nghỉ phép mới</CardTitle>
              <CardDescription>Điền thông tin chi tiết về đơn xin nghỉ phép</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="type">Loại nghỉ phép</Label>
                    <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn loại nghỉ phép" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sick">Nghỉ ốm</SelectItem>
                        <SelectItem value="vacation">Nghỉ phép</SelectItem>
                        <SelectItem value="personal">Việc cá nhân</SelectItem>
                        <SelectItem value="emergency">Khẩn cấp</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="startDate">Ngày bắt đầu</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="endDate">Ngày kết thúc</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reason">Lý do nghỉ phép</Label>
                  <Textarea
                    id="reason"
                    placeholder="Nhập lý do chi tiết..."
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    required
                    className="min-h-[100px]"
                  />
                </div>

                <div className="flex gap-2 justify-end">
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                    Hủy
                  </Button>
                  <Button type="submit">Gửi đơn</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Leave Requests History */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Card>
          <CardHeader>
            <CardTitle>Lịch sử đơn xin nghỉ phép</CardTitle>
            <CardDescription>Danh sách các đơn xin nghỉ phép đã gửi</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Loại</TableHead>
                    <TableHead>Thời gian</TableHead>
                    <TableHead>Số ngày</TableHead>
                    <TableHead>Lý do</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Người duyệt</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockLeaveRequests.map((request, index) => (
                    <motion.tr
                      key={request.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="hover:bg-muted/50"
                    >
                      <TableCell>
                        <Badge variant="outline">{getTypeLabel(request.type)}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium">{request.startDate}</div>
                          {request.startDate !== request.endDate && (
                            <div className="text-sm text-muted-foreground">đến {request.endDate}</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">{request.days} ngày</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{request.reason}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(request.status)}
                          {getStatusBadge(request.status)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">{request.approvedBy || "--"}</span>
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
